import React, { Component } from 'react';
import MyComponent from './MyComponent';
import MyComponentProps from './MyComponentProps';
import Counter from './Counter';
import Say from './Say';
/*
----------Chapter 3.2.3.2----------
  모듈 불러오기
*/
import './App.css';


/*
==========Chapter 3.1==========
    클래스형 컴포넌트

  컴포넌트의 기능은 단순한 템플릿 이상
  데이터가 주어졌을 때 UI를 만들어주는 것은 물론이고,
  라이프사이클 API를 이용하여 컴포넌트가 화면에서 나타날 때, 사라질 때,
  변화가 일어날 때 주어진 작업들을 처리할 수 있으며,
  임의 메서드를 만들어 특별한 기능을 붙여줄 수 있음.

  리액트 공식 매뉴얼에서는 컴포넌트를 새로 작성할 때
  함수형 컴포넌트와 Hooks를 사용하도록 권장하고 있음.

  그렇다고 클래스형 컴포넌트가 사라지는 것은 아니므로
  클래스형 컴포넌트의 기능은 꼭 알아두어야 함.
*/

function AppFunction() {
  /*
    함수형 컴포넌트는 클래스형 컴포넌트보다 선언하기 편함.
    또한 메모리 자원도 클래스형 컴포넌트보다 덜 사용하고, 빌드한 후 배포할 때의 결과물 파일 크기도 비교적 작음.

    하지만 state 기능 및 라이프 사이클 API를 사용할 수 없다는 단점 존재
    => 이 단점은 리액트 v16.8 업데이트 이후 Hooks라는 기능이 도입되면서 해결.
  */
  
  /*
  ==========Chapter 3.3.2==========
    컴포넌트를 사용할 때 props 값 지정하기
  */
  // return <MyComponentProps name="React"/>; // props를 넘겨 줌
  // return <MyComponentProps />; // props를 넘겨주지 않음 => defaultProps로 설정
  return <MyComponentProps favoriteNumber={98}>리액트</MyComponentProps>; // 태그 사이의 내용인 children을 넘김
} // 함수형 컴포넌트



class AppClass extends Component {
  /*
    클래스형 컴포넌트는 state 기능 및 라이프 사이클 API를 사용할 수 있음.
    또한 임의 메서드를 정의할 수 있음.

    클래스형 컴포넌트는 render() 함수가 꼭 있어야하고, 그 안에서 보여 주어야 할 JSX를 반환해야 함.
  */
  render() {
    const name = 'React';
    return <div className="react">{name}</div>;
  }
} // 클래스형 컴포넌트



/*
==========Chapter 3.5==========
  state를 사용할 때 주의 사항

  state 값을 바꾸어야 할 때는 setState 혹은 useState를 통해 전달받은 세터 함수를 사용해야 함.
  Example)
    // 클래스형 컴포넌트에서...
    this.state.number = this.state.number + 1;
    this.state.array = this.state.array.push(2);
    this.state.object.value = 5;

    // 함수형 컴포넌트에서...
    const [object, setObject] = useState({ a: 1, b: 1 });
    object.b = 2;

  배열이나 객체를 업데이트해야할 때는 배열이나 객체 사본을 만들고 그 사본에 값을 업데이트한 후
  그 사본의 상태를 setState 혹은 세터 함수를 통해 업데이트합니다.
  Example)
    // 객체 다루기
    const object = { a: 1, b: 2, c: 3 };
    const nextObject = { ...object, b: 2}; // 사본을 만들어서 b값만 덮어 쓰기

    // 배열 다루기
    const array = [
      { id: 1, value: true },
      { id: 2, value: true },
      { id: 3, value: false }
    ];
    let nextArray = array.concat({id : 4}); // 새 항목 추가
    nextArray.filter(item => item.id !== 2); // id가 2인 항목 제거
    nextArray.map(item => (item.id === 1 ? { ...item, value: false } : item)); // id가 1인 항목의 value를 false로 설정

  객체에 대한 사본을 만들 때는 spread 연산자라 불리는 ...을 사용하여 처리하고,
  배열에 대한 사본을 만들 때는 배열의 내장 함수들을 활용.
*/

const App = () => {
  return (
    <>
      <Counter />
      <Say />
    </>
  )
}

export default App;

/*
==========Chapter 3.6==========
  정리

  props와 state는 둘 다 컴포넌트에서 사용하거나 렌더링할 데이터를 담고 있으므로
  비슷해 보일 수 있지만, 그 역할은 매우 다름.

  props는 부모 컴포넌트가 설정하고, state는 컴포넌트 자체적으로 지닌 값으로 컴포넌트 내부에서 값을 업데이트할 수 있음.

  props를 사용한다고 해서 값이 무조건 고정적이지는 않음.
  부모 컴포넌트의 state를 자식 컴포넌트의 props로 전달하고, 자식 컴포넌트에서 특정 이벤트가 발생할 때
  부모 컴포넌트의 메서드를 호출하면 props도 유동적으로 사용할 수 있음.
*/