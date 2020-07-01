import React from 'react';
import logo from './logo.svg';
import './App.css';
import SassComponent from './SassComponent';

/*
==========Chapter 9==========
  컴포넌트 스타일링

  리액트에서 컴포넌트를 스타일링할 때는 다양한 방식을 사용할 수 있음.
    1. 일반 CSS: 컴포넌트를 스타일링하는 가장 기본적인 방식
    2. Sass: 자주 사용하는 CSS 전처리기(pre-processor) 중 하나로 확장된 CSS 문법을 사용하여 CSS 코드를 더욱 쉽게 작성할 수 있도록 해줌
    3. CSS Module: 스타일을 작성할 때 CSS 클래스가 다른 CSS 클래스의 이름과 절대 충돌하지 않도록 파일마다 고유한 이름을 자동으로 생성해 주는 옵션.
    4. styled-components: 스타일을 자바스크립트 파일에 내장시키는 방식으로 스타일을 작성함과 동시에 해당 스타일이 적용된 컴포넌트를 만들 수 있게 해줌.

==========Chapter 9.1==========
  가장 흔한 방식, 일반 CSS

  프로젝트는 일반 CSS 방식으로 만들어져 있음.
  기존의 CSS 스타일링이 딱히 불편하지 않고 새로운 기술을 배울 필요가 없다고 생각되면,
  일반 CSS를 계속 사용해도 무방.

  실제로도 소규모 프로젝트를 개발하고 있다면 새로운 스타일링 시스템을 적용하는 것이
  불필요할 수도 있음. 그런 상황에는 프로젝트에 이미 적용되어 있는 기본 CSS 시스템을
  사용하는 것만으로도 충분.

  CSS를 작성할 때 가장 중요한 점은 CSS 클래스를 중복되지 않게 만드는 것.
  CSS 클래스가 중복ㅈ되는 것을 방지하는 여러 가지 방식이 있는데,
    그중 하나는 이름을 지을 때 특별한 규칙을 사용하여 짓는 것.
    또 다른 하나는 CSS Selector를 활용하는 것.
*/

function App() {
  return (
    <div className="App">
      <SassComponent />
    </div>
  );
}

export default App;
