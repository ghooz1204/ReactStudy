import React, {Fragment} from 'react'; // 리액트를 불러와서 사용할 수 있게 해줌
/*
  require 및 import는 Node.js에서 지원하는 기능
  => 이러한 기능을 브라우저에서 사용하기 위해서 번들러(bundler)를 사용함.
  Webpack, Parcel, browserify 등의 번들러가 있으며 리액트는 주로 Webpack을 사용함.
*/

import logo from './logo.svg';
import './App.css';
// Webpack을 사용하면 SVG파일과 CSS 파일도 불러와서 사용할 수 있음
// Webpack의 로더(loader)(file-loader, css-loader)라는 기능이 담당.

/*
  Webpacke의 Babel로더는 자바스크립트 파일들을 불러오면서 최신 자바스크립트 문법으로 작성된 코드를 ES5 문법으로 변환해 줌.

  JSX 문법
  function App() {
    return (
      <div>
        Hello <b>react</b>
      </div>
    )
  } 와 같이 작성된 코드는

  function App() {
    return React.createElement("div", null, "Hello ", React.createElement("b", null, "react"));
  }
  와 같이 변환됨.

  **
    JSX는 공식적인 자바스크립트 문법이 아님.
    Babel에서는 여러 문법을 지원할 수 있도록 preset 및 plugin을 설정함.
    Babel을 통해 개발자들이 임의로 만든 문법, 혹은 차기 자바 스크립트의 문법들을 사용할 수 있음.
  **
*/

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}
// App이라는 컴포넌트(Component)를 만들어줌.
// function 키워드를 사용하여 만들었기 때문에 '함수형 컴포넌트'

/*
==========Chapter 2.4.1==========
  감싸인 요소

  아래와 같이 두 가지 이상의 태그를 하나로 감싸지 않으면 오류 발생.
  Virtual DOM에서 컴포넌트 변화를 감지해 낼 때 효율적으로 비교할 수 있도록
  컴포넌트 내부는 하나의 DOM 트리 구조로 이루어져야 한다는 규칙 때문.
*/
function AppCoverdElement() {
  return (
    <>
      <Fragment>
        {/* Fragment와 같은 태그로 감싸지 않고 두 가지 요소가 return에 노출되어 있으면 오류 발생 */}
        <h1>리액트 안녕!</h1>
        <h2>잘 작동하니?</h2>
      </Fragment>
    </>
  );
}

/*
==========Chapter 2.4.2==========
  자바스크립트 표현

  자바스크립트 표현식을 사용하려면 JSX 내부에서 코드를 {}로 감싸면 됨.
*/
function AppRenderJavascript() {
  const name = '리액트';
  return (
    <>
      <h1>{name} 안녕!</h1>
      <h2>잘 작동하니?</h2>
    </>
  );
}

/*
==========Chapter 2.4.3==========
  If문 대신 조건부 연산자

  자바스크립트 표현삭 {} 에서 if문을 사용할 수는 없음.
  조건에 따라 다른 내용을 렌더링하기 위해서는 JSX 밖에서 if문으로 사전에 값을 설정하거나,
  {} 안에 조건부 연산자(삼항 연산자)를 사용하면 됨.
*/
function AppConditionalOperation() {
  const name = '리액트';
  // const name = '뤼액트'
  return (
    <div>
      {name === '리액트' ? (
        <h1>리액트입니다.</h1>
      ) : (
        <h2>리액트가 아닙니다.</h2>
      )}
    </div>
  );
}

/*
==========Chapter 2.4.4==========
  AND 연산자(&&)를 사용한 조건부 렌더링

  특정 조건을 만족할 때 내용을 보여주고, 만족하지 않으면 아예 렌더링 하지 않음
  **
    주로 JSX를 여러 줄로 작성할 때 괄호로 감싸고
    한 줄로 표현할 수 있는 JSX는 감싸지 않음.
  **
*/
function AppConditionalOperationNull() {
  const name = '리액트';
  return <div>{name === '리액트' ? <h1>리액트입니다.</h1> : null}</div>;
} // 위 코드와 같이 null을 렌더링하면 아무 것도 보여주지 않음.
function AppConditionalANDOperation() {
  const name = '리액트';
  return <div>{name === '리액트' && <h1>리액트입니다.</h1>}</div>;
} // 이렇게 코드를 작성하면 브라우저에 아무것도 나타나지 않음.
// 위 코드보다 조금 더 간결한 코드
/*
  && 연산자로 조건부 렌더링 할 수 있는 이유는
  리액트에서 false를 렌더링할 때는 null과 마찬가지로
  아무 것도 나타나지 않기 때문.

  하지만
  const number = 0
  return number && <div>내용</div>
  과 같이 falsy한 값인 0은 예외적으로 화면에 나타남 
*/

/*
==========Chapter 2.4.5==========
  undefined를 렌더링하지 않기

  리액트 컴포넌트에서는 함수에서 undefined만 반환하여 렌더링하는 상황을 만들면 안됨.
  function App() {
    const name = undefined
    return name
  } 과 같은 코드는 오류를 발생시킴

  때문에 어떤 값이 undefined일 수도 있다면, OR(||) 연산자를 사용하여 요류를 방지해야함.
*/
function AppExceptionUndefined() {
  const name = undefined;
  return name || '값이 undefined입니다.';
}
function AppPossibleUndefined() {
  const name = undefined;
  return <div>{name}</div>;
} // JSX 내부에서 undefined를 렌더링하는 것은 괜찮음
function AppApplyToUndefined() {
  const name = undefined;
  return <div>{name || '리액트'}</div>;
} // 값이 undefined일 때 보여 주고 싶은 문구가 있다면 이런 식으로 활용.

/*
==========Chapter 2.4.6==========
  인라인 스타일링

  리액트에서 DOM요소에 스타일을 적용할 때는 문자열 형태로 넣는 것이 아니라
  객체 형태로 넣어주어야 하고, 스타일 이름 중에서 background-color처럼 - 문자가 포함되는 이름은
  backgroundColor와 같이 카멜 표기법(camelCase)으로 작성해야 함.
*/
function AppInlineStyling() {
  const name = '리액트';
  const style = {
    // background-color는 backgroundColor와 같이 -가 사라지고 카멜 표기법으로 작성됩니다.
    backgroundColor: 'black',
    color: 'aqua',
    fontSize: '48px', // font-size => fontSize
    fontWeight: 'blod', // font-weight => fontWeight
    padding: 16 // 단위를 생략하면 px로 지정됩니다.
  };
  return <div style={style}>{name}</div>;
  // 미리 선언하지 않고 바로 style 값을 지정하려면 아래와 같이 작성.
  /*
    return (
      <div style={{
        // background-color는 backgroundColor와 같이 -가 사라지고 카멜 표기법으로 작성됩니다.
        backgroundColor: 'black',
        color: 'aqua',
        fontSize: '48px', // font-size => fontSize
        fontWeight: 'blod', // font-weight => fontWeight
        padding: 16 // 단위를 생략하면 px로 지정됩니다.
      }}>{name}</div>
    )
  */
}

/*
==========Chapter 2.4.7==========
  class 대신 className

  JSX에서는 HTML의 CSS 클래스를 사용할 때 class가 아닌 className으로 설정해야함.

  JSX를 작성할 때 className이 아닌 class 값을 설정해도 스타일이 적용되기는 함.
  하지만 브라우저 개발자 도구의 Console 탭에서 경고문이 나타남.

  이전에는 class로 CSS 클래스를 설정할 때 오류가 발생하고 CSS 클래스가 적용되지 않았는데,
  리액트 v16 이상부터는 class를 className으로 변환시켜 주고 경고를 띄움.
*/
function AppClassName() {
  const name = '리액트';
  return <div className="react">{name}</div>;
}

/*
==========Chapter 2.4.8==========
  꼭 닫아야 하는 태그

  HTML 코드를 작성할 대에는 가끔 태그를 닫지 않은 상태로 코드를 작성하여도 문제가 없지만,
  HTML Example)
    <form>
      성: <br>
        <input><br>
      이름: <br>
      <input>
    </form>
  JSX에서는 태그를 닫지 않으면 오류가 발생함.
*/
function AppMustCloseTag() {
  const name = '리액트';
  return (
    <>
      <div className="react">{name}</div>
      {/* <input> 만 사용하면 오류 */}
      <input></input>
      {/*
        ** self-closing 태그 **
        <input />
        태그를 선언하면서 동시에 닫음.
        태그 사이에 별도의 내용이 들어가지 않는 경우에 작성.
      */}
    </>
  );
}

/*
==========Chapter 2.4.9==========
  주석
*/
function AppRemark() {
  const name = '리액트';
  return (
    <>
      {/* 주석은 이렇게 작성합니다. */}
      <div
        className="react" // 시작 태그를 여러 줄로 작성하게 된다면 여기에 주석을 작성할 수 있습니다.
      >
        {name}
      </div>
      // 하지만 이런 주석이나
      /* 이런 주석은 페이지에 그대로 나타남 */
      HTML 주석은 사용할 수 없음
      <input />
    </>
  );
}
export default App;