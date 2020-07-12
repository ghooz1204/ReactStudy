/*
==========Chapter 17.3.2==========
    todos 모듈 만들기

----------Chapter 17.3.2.1----------
    액션 타입 정의하기
*/
const CHANGE_INPUT = 'todos/CHANGE_INPUT'; // 인풋 값을 변경함
const INSERT = 'todos/INSERT'; // 새로운 todo를 등록함
const TOGGLE = 'todos/TOGGLE'; // todo를 체크/체크 해제 함
const REMOVE = 'todos/REMOVE'; // todo를 제거함

/*
----------Chapter 17.3.2.1----------
    액션 생성 함수 만들기

    액션 생성 함수에서 파라미터가 필요함.
    전달 받은 파라미터는 액션 객체 안에 추가 필드로 들어가게 됨.

    아래 액션 생성 함수 중에 insert 함수는 액션 객체를 만들 때 파라미터 외에 사전에 이미 선언되어 있는 id라는 값에도 의존.
    이 액션 생성 함수는 호출될 때마다 id 값에 1씩 더해줌.(id 값은 todo 객체가 들고 있게 될 고윳값)
*/
export const changeInput = input => ({
    type: CHANGE_INPUT,
    input
});
let id = 3;
export const insert = text => ({
    type: INSERT,
    todo: {
        id: id++,
        text,
        done: false
    }
});
export const toggle = id => ({
    type: TOGGLE,
    id
});
export const remove = id => ({
    type: REMOVE,
    id
});

/*
----------Chapter 17.3.2.1----------
    초기 상태 및 리듀서 함수 만들기
    
    객체에 한 개 이상의 값이 들어가므로 불변성을 유지해 주어야 하기 때문에 업데이트 방식이 까다로움.
    spread 연산자를 활용하여 작성, 배열에 변화를 줄 때는 배열 내장 함수를 사용하여 구현함.
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

function todos(state = initialState, action) {
    switch (action.type) {
        case CHANGE_INPUT:
            return {
                ...state,
                input: action.input
            };
        case INSERT:
            return {
                ...state,
                todos: state.todos.concat(action.todo)
            };
        case TOGGLE:
            return {
                ...state,
                todos: state.todos.map(todo =>
                    todo.id === action.id ? { ...todo, done: !todo.done } : todo
                )
            };
        case REMOVE:
            return {
                ...state,
                todos: state.todos.filter(todo => todo.id !== action.id)
            };
        default:
            return state;
    }
}

export default todos;