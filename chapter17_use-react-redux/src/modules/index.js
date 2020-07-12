import { combineReducers } from 'redux';
// import counter from './counter';
import counter from './useReduxActionCounter';
// import todos from './todos';
// import todos from './useReduxActionTodos';
import todos from './useImmerTodos';

/*
==========Chapter 17.3.3==========
    루트 리듀서 만들기

    나중에 createStore 함수를 사용하여 스토어를 만들 때는 리듀서를 하나만 사용해야 하는데, 이번 프로젝트에서는 리듀서를 여러 개 만들었기 때문에
    리덕스에서 제공하는 combineReducers라는 유틸 함수로 리듀서를 하나로 합쳐주는 작업을 처리해야 함.

    파일 이름을 index.js로 설정하면 나중에 불러올 때 디렉터리 이름까지만 입력하여 불러올 수 있음
    Example)
        import rootReducer from './modules'
*/

const rootReducer = combineReducers({
    counter,
    todos
});

export default rootReducer;