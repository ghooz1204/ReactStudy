import React, { Component, useRef } from 'react';

/*
==========Chapter 8.6.1==========
    로컬 변수 사용하기

    추가로 컴포넌트 로컬 변수를 사용해야 할 때도 useRef를 활용할 수 있음.
    로컬 변수란, 렌더링과 상관없이 바뀔 수 있는 값.
*/

class MyComponent extends Component {
    // 클래스형 컴포넌트의 로컬 변수 사용법
    id = 1;
    setId = (n) => {
        this.id = n;
    }
    printId = () => {
        console.log(this.id);
    }
    render() {
        return (
            <div>
                MyComponent
            </div>
        );
    }
};

const RefSample = () => {
    // 함수형 컴포넌트의 로컬 변수 사용법
    const id = useRef(1);
    const setId = (n) => {
        id.current = n;
    }
    const printId = () => {
        console.log(id.current);
    }
    return (
        <div>
            refSample
        </div>
    );
};

/*
    이렇게 ref 안의 값이 바뀌어도 컴포넌트가 렌더링되지 않는 다는 점에는 주의해야 함.
    렌더링과 관련되지 않은 값을 관리할 때만 이러한 방식으로 코드 작성.
*/