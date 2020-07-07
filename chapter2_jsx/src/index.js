import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
/*
  <App /> 와 같이 컴포넌트를 마치 HTML TAG 작성하듯이 사용 가능함.

  여기서 ReactDom.render는 컴포넌트를 페이지에 렌더링하는 역할을 하며,
  react-dom 모듈을 불러와 사용할 수 있다.
  이 함수의 첫 번째의 파라미터는 페이지에 렌더링 할 내용을 JSX로 작성하고,
  두 번째 파라미터는 해당 JSX를 렌더링 document 내부 요소를 설정함.

  여기서 document 내부 요소는 public/index.html에 <div id="root"></div> 태그임.
*/

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
