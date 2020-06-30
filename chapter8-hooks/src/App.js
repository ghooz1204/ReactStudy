import React, { useState } from 'react';
import './App.css';
// import Counter from './Counter';
import Counter from './reducerCounter';
// import Info from './info';
import Info from './reducerInfo';

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
    </div>
  );
}

export default App;
