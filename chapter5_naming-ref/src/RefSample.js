import React, {Component} from 'react';

/*
==========Chapter 5.2==========
  ref 사용

==========Chapter 5.2.1==========
  콜백 함수를 통한 ref 설정

  ref를 만드는 가장 기본적인 방법.
  
  ref를 달고자 하는 요소에 ref라는 콜백 함수를 props로 전달해 주면 됨.
  이 콜백 함수는 ref 값을 파라미터로 전달받으며,
  함수 내부에서 파라미터로 받은 ref를 컴포넌트의 멤버 변수로 설정해줌.
  
  Example)
    <input ref={(ref) => {this.input=ref}} />

  이렇게 하면 앞으로 this.input은 input 요소의 DOM을 가리킴.
  ref의 이름은 원하는 것으로 자유롭게 지정할 수 있음.
  DOM 타입과 관계없이 this.superman = ref처럼 마음대로 지정.

==========Chapter 5.2.2==========
    createRef를 통한 ref 설정

    ref를 만드는 또 다른 방법으로, 리액트에 내장되어 있는 createRef 함수를 사용함.
    이 함수를 사용해서 만들면 더 적은 코드로 쉽게 사용할 수 있음.

    이 기능은 리액트 v16.3부터 도입되었으며 이전 버전에서는 작동하지 않음.
*/
class RefSample extends Component {
    input = React.createRef();
    // createRef를 사용하여 ref를 만들기 위해
    // 컴포넌트 내부에서 멤버 변수로 React.createRef()를 담아줌.
    // 그리고 해당 멤버 변수를 ref를 달고자 하는 요소에 ref props로 넣어 주면 ref 설정 완료.
    handleFocus = () => {
        this.input.current.focus();
    }
    // 설정한 뒤 나중에 ref를 설정해 준 DOM에 접근하려면 this.input.current를 조회하면 됨.
    // 콜백 함수를 사용할 때와 다른 점은 이렇게 뒷부분에 .current를 넣어 주어야 한다는 것.
    render() {
        return (
            <div>
                <input ref={this.input} />
            </div>
        );
    }
}

export default RefSample;