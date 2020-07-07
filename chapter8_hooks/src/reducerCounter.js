import React, { useReducer } from 'react';

/*
==========Chapter 8.3==========
    useReducer

    useReducer는 useState보다 더 다양한 컴포넌트 상황에 따라
    다양한 상태를 다른 값으로 업데이트해 주고 싶을 때 사용하는 Hook.

    리듀서는 현재 상태, 그리고 업데이트를 위해 필요한 정보를 담은
    액션(action) 값을 전달 받아 새로운 상태를 반환하는 함수.
    리듀서 함수에 새로운 상태를 만들 때는 반드시 불변성을 지켜주어야 함.

    function reducer(state, action) {
        return {...} // 불변성을 지키면서 업데이트한 새로운 상태를 반환함.
    }
    
    액션 값은 주로 다음과 같은 형태로 이루어짐.
    {
        type: 'INCREMENT',
        // 다른 값들이 필요하다면 추가로 들어감
    }
    
    리덕스에서 사용하는 액션 객체는 어떤 액션인지 알려 주는 type 필드가 꼭 있어야 하지만,
    useReducer에서 사용하는 액션 객체는 반드시 type을 지니고 있을 필요가 없음.
    심지어 객체가 아니라 문자열이나 숫자여도 무관.
*/

function reducer(state, action) {
    // 현재 상태, 업데이트를 위해 필요한 정보를 담은 액션 값을 전달받아
    // 새로운 상태를 반환하는 리듀서 함수
    // action.type에 따라 다른 작업 수행
    switch (action.type) {
        case 'INCREMENT':
            console.log(+1)
            return { value: state.value + 1 };
        case 'DECREMENT':
            console.log(-1)
            return { value: state.value - 1 };
        default:
            // 아무것도 해당되지 않을 때 기존 상태 반환
            return state;
    }
}

const Counter = () => {
    const [state, dispatch] = useReducer(reducer, { value: 0 });
    // 첫 번째 파라미터에는 리듀서 함수를 넣음
    // 두 번째 파라미터에는 해당 리듀서의 기본 값을 넣음

    /*
        Hook을 사용해서 state 값과 dispatch 함수를 받아옴.
        state는 현재 가리키고 있는 상태.
        dispatch는 액션을 발생시키는 함수.
    */
    // dispatch(action); 과 같은 구조로, 함수 안에 파라미터로 액션 값을 넣어주면 리듀서 함수가 호출되는 구조
    
    // useReducer를 사용했을 때의 가장 큰 장점은 컴포넌트 업데이트 로직을 컴포넌트 바깥으로 빼낼 수 있는 것.
    return (
        <div>
            <p>
                현재 카운터 값은 <b>{state.value}</b>입니다.
            </p>
            <button onClick={() => dispatch({ type: 'INCREMENT' })}>+1</button>
            <button onClick={() => dispatch({ type: 'DECREMENT' })}>-1</button>
        </div>
    );
};

export default Counter;