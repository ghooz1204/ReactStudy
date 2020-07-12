import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import rootReducer from './modules';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import * as serviceWorker from './serviceWorker';

/*
==========Chapter 17.4==========
    리액트 애플리케이션에 리덕스 적용하기

==========Chapter 17.4.1==========
    스토어 만들기
*/
const store = createStore(
    rootReducer, // preloadedState,
    // window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    composeWithDevTools()
);

/*
==========Chapter 17.4.2==========
    Provider 컴포넌트를 사용하여 프로젝트에 리덕스 적용하기

    리액트 컴포넌트에서 스토어를 사용할 수 있도록 App 컴포넌트를 react-redux에서 제공하는 Provider 컴포넌트로 감싸 줌.
    이 컴포넌트를 사용할 때는 store를 props로 전달해 주어야 함.
*/

/*
==========Chapter 17.4.3==========
    Redux DevTools의 설치 및 적용

    Redux DevTools는 리덕스 개발자 도구이며, 크롬 확장 프로그램을 설치하여 사용할 수 있음.
    크롬 웹 스토어(https://chrome.google.com/webstore/)에서 Redux DevTools를 검색하여 설치.

    설치하고 나면 리덕스 스토어를 적용해야 하는데,
    const store = createStore(
        rootReducer, // preloadedState,
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    );
    위와 같은 코드로 적용할 수도 있고,

    $ yarn add redux-devtools-extension
    명령어를 통해 패키치를 설치하여 적용할 수도 있음.
*/

ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
            <App />
        </Provider>
    </React.StrictMode>,
    document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();