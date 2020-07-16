import { createAction, handleActions } from 'redux-actions';
import { 
    // call,
    // put,
    takeLatest
} from 'redux-saga/effects';
import * as api from '../lib/api';
import createRequestSaga from '../lib/createRequestSaga';

/*
----------Chapter 18.3.2.3----------
    API 요청 상태 관리하기
*/

// 액션 타입을 선언함.
const GET_POST = 'sample/GET_POST';
const GET_POST_SUCCESS = 'sample/GET_POST_SUCCESS';
// const GET_POST_FAILURE = 'sample/GET_POST_FAILURE';

const GET_USERS = 'sample/GET_USERS';
const GET_USERS_SUCCESS = 'sample/GET_USERS_SUCCESS';
// const GET_USERS_FAILURE = 'sample/GET_USERS_FAILURE';

export const getPost = createAction(GET_POST, id => id);
export const getUsers = createAction(GET_USERS);

/*
function* getPostSaga(action) {
    yield put(startLoading(GET_POST)); // 로딩 시작
    // 파라미터로 action을 받아 오면 액션의 정보를 조회할 수 있습니다.
    try {
        // call을 사용하면 Promise를 반환하는 함수를 호출하고, 기다릴 수 있습니다.
        // 첫 번째 파라미터는 함수, 나머지 파라미터는 해당 함수에 넣을 인수
        const post = yield call(api.getPost, action.payload); // api.getPost(action.payload)를 의미
        yield put({
            type: GET_POST_SUCCESS,
            payload: post.data
        });
    } catch (e) {
        // try/catch 문을 사용하여 에러도 잡을 수 있습니다.
        yield put({
            type: GET_POST_FAILURE,
            payload: e,
            error: true
        });
    }
    yield put(finishLoading(GET_POST)); // 로딩 완료
}
function* getUsersSaga() {
    yield put(startLoading(GET_USERS));
    try {
        const users = yield call(api.getUsers);
        yield put({
            type: GET_USERS_SUCCESS,
            payload: users.data
        });
    } catch (e) {
        yield put({
            type: GET_USERS_FAILURE,
            payload: e,
            error: true
        });
    }
    yield put(finishLoading(GET_USERS));
}
*/

const getPostSaga = createRequestSaga(GET_POST, api.getPost);
const getUsersSaga = createRequestSaga(GET_USERS, api.getUsers);

/*
    여기서 GET_POST 액션의 경우에는 API 요청을 할 때 어떤 id로 조회할지 정해 주어야 함.
    redux-saga를 사용할 때는 id처럼 요청에 필요한 값을 액션의 payload로 넣어 주어야 함.
    예를 들어 지금 상황이라면 다음과 같은 액션이 디스패치 됨.
    {
        type: 'sample/GET_POST',
        payload: 1
    }
    그러면 이 액션을 처리하기 위한 사가를 작성할 때 payload의 값을 API를 호출하는 함수의 인수로 넣어 주어야 함
    API를 호출해야 하는 상황에서 사가 내부에서 직접 호출하지 않고 call 함수를 사용함.
    call 함수의 경우 첫 번째 인수는 호출하고 싶은 함수이고, 그 뒤에 오는 인수들은 해당 함수에 넣어주고 싶은 인수임.
    지금 getPostSaga의 경우에는 id를 의미하는 action.payload가 인수.
*/

export function* sampleSaga() {
    yield takeLatest(GET_POST, getPostSaga);
    yield takeLatest(GET_USERS, getUsersSaga);
}

const initialState = {
    post: null,
    users: null
};

const sample = handleActions(
    {
        
       [GET_POST_SUCCESS]: (state, action) => ({
        ...state,
        post: action.payload
        }),
        [GET_USERS_SUCCESS]: (state, action) => ({
            ...state,
            users: action.payload
        })
    },
    initialState
);

export default sample;