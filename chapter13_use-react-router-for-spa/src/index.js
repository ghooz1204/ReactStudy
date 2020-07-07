import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

/*
==========Chapter 13.2==========
  프로젝트 준비 및 기본적인 사용법

==========Chapter 13.2.1==========
  프로젝트 생성 및 라이브러리 설치

  $ yarn add react-router-dom

==========Chapter 13.2.2==========
  프로젝트에 라우터 적용

  프로젝트에 라우터를 적용할 때는 src/index.js 파일에서 react-router-dom에 내장되어 있는
  BrowserRouter라는 컴포넌트를 사용하여 감싸면 됨.
  이 컴포넌트는 웹 애플리케이션에 HTML5의 History API를 사용하여 페이지를 새로고침하지 않고도
  주소를 변경하고, 현재 주소에 관련된 정보를 props를 쉽게 조회하거나 사용할 수 있도록 해줌.
*/

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
