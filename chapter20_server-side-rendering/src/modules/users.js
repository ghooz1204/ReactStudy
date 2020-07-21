import axios from 'axios';
import { call, put, takeEvery } from 'redux-saga/effects';

const API_URL = 'https://jsonplaceholder.typicode.com/users';
/*
==========Chapter 20.4==========
    데이터 로딩

    데이터 로딩은 서버 사이드 렌더링을 구현할 때 해결하기가 매우 까다로운 문제 중 하나.
    데이터 로딩을 한다는 것은 API 요청을 의미함.
    Example) 페이지에서 필요로 하는 데이터가 있다면 API를 요청해서 응답을 받아 와야 함.

    일반적인 브라우저 환경에서는 API를 요청하고 응답을 받아 와서 리액트 state 혹은 리덕스 스토어에 넣으면 자동으로 리렌더링 됨.
    하지만 서버의 경우 문자열 형태로 렌더링하는 겅시므로 state나 리덕스 스토어의 상태가 바뀐다고 해서 자동으로 리렌더링 되지 않음.
    => 그 대신 renderToString 함수를 한 번 더 호출해 주어야 함.
    게다가 서버에서는 componentDidMoune 같은 라이프 사이클 API도 사용 불가.

    서버 사이드 렌더링 시 데이터 로딩을 해결하는 방법은 매우 다양 함.

==========Chapter 20.4.1==========
    redux-thunk 코드 준비하기

    $ yarn add react-redux redux-thunk axios
    명령어를 통해 필요한 라이브러리를 다운로드 함. 그리고 Ducks 패턴을 사용하여 리덕스 모듈을 작성함.

    getUsers라는 thunk 함수를 만들고, 이와 관련된 액션을 사용하여 상태 관리.
    이 모듈에서 관리하는 API는 한 개 이상이므로 loadingUsers, loadingUser와 같이
    각 값에 하나하나 이름을 지어 주는 대신에 loading이라는 객체를 넣음.
*/
const GET_USERS_PENDING = 'users/GET_USERS_PENDING';
const GET_USERS_SUCCESS = 'users/GET_USERS_SUCCESS';
const GET_USERS_FAILURE = 'users/GET_USERS_FAILURE';

/*
==========Chapter 20.4.6==========
    redux-saga 코드 준비하기

    $ yarn add redux-saga
*/
const GET_USER = 'users/GET_USER';
const GET_USER_SUCCESS = 'users/GET_USER_SUCCESS';
const GET_USER_FAILURE = 'users/GET_USER_FAILURE';

/* THUNK */
const getUsersPending = () => ({ type: GET_USERS_PENDING });
const getUsersSuccess = payload => ({ type: GET_USERS_SUCCESS, payload });
const getUsersFailure = payload => ({
    type: GET_USERS_FAILURE,
    error: true,
    payload
});
/* SAGA */
export const getUser = id => ({ type: GET_USER, payload: id });
const getUserSuccess = data => ({ type: GET_USER_SUCCESS, payload: data });
const getUserFailure = error => ({
    type: GET_USER_FAILURE,
    payload: error,
    error: true
});
/* THUNK */
export const getUsers = () => async dispatch => {
    try {
        dispatch(getUsersPending());
        const response = await axios.get(API_URL);
        dispatch(getUsersSuccess(response));
    } catch (e) {
        dispatch(getUsersFailure(e));
        throw e;
    }
};
/* SAGA */
const getUserById = id => axios.get(`${API_URL}/${id}`);
function* getUserSaga(action) {
    try {
        const respense = yield call(getUserById, action.payload);
        yield put(getUserSuccess(respense.data));
    } catch (e) {
        yield put(getUserFailure(e));
    }
}
export function* usersSaga() {
    yield takeEvery(GET_USER, getUserSaga);
}


const initialState = {
    users: null,
    user: null,
    loading: {
        users: false,
        user: false
    },
    error: {
        users: null,
        user: null
    }
};

function users(state = initialState, action) {
    switch (action.type) {
        case GET_USERS_PENDING:
            return {
                ...state,
                loading: { ...state.loading, users: true },
                error: { ...state.error, users: null }
            };
        case GET_USERS_SUCCESS:
            return {
                ...state,
                loading: { ...state.loading, users: false },
                users: action.payload.data
            };
        case GET_USERS_FAILURE:
            return {
                ...state,
                loading: { ...state.loading, users: false },
                error: { ...state.error, users: action.payload }
            };
        case GET_USER:
            return {
                ...state,
                loading: { ...state.loading, user: true },
                error: { ...state.error, user: null }
            };
        case GET_USER_SUCCESS:
            return {
                ...state,
                loading: { ...state.loading, user: false },
                user: action.payload
            };
        case GET_USER_FAILURE:
            return {
                ...state,
                loading: { ...state.loading, user: false },
                error: { ...state.error, user: action.payload }
            };
        default:
            return state;
    }
};

export default users;