import React from 'react';
import './App.css';
import IterationSample from './IterationSample';

function App() {
  /*
  ==========Chapter 6.2.2==========
    App 컴포넌트에서 예제 컴포넌트 렌더링

    아직 크롬 개발자 도구의 콘솔을 열어보면
    "key" prop이 없다는 경고 메세지를 표시하므로
    완벽하지 않음.
  */
  return (
    <IterationSample />
  );
}

export default App;

/*
==========Chapter 6.5==========
  정리

  컴포넌트 배열을 렌더링할 때는 key 값 설정에 항상 주의.
  또 key 값은 언제나 유일해야 함. => key 값이 중복되면 렌더링 과정에서 오류 발생.

  상태 안에서 배열을 변형할 때는 배열에 직접 접근하여 수정하는 것이 아니라
  concat, filter 등의 배열 내장 함수를 이용하여 새로운 배열을 만든 후
  이를 새로운 상태로 설정해 주어야 함!
*/