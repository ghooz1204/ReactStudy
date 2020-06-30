import React, { useState } from 'react';
/*
==========Chapter 3.4.2==========
    함수형 컴포넌트의 useState 사용하기

    리액트 16.8 이전 버전에서는 함수형 컴포넌트에서 state를 사용할 수 없었음.
    하지만 16.8 이후 부터는 useState라는 함수를 사용하여 함수영 컴포넌트에서도
    state를 사용할 수 있게 되었지만 사용법은 조금 다름.

    이 과정에서 Hooks라는 것을 사용하게 됨.

    **
        Chapter 3.4.2.1
        배열 비구조화 할당

        객체 비구조화 할당과 비슷하여, 배열 안에 들어있는 값을 쉽게 추출할 수 있도록 해주는 문법.
        const array = [1, 2];
        const one = array[0];
        const two = array[1];
        과 같은 코드를

        const array = [1, 2];
        const [one, two] = array;
        와 같이 표현할 수 있음.
    **
*/


/*
----------Chapter 3.4.2.2----------
    useState 사용하기

    useState 함수의 인자에는 상태의 초깃값을 넣어 줍니다.
    클래스형 컴포넌트에서 state 초깃값은 객체 형태를 넣어주어야 하지만
    useState에서는 객체가 아니어도 상관없음. => 숫자, 문자, 객체, 배열 모두 자유로움.

    함수를 호출하면 배열이 반환됨.
        배열의 첫 번째 원소: 현재 상태
        배열의 두 번째 원소: 상태를 바꾸어 주는 함수(Setter 함수)
    그리고 배열 비구조화 할당을 통해 이름을 자유롭게 정해줄 수 있음.
*/
const Say = () => {
    const [message, setMessage] = useState('어서오세요');
    const onClickEnter = () => setMessage('안녕하세요!');
    const onClickLeave = () => setMessage('안녕히 가세요!');

    /*
    ----------Chapter 3.4.2.3----------
        한 컴포넌트에서 useState 여러 번 사용하기
    */
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