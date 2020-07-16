import { handleActions } from 'redux-actions';
import * as api from '../lib/api';
import createRequestThunk from '../lib/createRequestThunk';

/*
    새로운 리듀서를 만들어야 함
    위 API를 사용하여 데이터를 받아와 상태를 관리할 sample이라는 리듀서를 생성.

    현재 코드에는 반복되는 로직이 꽤 있으므로 나중에 따로 분리하여
    재사용하는 형태로 코드를 리팩토링 할 수 있음.
*/

// 액션 타입을 선언함.
// 한 요청당 세 개를 만들어야 함.

const GET_POST = 'sample/GET_POST';
const GET_POST_SUCCESS = 'sample/GET_POST_SUCCESS';
// const GET_POST_FAILURE = 'sample/GET_POST_FAILURE';

const GET_USERS = 'sample/GET_USERS';
const GET_USERS_SUCCESS = 'sample/GET_USERS_SUCCESS';
// const GET_USERS_FAILURE = 'sample/GET_USERS_FAILURE';

// thunk 함수를 생성함.
// thunk 함수 내부에서는 시작할 때, 성공했을 때, 실패했을 때 다른 액션을 디스패치함.
/*
    ** 리팩토링 이전 코드 **
export const getPost = id => async dispatch => {
    dispatch({ type: GET_POST }); // 요청을 시작한 것을 알림
    try {
        const response = await api.getPost(id);
        dispatch({
            type: GET_POST_SUCCESS,
            payload: response.data
        }); // 요청 성공
    } catch(e) {
        dispatch({
            type: GET_POST_FAILURE,
            payload: e,
            error: true
        }); // 에러 발생
        throw e; // 나중에 컴포넌트 단에서 에러를 조회할 수 있게 해 줌
    }
};
export const getUsers = id => async dispatch => {
    dispatch({ type: GET_USERS }); // 요청이 시작한 것을 알림
    try {
        const response = await api.getUsers(id);
        dispatch({
            type: GET_USERS_SUCCESS,
            payload: response.data
        }); // 요청 성공
    } catch(e) {
        dispatch({
            type: GET_USERS_FAILURE,
            payload: e,
            error: true
        }); // 에러 발생
        throw e; // 나중에 컴포넌트 단에서 에러를 조회할 수 있게 해 줌
    }
};
*/
export const getPost = createRequestThunk(GET_POST, api.getPost);
export const getUsers = createRequestThunk(GET_USERS, api.getUsers);

// 초기 상태를 선언함.
// 요청의 로딩 중 상태는 loading이라는 객체에서 관리.

const initialState = {
    /*
    loading: {
        GET_POST: false,
        GET_USERS: false
    },
    */
    post: null,
    users: null
};

const sample = handleActions(
    {
        /*
        [GET_POST]: state => ({
            ...state,
            loading: {
                ...state.loading,
                GET_POST: true // 요청 시작
            }
        }),
        [GET_POST_SUCCESS]: (state, action) => ({
            ...state,
            loading: {
                ...state.loading,
                GET_POST: false // 요청 완료
            },
            post: action.payload
        }),
        [GET_POST_FAILURE]: (state, action) => ({
            ...state,
            loading: {
                ...state.loading,
                GET_POST: false // 요청 완료
            },
        }),
        [GET_USERS]: state => ({
            ...state,
            loading: {
                ...state.loading,
                GET_USERS: true // 요청 시작
            }
        }),
        [GET_USERS_SUCCESS]: (state, action) => ({
            ...state,
            loading: {
                ...state.loading,
                GET_USERS: false // 요청 완료
            },
            users: action.payload
        }),
        [GET_USERS_FAILURE]: (state, action) => ({
            ...state,
            loading: {
                ...state.loading,
                GET_USERS: false // 요청 완료
            }
        })
        */
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

/*
    코드 리팩토링을 통해 코드가 훨씬 깔끔해짐!
    이제 sample 리듀서에서는 로딩 중에 대한 상태를 관리할 필요가 없음. 성공했을 때의 케이스만 잘 관리해 주면 됨.
    추가로 실패했을 때의 케이스를 관리하고 싶다면 _FAILURE가 붙은 액션을 리듀서에서 처리해 주면 됨.
    혹은 컨테이너 컴포넌트에서 try/catch 구문을 사용하여 에러 값을 조회할 수도 있음
*/

export default sample;