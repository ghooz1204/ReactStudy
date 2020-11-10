import React from 'react';
import ReactDOMServer from 'react-dom/server';
import express from 'express';
import { StaticRouter } from 'react-router-dom';
import App from './App';
import path from 'path';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import createSagaMiddelware, { END } from 'redux-saga';
import rootReducer, { rootSaga } from './modules';
import PreloaderContext from './lib/PreloadContext';

import { ChunkExtractor, ChunkExtractorManager } from '@loadable/server';

const statsFile = path.resolve('./build/loadable-stats.json');

/*
==========Chapter 20.3==========
    서버 사이드 렌더링 구현하기

    서버 사이드 렌더링을 구현하려면 웹팩 설정을 커스터마이징해 주어야 함.
    CRA로 만든 프로젝트에서는 웹팩 관련 설정이 기본적으로 모두 숨겨져 있으니
    $ yarn eject
    명령어를 실행하여 밖으로 꺼내 줌.

==========Chapter 20.3.1==========
    서버 사이드 렌더링용 엔트리 만들기

    "엔트리(entry)"는 웹팩에서 프로젝트를 불러올 때 가장 먼저 불러오는 파일.
    Example)
        현재 작성 중인 리액트 프로젝트에서는 index.js를 엔트리 파일로 사용.
        이 파일부터 시작하여 내부에 필요한 다른 컴포넌트와 모듈을 불러옴.

    서버 사이드 렌더링을 할 때는 서버를 위한 엔트리 파일을 따로 생성해야 함.
    서버에서 리액트 컴포넌트를 렌더링할 때는 ReactDOMServer의 renderToString이라는 함수를 사용.
    이 함수에 JSX를 넣어서 호출하면 렌더링 결과를 문자열로 반환함.
*/

/*
==========Chapter 20.3.4==========
    서버 코드 작성하기

    $ yarn add express
    명령어를 통해 express 웹 프레임워크를 다운로드.

    index.server.js 코드를 작성하는 과정에서 리액트 라우터 안에 들어 있는 StaticRouter라는 컴포넌트가 사용됨.
    이 라우터 컴포넌트는 주로 서버 사이드 렌더링 용도로 사용되는 라우터.
    props로 넣어 주는 location 값에 따라 라우팅해 줌.(현재 넣은 req.url 값 중 req 객체는 요청에 대한 정보 지님.)

    StaticRouter에 context라는 props도 넣어 줌.
    이 값을 사용하여 나중에 렌더링한 컴포넌트에 따라 HTTP 상태 코드를 설정해줄 수 있음.

    구글 크롬 브라우저 개발자 도구에서 Network 탭을 열고 파일의 Response를 확인하면
    컴포넌트의 렌더링 결과가 전달된 것을 알 수 있음.
    => 클라이언트에서 렌더링한 것이 아니라 서버에서 렌더링 후 html을 전달함.
*/

const app = express();

// 서버 사이드 렌더링을 처리할 핸들러 함수.
const serverRender = async (req, res, next) => {
    // 이 함수는 404가 떠야 하는 상황에 404를 띄우지 않고 서버 사이드 렌더링을 해 줌.

    /*
    ==========Chapter 20.4.4==========
        서버에서 리덕스 설정 및 PreloadContext 사용하기

        첫 번째 렌더링을 할 때는 renderToString 대신 renderToStaticMarkup이라는 함수 사용.
        renderToStaticMarkup은 리액트를 사용하여 정적인 페이지를 만들 때 사용함.
        이 함수로 만든 리액트 렌더링 결과물은 클라이언트 쪽에서 HTML DOM 인터렉션을 지원하기 힘듬.

        지금 단계에서 renderToString 대신 renderToStaticMarkup 함수를 사용한 이유는
        그저 Preloader로 넣어 주었던 함수를 호출하기 위해서, 또 이 함수의 처리 속도가 renderToString 보다 빠르기 때문.
    */
    const sagaMiddleware = createSagaMiddelware();

    const context = {};
    const store = createStore(
        rootReducer,
        applyMiddleware(thunk, sagaMiddleware)
    );
    /*
    ==========Chapter 20.4.8==========
        redux-saga를 위한 서버 사이드 렌더링 작업

        redux-thunk를 사용하면 Preloader를 통해 호출한 함수들이 Promise를 반환하지만,
        redux-saga를 사용하면 Promise를 반환하지 않기 때문에 추가 작업이 필요함.
    */
    const sagaPromise = sagaMiddleware.run(rootSaga).toPromise();
    /*
        toPromise는 sagaMiddleware.run(rootSaga())를 통해 만든 Task를 Promise로 변환함.
        별도의 작업을 하지 않으면 이 Promise는 끝나지 않음. => 우리가 만든 루트 사가에서 액션을 끝없이 모니터링하기 때문.

        그러나 redux-saga의 END 액션을 발생시키면 이 Promise를 끝낼 수 있음.
        END 액션이 발생되면 액션 모니터링 작업이 모두 종료되고, 모니터링되기 전에 시작된
        getUserSaga와 같은 사가 함수들이 있다면 해당 함수들이 완료되고 나서 Promise가 끝나게 됨.
        이 Promise가 끝나는 시점에 리덕스 스토어에는 우리가 원하는 데이터가 채워짐. 그 이후에 다시 렌더링 하면 우리가 원하는 결과물 나타남.

        $ yarn build
        $ yarn build:server
        $ yarn start:server
    */

    const preloadContext = {
        done: false,
        promises: []
    }

    // 필요한 파일을 추출하기 위한 ChunkExtractor
    const extractor = new ChunkExtractor({ statsFile });

    const jsx = (
        <ChunkExtractorManager extractor={extractor}>
            <PreloaderContext.Provider value={preloadContext}>
                <Provider store={store}>
                    <StaticRouter location={req.url} context={context}>
                        <App />
                    </StaticRouter>
                </Provider>
            </PreloaderContext.Provider>
        </ChunkExtractorManager>
    );
    ReactDOMServer.renderToStaticMarkup(jsx); // renderToStaticMarkup으로 한 번 렌더링함.
    store.dispatch(END); // redux-saga의 END 액션을 발생시키면 액션을 모니터링하는 사가들이 모두 종료됨.
    try {
        await sagaPromise; // 기존에 진행 중이던 사가들이 모두 끝날 때까지 기다림.
        await Promise.all(preloadContext.promises); // 모든 프로미스를 기다림
    } catch (e) {
        return res.status(500);
    }
    preloadContext.done = true;
    const root = ReactDOMServer.renderToString(jsx); // 렌더링을 하고

    /*
    ==========Chapter 20.4.5==========
        스크립트로 스토어 초기 상태 주입하기

        지금까지 작성한 코드는 API를 통해 받아 온 데이터를 렌더링하지만, 렌더링하는 과정에서
        만들어진 스토어의 상태를 브라우저에서 재사용하지 못하는 상황임.
        서버에서 만들어 준 상태를 브라우저에서 재사용하려면, 현재 스토어의 상태를 문자열로 변환한 뒤 스크립트로 주입해 주어야 함.

        $ yarn build
        $ yarn build:server
        $ yarn start:server
        명령어를 통해 서버를 빌드하고 실행함.
    */
    // JSON을 문자열로 변환하고 악성 스크립트가 실행되는 것을 방지하기 위해 <를 치환 처리
    // https://redux.js.org/recipes/server-rendering#security-considerations
    const stateString = JSON.stringify(store.getState()).replace(/</g, '\\u003c');
    const stateScript = `<script>__PRELOADED_STATE__=${stateString}</script>`; // 리덕스 초기 상태를 스크립트로 주입함.

    // 미리 불러와야 하는 스타일/스크립트 추출하고
    const tags = {
        scripts: stateScript + extractor.getScriptTags(), // 스크립트 앞부분에 리덕스 상태 넣기
        links: extractor.getLinkTags(),
        styles: extractor.getStyleTags()
    }

    res.send(createPage(root, tags)); // 클라이언트에게 결과물을 응답함.
}

/*
==========Chapter 20.3.5==========
    정적 파일 제공하기

    Express에 내장되어 있는 static 미들웨어를 사용하여 서버를 통해
    build에 있는 JS, CSS 정적 파일들에 접근할 수 있도록 해 줌.

    그 다음에는 JS와 CSS 파일을 불러오도록 html에 코드를 삽입해 주어야 함.
    불러와야 하는 파일 이름은 매번 빌드할 때마다 바뀌기 때문에 빌드하고 나서 만들어지는
    asset-manifest.json 파일을 참고하여 불러오도록 작성.

    구글 크롬 브라우저 개발자 도구에서 Network 탭을 열고 파일의 Response를 확인하여
    서버 사이드 렌더링이 잘 되었는지 검증하고, CSS가 적용되었는지 확인해야 함.

    여기서 링크를 눌러 이동할 때는 클라이언트 렌더링이 되어야 함.
    즉, 다른 링크를 클릭하여 다른 페이지로 이동할 때 네트워크 요청이 추가로 발생하지 않아야 함.

    서버 사이드 렌더링을 구현하면 이렇게 첫 번째 렌더링은 서버를 통해 하지만,
    그 이후에는 브라우저에서 처리함.
*/

// const manifest = JSON.parse(
//     fs.readFileSync(path.resolve('./build/asset-manifest.json'), 'utf8')
// );
// const chunks = Object.keys(manifest.files)
//     .filter(key => /chunk\.js$/.exec(key)) // chunk.js로 끝나는 키를 찾아서
//     .map(key => `<script src="${manifest.files[key]}"></script>`) // 스크립트 태그로 변환하고
//     .join(''); // 합침


/*
==========Chapter 20.5.3==========
    필요한 청크 파일 경로 추출하기

    서버 사이드 렌더링 후 브라우저에서 어떤 파일을 사전에 불러와야 할지 알아내고 해당 파일들의 경로를 추가하기 위해
    Loadable Components에서 제공하는 ChunkExtractor와 ChunkExtractorManage를 사용함.

    이제 Loadable Components를 통해 파일 경로를 조회하므로 기존에 asset-manifest.json을 확인하던 코드는 지워줌.
*/
function createPage(root, tags) {
    return `
    <!DOCTYPE html>
    <html lang="en">
        <head>
            <meta charset="utf-8" />
            <link rel="icon" href="/favicon.ico" />
            <meta 
                name="viewport"
                content="width=device-width, initial-scale=1, shrink-to-fit=no"
            />
            <meta name="theme-color" content="#000000" />
            <meta name="description" content="Web site created using create-react-app" />
            <link rel="apple-touch-icon" href="/logo192.png" />
            <title>React App</title>
            ${tags.styles}
            ${tags.links}
        </head>
        <body>
            <noscript>You need to enable JavaScript to run this app.</noscript>
            <div id="root">
                ${root}
            </div>
            ${tags.scripts}
        </body>
    </html>`;
}

const serve = express.static(path.resolve('./build'), {
    index: false // "/" 경로에서 index.html을 보여 주지 않도록 설정
})

app.use(serve); // 순서가 중요함. serverRender 전에 위치해야 함.
app.use(serverRender);

// 5000 포트로 서버를 가동
app.listen(5000, () => {
    console.log('Running on http://localhost:5000');
});





// const html = ReactDOMServer.renderToString(
//     <div>Hello Server Side Rendering!</div>
// );

// console.log(html);