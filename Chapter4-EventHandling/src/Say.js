import React, { useState } from 'react';
/*
==========Chapter 4.1==========
    리액트의 이벤트 시스템

==========Chapter 4.1.1==========
    이벤트를 사용할 때 주의사항
    
    1. 이벤트 이름은 카멜 표기법으로 작성.
        에를 들어 HTML의 onclick은 리액트에서 onClick으로, onkeyup은 onKeyUp으로 작성함.

    2. 이벤트에 실행할 자바스크립트 코드를 전달하는 것이 아니라 함수 형태의 값을 전달함.
        HTML에서 이벤트를 설정할 때는 큰 따옴표 안에 실행할 코드를 넣었지만, 리액트에서는 함수 형태의 객체를 전달함.
        앞서 아래쪽 버튼 예제에서도 화살표 함수 문법으로 함수를 만들어 전달한 것처럼
        바로 만들어서 전달해도 되고, 렌더링 부분 외부에 미리 만들어서 전달해도 됨.

    3. DOM 요소에만 이벤트를 설정할 수 있음.
        즉 div, button, form, span 등의 DOM 요소에는 이벤트를 설정할 수 있지만
        개발자가 직접 만든 컴포넌트에는 이벤트를 자체적으로 설정할 수 없음.
        Example)
            <MyComponent onClick={doSomething}/>
            위와 같은 코드는 MyComponent를 클릭할 때 함수를 실행하는 것이 아니라,
            그냥 이름이 onClick인 props를 MyComponent에게 전달해 줄 뿐.

            <div onClick={this.props.onClick}>
                ...
            </div>
            따라서 컴포넌트에 자체적으로 이벤트를 설정할 수는 없음.
            하지만 전달받은 props를 내부의 DOM 이벤트로 설정할 수는 있음.

==========Chapter 4.1.2==========
    이벤트 종류

    - Clipboard             - Touch
    - Composition           - UI
    - Keyboard              - Wheel
    - Focus                 - Media
    - Form                  - Image
    - Mouse                 - Animation
    - Selection             - Transition
*/


const Say = () => {
    const [message, setMessage] = useState('어서오세요');
    const onClickEnter = () => setMessage('안녕하세요!');
    const onClickLeave = () => setMessage('안녕히 가세요!');

    const [color, setColor] = useState('black');

    return (
        <div>
            <button onClick={onClickEnter}>입장</button>
            <button onClick={onClickLeave}>퇴장</button>
            <h1 style={{color}}>{message}</h1>

            <button style={{ color: 'red' }} onClick={() => setColor('red')}>
                빨간색
            </button>
            <button style={{ color: 'green' }} onClick={() => setColor('green')}>
                초록색
            </button>
            <button style={{ color: 'blue' }} onClick={() => setColor('blue')}>
                파란색
            </button>
        </div>
    );
};

export default Say;