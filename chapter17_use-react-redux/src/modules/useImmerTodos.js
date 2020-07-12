import { createAction, handleActions } from 'redux-actions';
import produce from 'immer';

/*
=========Chapter 17.6.2=========
    immer

    리듀서에서 상태를 업데이트할 때는 불변성을 지켜야 하기 때문에 spread 연산자(...)와 배열의 내장 함수를 활용함.
    그러나 모듈의 상태가 복잡해질수록 불변성을 지키기가 까다로워짐.

    객체의 깊이가 깊지 않을 수록 추후 불변성을 지켜 가면서 값을 업데이트할 때 수월함.
    하지만 상황에 따라 상태 값을을 하나의 객체 안에 묶어서 넣는 것이 코드의 가독성을 높이는 데 유리하며, 나중에 컴포넌트에 리덕스를 연동할 때도 편함.

    객체의 구조가 복잡해지거나 객체로 이루어진 배열을 다룰 경우, immer을 사용하며 훨씬 편리하게 상태를 관리할 수 있음.
    (counter 모듍처럼 간단한 리듀서에 immer을 적용하면 오히려 코드가 더 길어짐)

    $ yarn add immer
    명령어로 immer 라이브러리 다운로드.
*/

const CHANGE_INPUT = 'todos/CHANGE_INPUT'; // 인풋 값을 변경함
const INSERT = 'todos/INSERT'; // 새로운 todo를 등록함
const TOGGLE = 'todos/TOGGLE'; // todo를 체크/체크 해제 함
const REMOVE = 'todos/REMOVE'; // todo를 제거함

export const changeInput = createAction(CHANGE_INPUT, input => input);

let id = 3;
export const insert = createAction(INSERT, text => ({
    id: id++,
    text,
    done: false
}));
export const toggle = createAction(TOGGLE, id => id);
export const remove = createAction(REMOVE, id => id);
const initialState = {
    input: '',
    todos: [
        {
            id: 1,
            text: '리덕스 기초 배우기',
            done: true
        },
        {
            id: 2,
            text: '리액트와 리덕스 사용하기',
            done: false
        }
    ]
};
const todos = handleActions(
    {
        [CHANGE_INPUT]: (state, { payload: input }) =>
            produce(state, draft => {
                draft.input = input;
            }),
        [INSERT]: (state, { payload: todo }) =>
            produce(state, draft => {
                draft.todos.push(todo);
            }),
        [TOGGLE]: (state, { payload: id }) =>
            produce(state, draft => {
                const todo = draft.todos.find(todo => todo.id === id);
                todo.done = !todo.done;
            }),
        [REMOVE]: (state, { payload: id }) =>
            produce(state, draft => {
                const index = draft.todos.findIndex(todo => todo.id === id);
                draft.todos.splice(index, 1);
            })
    },
    initialState
);
/*
    immer를 사용한다고 해서 모든 업데이트 함수에 immer를 적용할 필요는 없음.
    일반 자바스크립트로 처리하는 것이 더 편할 때는 immer를 적용하지 않아도 됨.
    위 코드에도 TOGGLE을 제외한 업데이트 함수들은 immer을 쓰지 않는 코드가 오히려 더 짧기 때문에
    이전 형태를 유지하는 것도 무방함.
*/

export default todos;