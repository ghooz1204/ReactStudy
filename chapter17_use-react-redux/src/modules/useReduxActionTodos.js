import { createAction, handleActions } from 'redux-actions';

/*
----------Chapter 17.6.1.2----------
    todos 모듈에 적용하기

    액션 생성 함수를 교체할 때 counter와는 다르게 각 액션 생성 함수에서 파라미터를 필요로 함.
    createAction으로 액션을 만들면 액션에 필요한 추가 데이터는 payload라는 이름을 사용함.
    Example)
        const MY_ACTION = 'sample/MY_ACTION';
        const myAction = createAction(MY_ACTION);
        const action = myAction('hello world');

        결과: { type: MY_ACTION, payload: 'hello world' }

    액션 생성 함수에서 받아 온 파라미터를 그대로 payload에 넣는 것이 아니라 변형을 주어서 넣고 싶다면,
    createAction의 두 번째 함수에 payload를 지정하는 함수를 따로 선언해서 넣어주면 됨.
    Example)
        const MY_ACTION = 'sample/MY_ACTION';
        const myAction = createAction(MY_ACTION, text => `${text}!`);
        const action = myAction('hello world');

        결과: { type: MY_ACTION, payload: 'hello world!' }
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
// export const remove = createAction(REMOVE, id => id);
export const remove = createAction(REMOVE);
/*
    insert의 경우 todo 객체를 액션 객체 안에 넣어 주어야 하기 때문에 두 번째 파라미터 text를 넣으면 todo가 반환되는 함수를 넣음.
    나머지 함수에는 text => text 혹은 id => id와 같은 형태로 파라미터를 그대로 반환하는 함수를 넣음.
    이 작업이 필수는 아님, 생략해도 똑같이 작동하지만 여기서 이 함수를 넣어 줌으로써 코드를 보았을 때
    이 액션 생성 함수의 파라미터로 어떤 값이 필요한지 쉽게 파악할 수 있음.

    createAction으로 만든 액션 생성 함수는 파라미터로 받아 온 값을 객체 안에 넣을 때 원하는 이름으로 넣는 것이 아니라,
    action.id, actions.todo와 같이 action.payload라는 이름을 공통적으로 넣어 주게 됨.
    그렇기 때문에, 기존의 업데이트 로직에서도 모두 action.payload 값을 조회하여 업데이트 하도록 구현.
*/
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
        [CHANGE_INPUT]: (state, action) => ({ ...state, input: action.payload }),
        // [INSERT]: (state, action) => ({
        [INSERT]: (state, { payload: todo }) => ({
            ...state,
            todos: state.todos.concat(todo)
        }),
        // [TOGGLE]: (state, action) => ({
        [TOGGLE]: (state, { payload: id }) => ({
            ...state,
            todos: state.todos.map(todo =>
                todo.id === id ? { ...todo, done: !todo.done } : todo
            )
        }),
        // [REMOVE]: (state, action) => ({
        [REMOVE]: (state, { payload: id }) => ({
            ...state,
            todos: state.todos.filter(todo => todo.id !== id)
        })
    },
    initialState
);
/*
    하지만 모든 추가 데이터 값을 action.payload로 사용하면 나중에 리듀서 코드를 다시 볼 때 헷갈릴 수 있음.
    객체 비구조화 할당 문법으로 action 값의 payload 이름을 새로 설정해주면
    action.payload가 정확히 어떤 값을 의미하는지 더 쉽게 파악할 수 있음.
*/

export default todos;