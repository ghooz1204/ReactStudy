import React from "react";
import ValidationSample from "./ValidationSample";
import ScrollBox from "./ScrollBox";
import "./App.css";

/*
==========Chapter 5.1.2==========
  App 컴포넌트에서 예제 컴포넌트 렌더링

==========Chapter 5.1.3==========
  DOM을 꼭 사용해야 하는 상황

  - 특정 input에 포커스 주기
  - 스크롤 박스 조작하기
  - Canvas 요소에 그림 그리기 등
  
  이때는 어쩔 수 없이 DOM에 직접적으로 접근해야 하는데, 이를 위해 바로 ref를 사용함.
*/

/*
==========Chapter 5.3.4==========
  컴포넌트에 ref 달고 내부 메서드 사용

  ScrollBox에 ref를 달고 버튼을 만들어 누르면,
  ScrollBox 컴포넌트의 내부 메서드 scrollToBottom을 실행.

  **
    주의할 점.

    문법상으로는 onClick={this.scrollBox.scrollBottom} 같은 형식으로
    작성해도 틀린 것은 아님. 하지만 컴포넌트가 처음 렌더링될 때는 this.scrollBox 값이 undefined이므로
    this.scrollBox.scrollToBottom 값을 읽어 오는 과정에서 오류가 발생함.
    
    화살표 함수 문법을 사용하여 아예 새로운 함수를 만들고,
    그 내부에서 this.scrollBox.scrollToBottom 메서드를 실행하면,
    버튼을 누를 때(이미 한 번 렌더링을 해서 this.scrollBox를 설정한 시점)
    this.scrollBox.scrollToBottom 값을 읽어와서 실행하므로 오류가 발생하지 않음.
  **
*/
class App extends React.Component {
  render() {
    return (
      <div>
        <ValidationSample />
        {
          /*
          ----------Chapter 5.3.2.2----------
            App 컴포넌트에서 스크롤 박스 컴포넌트 렌더링
            
            ScrollBox.js
          */
        }
        <ScrollBox ref={(ref) => (this.scrollBox = ref)} />
        <button onClick={() => this.scrollBox.scrollToBottom()}>
          맨 밑으로
        </button>
      </div>
    );
  }
}

export default App;

/*
==========Chapter 5.4==========
  정리

  컴포넌트 내부에서 DOM에 직접 접근해야 할 때는 ref를 사용함.
  => 먼저 ref를 사용하지 않고도 원하는 기능을 구현할 수 있는지 반드시 고려한 후 활용.

  서로 다른 컴포넌트끼리 데이터를 교류할 때 ref를 사용한다면 매우 잘못된 사용.
  물론 할 수는 있으나 리액트 사상에 어긋난 설계로, 앱 규모가 커지면 스파게티 코드로 유지 보수가 불가능해짐.
  => 컴포넌트끼리 데이터를 교류할 때는 언제나 데이터를 부모 <-> 자식 흐름으로 교류해야 함.
  => Redux, Context API를 활용하여 효율적으로 교류 가능.

  함수형 컴포넌트에서는 useRef라는 Hook 함수를 사용함.
*/