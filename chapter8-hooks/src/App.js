import React, { useState } from 'react';
import './App.css';
// import Counter from './Counter';
import Counter from './reducerCounter';
// import Info from './info';
// import Info from './reducerInfo';
import Info from './customInfo';
import Average from './Average';

/*
==========Chapter 8==========
  Hooks

  Hooks는 리액트 v16.8에 새로 도입된 기능으로
  함수형 컴포넌트에서도 상태 관리를 할 수 있는 useState,
  렌더링 직후 작업을 설정하는 useEffect 등의 기능을 제공하여
  기존의 함수형 컴포넌트에서 할 수 없었던 다양한 작업을 할 수 있게 해줌.
*/

function App() {
  const [visible, setVisible] = useState(false);
  return (
    <div className="App">
      <Counter />
      <div>
        <button onClick={() => setVisible(!visible)}>
          {visible ? '숨기기' : '보이기'}
        </button>
        <hr />
        {visible && <Info />}
      </div>
      <div>
        <Average />
      </div>
    </div>
  );
}

export default App;

/*
==========Chapter 8.8==========
  다른 Hooks

  커스텀 Hooks을 만들어서 사용했던 것처럼,
  다른 개발자가 만든 Hooks도 라이브러리로 설치하여 사용할 수 있음.

  참고 사이트
    https://nikgarf.github.io/react-hooks/
    https://github.com/rehooks/awesome-react-hooks
*/

/*
==========Chapter 8.9==========
  정리

  리액트에서 Hooks 패턴을 사용하면 클래스형 컴포넌트를
  작성하지 않고도 대부분의 기능을 구현할 수 있음.
  이러한 기능이 리액트에 릴리즈되었다고 해서 기존의 setState를
  사용하는 방식이 잘못된 것은 아님.

  리액트 메뉴얼에 따르면, 기존의 클래스형 컴포넌트는 앞으로도 계속해서 지원될 예정
  다만, 메뉴얼에서는 새로 작성하는 컴포넌트의 경우 함수형 컴포넌트와 Hooks를 사용할 것을 권장.
  함수형 컴포넌트의 사용을 첫 번째 옵션, 꼭 필요한 상황에서만 클래스형 컴포넌트 사용.
*/