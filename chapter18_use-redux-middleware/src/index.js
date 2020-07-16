import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import rootReducer, { rootSaga } from './modules';
// import loggerMiddleware from './lib/loggerMiddleware';
import { createLogger } from 'redux-logger';
import ReduxThunk from 'redux-thunk';
import createSagaMiddleware from 'redux-saga';
import { composeWithDevTools } from 'redux-devtools-extension';

/*
==========Chapter 18.2.2==========
    redux-logger 사용하기

    $ yarn add redux-logger
    명령어를 통해 콘솔에 색상도 입혀지고, 액션 디스패치 시간도 나타나는 라이브러리 다운로드.
*/

/*
==========Chapter 18.3==========
    비동기 작업을 처리하는 미들웨어 사용

    오픈 소스 커뮤니티에 공개된 미들웨어는 정말 많음. 그 중 비동기 작업을 처리할 때 사용하는 유명한 미들웨어가 두 가지 있는데.
    1. redux-thunk :
        비동기 작업을 처리할 때 가장 많이 사용하는 미들웨어, 객체가 아닌 함수 형태의 액션을 디스패치할 수 있게 해줌.
    2. redux-saga :
        다음으로 가장 많이 사용하는 미들웨어, 특정 액션이 디스패치되었을 때 정해진 로직에 따라 다른 액션을 디스패치 시키는 규칙을 작성하여 비동기 처리.

==========Chapter 18.3.1==========
    redux-thunk

    redux-thunk는 리덕스를 사용하는 프로젝트에서 비동기 작업을 처리할 때 가장 기본적으로 사용하는 미들웨어.

----------Chapter 18.3.1.1----------
    Thunk란?

    "Thunk"는 특정 작업을 나중에 할 수 있도록 미루기 위해 함수 형태로 감싼 것을 의미함.
    Example)
        const addOne = x => x + 1;
        addOne(1); // 2

        주어진 파라미터에 1을 더하는 함수. 이 코드를 실행하면 addOne을 호출했을 때 바로 1+1이 연산됨.
        만약 이 연산을 나중에 하도록 미루고 싶다면,

        const addOne = x => x + 1;
        function addOneThunk(x) {
            const thunk = () => addOne(x);
            return thunk;
        }

        const fn = addOneThunk(1);
        setTimeout(() => {
            const value = fn(); // fn이 실행되는 시점에 연산
            console.log(value);
        }, 1000);

        이렇게 하면 특정 작업을 나중에 하도록 미룰 수 있음.
        만약 addOneThunk를 화살표 함수로만 사용한다면,
        * const addOneThunk = x => () => addOne(x);
        와 같이 구현할 수 있음.

    redux-thunk 라이브러리를 사용하면 thunk 함수를 만들어서 디스패치할 수 있음.
    그러면 리덕스 미들웨어가 그 함수를 전달받아 store의 dispatch와 getState를 파라미터로 넣어서 호출해 줌.
    Example)
        const sampleThunk = () => (dispatch, getState) => {
            // 현재 상태를 참조할 수 있고,
            // 새 액션을 디스패치할 수도 있음.
        }

----------Chapter 18.3.1.2----------
    미들웨어 적용하기

    $ yarn add redux-thunk
    명령어를 통해 라이브러리를 다운로드함.
*/

const logger = createLogger();
const sagaMiddleware = createSagaMiddleware();
const store = createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(logger, ReduxThunk, sagaMiddleware))
);

sagaMiddleware.run(rootSaga);

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
