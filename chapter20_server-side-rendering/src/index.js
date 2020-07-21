import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter } from 'react-router-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import createSagaMiddleware from 'redux-saga';
import rootReducer, { rootSaga } from './modules';
import { loadableReady } from '@loadable/component'
/*
==========Chapter 20.5.4==========
  loadableReady와 hydrate

  Loadable Components를 사용하면 성능을 최적화하기 위해 모든 자바스크립트 파일을 동시에 받아옴.
  모든 스크립트가 로딩되고 나서 렌더링하도록 처리하기 위해서는 loadableReady라는 함수를 사용해 주어야 함.
  
  추가로 리액트에는 render 함수 대신에 사용할 수 있는 hydrate라는 함수가 있음.
  이 함수는 기존에 서버 사이드 렌더링된 결과물이 이미 있을 경우 새로 렌더링하지 않고
  기존에 존재하는 UI에 이벤트만 연동하여 애플리케이션을 초기 구동할 때 필요한 리소스를 최소화함으로써 성능을 최적화.
*/

const sagaMiddleware = createSagaMiddleware();

const store = createStore(
  rootReducer,
  window.__PRELOADED_STATE__, // 이 값을 초기 상태로 사용함.
  applyMiddleware(thunk, sagaMiddleware)
);

sagaMiddleware.run(rootSaga);

// 같은 내용을 쉽게 재사용할 수 있도록 렌더링할 내용을 하나의 컴포넌트로 묶음
const Root = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  );
};
const root = document.getElementById('root');

// 프로덕션 환경에서는 loadableReady와 hydrate를 사용하고
// 개발 환경에서는 기존 방식으로 처리
if (process.env.NODE_ENV === 'production') {
  loadableReady(() => {
    ReactDOM.hydrate(<Root />, root);
  });
} else {
  ReactDOM.render(<Root />, root);
}

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
