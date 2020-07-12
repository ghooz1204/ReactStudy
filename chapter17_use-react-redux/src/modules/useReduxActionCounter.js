import { createAction, handleActions } from 'redux-actions';

/*
==========Chapter 17.6==========
    리덕스 더 편하게 사용하기

    액션 생성 함수, 리듀서를 작성할 때 redux-actions라는 라이브러리와
    immer 라이브러리를 활용하면 리덕스를 훨씬 편하게 사용할 수 있음.

==========Chapter 17.6.1==========
    redux-actions

    redux-actions를 사용하면 액션 생성 함수를 더 짧은 코드로 작성할 수 있음.
    리듀서를 작성할 때도 switch/case 문이 아닌 handleActions라는 함수를 사용하여
    각 액션마다 업데이트를 설정하는 형식으로 작성 가능.

    $ yarn add redux-actions
    명령어로 redux-actions 라이브러리 다운로드.

----------Chapter 17.6.1.1----------
    counter 모듈에 적용하기

    액션 생성 함수를 createAction이란 함수를 사용하며 만듬.
    createAction을 사용하면 매번 객체를 직접 만들어 줄 필요 없이 더욱 간단하게 액션 생성 함수를 선언

    리듀서 함수는 handleAction이라는 함수를 사용하여 첫 번째 파라미터에는 각 액션에 대한 업데이트 함수를 넣어 주고,
    두 번째 파라미터에는 초기 상태를 넣어 줌.
*/
const INCREASE = 'counter/INCREASE';
const DECREASE = 'counter/DECREASE';

export const increase = createAction(INCREASE);
export const decrease = createAction(DECREASE);

const initialState = {
    number: 0
};

const counter = handleActions(
    {
        [INCREASE]: (state, action) => ({ number: state.number + 1 }),
        [DECREASE]: (state, action) => ({ number: state.number - 1 })
    },
    initialState
);

export default counter;