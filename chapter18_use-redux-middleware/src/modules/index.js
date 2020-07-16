import { combineReducers } from 'redux';
// import counter from './counter';
import counter, { counterSaga } from './counter-saga';
import sample, { sampleSaga } from './sample-saga';
import loading from './loading';
import { all } from 'redux-saga/effects';

const rootReducer = combineReducers({
    counter,
    sample,
    loading
});

/*
    루트 리듀서를 만들었던 것처럼 루트 사가를 만들어 주어야 함
    추후 다른 리듀서에서도 사가를 만들어 등록할 것이기 때문
*/
export function * rootSaga() {
    // all 함수는 여러 사가를 합쳐 주는 역할
    yield all([counterSaga(), sampleSaga()]);
}

export default rootReducer;