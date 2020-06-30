import React from 'react';
import EventPractice from './EventPractice';
import EventPracticeFunction from './EventPractiveFunction';

/*
----------Chapter 4.2.1.2----------
  App.js에서 EventPractice 렌더링
*/

const App = () => {
  return (
    <>
      <EventPractice />
      <p>위는 클래스 아래는 함수</p>
      <EventPracticeFunction />
    </>
  );
}

export default App;

/*
==========Chapter 4.4==========
  정리

  리액트에서 이벤트를 다루는 것은 순수 자바스크립트 또는 JQuery를 사용한
  웹 애플리케이션에서 이벤트를 다루는 것과 비슷함.

  리액트의 장점 중 하나는 자바스크립트에 익숙하다면 쉽게 활용할 수 있다는 것.
  따라서 기존 HTML DOM Event를 알고 있다면 리액트의 컴포넌트 이벤트도 쉽게 다룰 수 있음.
*/