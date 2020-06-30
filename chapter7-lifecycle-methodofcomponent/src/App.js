import React, { Component } from 'react';
import './App.css';
import LifeCycleSample from './LifeCycleSample';
import ErrorBoundary from './ErrorBoundary';

/*
==========Chapter 7==========
  컴포넌트의 라이프사이클 메서드

  모든 리액트 컴포넌트에는 라이프사이클(수명 주기)이 존재함.
  컴포넌트의 수명은 페이지에 렌더링 되기 전인 준비 과정에서 시작하여 페이지에서 사라질 때 끝남.

  리액트 프로젝트를 진행하다 보면
  가끔 컴포넌트를 처음으로 렌더링할 때 어떤 작업을 처리해야 하거나
  컴포넌트를 업데이트하기 전후로 어떤 작업을 처리해야할 수도 있고,
  또 불필요한 업데이트를 방지해야 할 수도 있음.

  이때는 컴포넌트의 라이프사이클 메서드를 사용하여 처리함.

  라이프사이클 메서드는 클래스형 컴포넌트에서만 사용할 수 있으나,
  함수형 컴포넌트에서 Hooks 기능을 활용하여 비슷한 작업을 처리할 수 있음.
*/



/*
==========Chapter 7.1==========
  라이프사이클 메서드의 이해

  라이프사이클 메서드의 종류는 총 아홉가지.
  Will 접두사가 붙은 메서드는 어떤 작업을 작동하기 전 실행되는 메서드.
  Did 접두사가 붙은 메서드는 어떤 작업을 작동한 후에 실행되는 메서드.

  라이프사이클은 [마운트, 업데이트, 언마운트]의 총 세 가지 카테고리로 나눔.

  1. 마운트
    DOM이 생성되고 웹 브라우저 상에 나타나는 것을 마운트(mount)라고 함.
    -- 마운트할 때 호출하는 메서드 --
      * constructor: 컴포넌트를 새로 만들 때마다 호출되는 클래스 생성자 메서드.
      * getDerivedStateFromProps: props에 있는 값을 state에 넣을 때 사용하는 메서드.
      * render: 우리가 준비한 UI를 렌더링하는 메서드
      * componentDidMount: 컴포넌트가 웹 브라우저 상에 나타난 후 호출하는 메서드.
  
  2. 업데이트
    [props가 바뀔 때, state가 바뀔 때, 부모 컴포넌트가 리렌더링될 때, this.forceUpdate로 강제로 렌더링을 트리거할 때]
    컴포넌트는 위 네 가지 경우에 업데이트함.

    컴포넌트는 다양한 이유로 업데이트될 수 있음.
      1) 부모 컴포넌트에서 넘겨주는 props가 바뀜: 컴포넌트에 전달하는 props의 값이 바뀌면 컴포넌트의 렌더링이 이루어 짐.
      2) 컴포넌트 자신이 들고 있는 state가 setState를 통해 업데이트될 때
      3) 부모 컴포넌트가 리렌더링될 때: 자신에게 할당된 props가 바뀌지 않아도, 또는 자신이 들고있는 state가 바뀌지 않아도 부모 컴포넌트가 리렌더링되면 자식 컴포넌트 또한 리렌더링 됨.
    -- 업데이트할 때 호출하는 메서드 --
      * getDerivedStateFromProps:
        이 메서드는 마운트 과정에서도 호출, 업데이트가 시작하기 전에도 호출됨.
        props의 변화에 따라 state 값에도 변화를 주고 싶을 때 사용.
      * shouldComponentUpdate:
        컴포넌트가 리렌더링을 해야 할지 말아야 할지를 결정하는 메서드.
        이 메서드에서는 true 혹은 false를 반환해야 하며, true를 반환하면 다음 라이프사이클 실행, false를 반환하면 작업을 중지함.
        즉, 컴포넌트가 리렌더링 되지 않음.
        만약 특정 함수에서 this.forceUpdate() 함수를 호출한다면 이 과정을 생략하고 바로 render 함수 호출.
      * render: 컴포넌트를 리렌더링함.
      * getSnapshotBeforeUpdate: 컴포넌트의 변화를 DOM에 반영하기 바로 직전에 호출하는 메서드.
      * componentDidUpdate: 컴포넌트의 업데이트 작업이 끝난 후 호출하는 메서드.
  
  3. 언마운트
    마운트의 반대 과정, 즉 컴포넌트를 DOM에서 제거하는 것을 언마운트(unmount)라고 함.
    -- 언마운트할 때 호출하는 메서드 --
      * componentWillUnmount: 컴포넌트가 웹 브라우저 상에서 사라지기 전에 호출하는 메서드.
*/



/*
==========Chapter 7.3.2==========
  App 컴포넌트에서 예제 컴포넌트 사용
*/

function getRandomColor() {
  return '#' + Math.floor(Math.random() * 16777215).toString(16);
}
/*
  getRandomColor 함수는 state의 color 값을 랜덤 색상으로 설정.
  **
    16777215를 hex로 표현하면 ffffff가 되므로
    해당 코드는 000000부터 ffffff 값을 반환.
  **

  버튼을 렌더링하고, 누를 대마다 handleClick 메서드가 호출되게 이벤트를 설정하며,
  불러운 LifeCycleSample 컴포넌트에 color 값을 props로 설정.
*/
class App extends Component {
  state = {
    color: '#000000'
  };
  handleClick = () => {
    this.setState({
      color: getRandomColor()
    });
  }
  render() {
    return (
      <div>
        <button onClick={this.handleClick}>랜덤 색상</button>
        <ErrorBoundary>
          <LifeCycleSample color={this.state.color}/>
        </ErrorBoundary>
      </div>
    )
  }
};

export default App;

/*
==========Chapter 7.4==========
  정리

  라이프사이클 메서드는 컴포넌트 상태에 변화가 있을 때마다 실행하는 메서드.
  이 메서드들은 서드파티 라이브러리를 사용하거나 DOM을 직접 건드려야 하는 상황에서 유용.
  
  추가로 컴포넌트 업데이트의 성능을 개선할 때는 shouldComponentUpdate가 중요하게 사용.
*/