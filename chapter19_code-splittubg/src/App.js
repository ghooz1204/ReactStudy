import React, { useState, Suspense } from 'react';
import logo from './logo.svg';
import './App.css';
import AppClass from './AppClass';
import loadable from '@loadable/component';
// import notify from './notify'; // 이처럼 import를 상단에서 사용하면 코드가 main 파일 안으로 들어가게 됨.

/*
==========Chapter 19==========
    코드 스플리팅

    리액트 프로젝트를 완성하여 사용자에게 제공할 때는 빌드 작업을 거쳐서 배포해야 함.
    빌드 작업을 통해 프로젝트에서 사용되는 자바스크립트 파일 안에서 불필요한 주석, 경고 메시지, 공백 등을 제거하여
    파일의 크기를 최소화하기도 하고, 브라우저에서 JSX 문법이나 다른 최신 자바스크립트 문법이 원활하게 실행되도록
    코드의 트랜스 팡리 작업도 할 수 있음. 프로잭트 내에 이미지와 같은 정적 파일이 있다면 해당 파일을 위한 경로도 설정함.
    => 이 작업은 "웹팩(webpack)"이라는 도구가 담당함.

    웹팩에서 별도의 설정을 하지 않으면 프로젝트에서 사용 중인 모든 자바스크립트 파일과 모든 CSS 파일이 하나로 합쳐짐.
    
    CRA로 프로젝트를 빌드할 경우 최소 두 개 이상의 자바스크립트 파일이 생성되는데, CRA의 기본 웹팩 설정에는
    SplitChunk라는 기능이 적용되어 node_modules에서 불러온 파일, 일정 크기 이상의 파일, 여러 파일 간에 공유된 파일을
    자동으로 분리시켜서 캐싱의 효과를 제대로 누릴 수 있게 해 줌.

    $ yarn build
    명령어를 통해 프로젝트를 빌드한 후, bulid/static 디렉터리를 확인하면 여러 파일(js, css, media)이 생성됨.
    파일 이름을 보면 '7b7f7f25'와 같은 "해시(hash)"값이 포함되어 있음. 이 값은 빌드하는 과정에서 해당 파일에 내용에 따라 생성되며,
    이를 통해 브라우저가 새로 파일을 받아야 할지 말지를 결정할 수 있음.

    현재 2로 시작하는 파일에는 React, ReactDOM 등 node_modules에서 불러온 라이브러리 관련 코드가 들어있고,
    main으로 시작하는 파일에는 직접 프로젝트에 작성하는 App 같은 컴포넌트에 대한 코드가 들어 있음.
    SplitChunk라는 웹팩 기능을 통해 자주 바뀌지 않는 코드들이 2로 시작하는 파일에 들어 있기 때문에 캐싱의 이점을 더 오래 누릴 수 있음.
    Example)
        기존의 create react-app을 통해 생성한 프로젝트를 빌드한 후,
        App.js에 생성한 App 컴포넌트의 코드를 변경한 후 다시 빌드하면
        2로 시작하는 파일의 이름은 바뀌지 않지만 main으로 시작하는 파일의 이름이 바뀜.
    
    이렇게 파일을 분리하는 작업을 "코드 스플리팅"이라고 함.
    프로젝트에 기본 탑재된 SplitChunks 기능을 통한 코드 스플리팅은 단순히 효율적인 캐싱 효과만 있을 뿐.
    
    페이지 A, B, C로 구성된 '싱글 페이지 애플리케이션(SPA)'에서, 사용자가 A 페이지에 방문할 때,
    B와 C의 컴포넌트의 정보는 필요하지 않음. 사용자가 실제로 B 혹은 C 페이지로 이동하려고 할 때만 필요함.
    하지만 리액트 프로젝트에 별도로 설정하지 않으면 A, B, C 컴포넌트에 대한 코드가 모두 한 파일(main)에 저장됨.
    
    만약 애플리케이션의 규모가 커지면 지금 당장 필요하지 않은 컴포넌트의 정보도 모두 불러오면서 파일의 크기가 매우 커짐.
    그러면 로딩이 오래 걸리기 때문에 사용자 경험도 안 좋아지고 트래픽도 많이 나오게 됨.

    => 이러한 문제점을 해결해 줄 수 있는 방법이 바로 "코드 비동기 로딩"임.
    코드 비동기 로드를 통해 자바스크립트 함수, 객체, 혹은 컴포넌트를 처음에는 불러오지 않고 필요한 시점에 불러와서 사용할 수 있음.
*/

function AppNotSuspense() {
    const onClickNotSplitting = () => {
        // notify(); // 상단에 있는 코드를 불러오기 때문에 main에 생성된 함수를 불러옴
    }
    const onClick = () => {
        /*
        ==========Chapter 19.1==========
            자바스크립트 함수 비동기 로딩

            import를 상단에서 사용하지 않고 import() 함수 형태로 메서드 안에서 사용하면,
            파일을 따로 분리시켜서 저장함. 그리고 실제 함수가 필요한 지점에 파일을 불러와서
            함수를 사용할 수 있음.

            **
                import를 함수로 사용하면 Promise를 반환함.
                이렇게 import를 함수로 사용하는 문법은 비록 아직 표준 자바스크립트가 아니지만,
                stage-3 단계에 있는 "dynamic import"라는 문법임.

                현재는 웹팩에서 지원하고 있으므로 별도의 설정 없이 프로젝트에 바로 사용할 수 있음.
                이 함수를 통해 모듈을 불러올 때 모듈에서 default로 내보낸 것은 result.default를 참조해야 사용할 수 있음.
            **

            아래와 같이 Promise 형태로 import 구문을 작성한 후, yarn build 명령을 실행하면
            3으로 시작하는 파일 안에 notify 관련 코드가 들어감.
        */
        onClickNotSplitting();
        import('./notify').then(result => result.default());
    }
    return (
        <div className="App">
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                <p onClick={onClick}>Hello React</p>
            </header>
            <AppClass/>
        </div>
    );
}

/*
==========Chapter 19.2.2==========
    React.lazy와 Suspense 사용하기

    React.lazy와 Suspense를 사용하면 코드 스플리팅을 하기 위해 state를 따로 선언하지 않고도
    정말 간편하게 컴포넌트 코드 스플리팅을 할 수 있음.

    'React.lazy'는 컴포넌트를 렌더링하는 시점에서 비동기적으로 로딩할 수 있게 해 주는 유틸 함수.
    Example)
        const SplitMe = React.lazy(() => import('./SplitMe));

    'Suspense'는 리액트 내장 컴포넌트로서 코드 스플리팅된 컴포넌트를 로딩하도록 발동시킬 수 있고,
    로딩이 끝나지 않았을 때 보여 줄 UI를 설정할 수 있음.
    Example)
        import React, { Suspense } from 'react';

        (...)
        <Suspense fallback={<div>loading...</div>}>
            <SplitMe />
        </Suspense>
    이처럼 fallback props를 통해 로딩 중에 보여 줄 JSX를 지정할 수 있음.
*/
// const SplitMe = React.lazy(() => import('./SplitMe'));

/*
==========Chapter 19.2.3==========
    Loadable Components를 통한 코드 스플리팅

    "Loadable Components"는 코드 스플리팅을 편하게 하도록 도와주는 서드파이 라이브러리.
    이 라이브러리의 이점은 '서버 사이트 렌더링'을 지원한다는 것.(React.lazy, Suspense는 아직 지원하지 않음)
    또한 렌더링하기 전에 스플리팅된 파일을 미리 불러올 수 있는 기능도 있음.

    '서버 사이드 렌더링'이란 웹 서비스의 초기 로딩 속도 개선, 캐싱 및 검색 엔진 최적화를 가능하게 해 주는 기술.
    서버 사이드 렌더링을 사용하면 웹 서비스의 초기 렌더링을 사용자의 브라우저가 아닌 서버 쪽에서 처리함.
    사용자는 서버에서 렌더링한 html 결과물을 받아 와서 그대로 사용하기 때문에 초기 로딩 속도도 개선되고,
    검색 엔진에서 크롤링할 때도 문제 없음.

    $ yarn add @loadable/component
    명령어를 통해 Loadable Components 라이브러리를 다운로드.

    Loadable Components는 미리 불러오는 기능 외에도 타임아웃, 로딩 UI 딜레이, 서버 사이드 렌더링 호환 등 다양한 기능 제공.
    공식 문서: https://www.smooth-code.com/open-source/loadable-components/docs/delay/
*/
const SplitMe = loadable(() => import('./SplitMe'), {
    fallback: <div>loading...</div>
});

const App = () => {
    const [visible, setVisible] = useState(false);
    const onClick = () => {
        setVisible(true);
    };
    const onMouseOver = () => {
        // 마우스 오버 시 컴포넌트를 미리 불러옴.
        // 이렇게 수정하면 마우스 커서를 Hello React에 올리기만 해도 로딩이 시작됨.
        // 그리고 클릭 시 렌더링 됨.
        SplitMe.preload();
    }
    return (
        <div className="App">
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                <p onClick={onClick} onMouseOver={onMouseOver}>
                    Hello React!
                </p>
                {/*
                <Suspense fallback={<div>loading...</div>}>
                    {visible && <SplitMe />}
                </Suspense>
                */}
                {visible && <SplitMe />}
            </header>
        </div>
    )
}

export default App;

/*
==========Chapter 19.3==========
    정리

    서버 사이드 렌더링을 할 계획이 없다면 React.lazy와 Suspense로 구현하고,
    계획이 있다면 Loadable Components를 사용해야 함.
    리액트 공식 문서에서도 서버 사이드 렌더링을 할 경우 Loadable Components 라이브러리 사용을 권장하고 있음.

    React.lazy와 Suspense의 경우 지금 당장은 서버 사이드 렌더링을 지원하지 않지만 추후에는 지원될 수도 있으니
    공식 문서를 확인하면 됨. https://reactjs.org/docs/code-splitting.html#reactlazy
*/