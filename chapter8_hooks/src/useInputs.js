import { useReducer } from 'react';

/*
==========Chapter 8.7==========
    커스텀 Hooks 만들기

    여러 컴포넌트에서 비슷한 기능을 공유할 경우,
    이를 본인만의 Hook으로 작성하여 로직을 재활용할 수 있음.

    예제로 기존에 Info 컴포넌트에서 여러 개의 인풋을 관리하기 위해
    useReducer로 작성했던 로직을 useInputs라는 Hook으로 따로 분리.
*/

function reducer(state, action) {
    return {
        ...state,
        [action.name]: action.value
    };
}

export default function useInputs(initialForm) {
    const [state, dispatch] = useReducer(reducer, initialForm);
    const onChange = e => {
        dispatch(e.target);
    };
    return [state, onChange];
};