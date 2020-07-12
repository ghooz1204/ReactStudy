import React from 'react';

/*
==========Chapter 17.2==========
    UI 준비하기

    리액트 프로젝트에서 리덕스를 사용할 때 가장 많이 사용하는 패턴은 "프레젠테이셔널 컴포넌트"와 "컨테이너 컴포넌트"를 분리하는 것.
    "프레젠테이셔널 컴포넌트"란 주로 상태 관리가 이루어지지 않고, 그저 props를 받아와서 화면에 UI를 보여 주기만 하는 컴포넌트.
    "컨테이너 컴포넌트"란 리덕스와 연동되어 있는 컴포넌트로, 리덕스로부터 상태를 받아 오기도 하고 리덕스 스토어에 액션을 '디스패치'하기도 함.
    이러한 패턴은 리덕스를 사용하는 데 필수 사항은 아니지만, 코드의 재사용성이 높아지고 관심사의 분리가 이루어져 편리함.

==========Chapter 17.2.1==========
    카운터 컴포넌트 만들기
*/

const Counter = ({ number, onIncrease, onDecrease }) => {
    return (
        <div>
            <h1>{number}</h1>
            <div>
                <button onClick={onIncrease}>+1</button>
                <button onClick={onDecrease}>-1</button>
            </div>
        </div>
    );
};

export default Counter;