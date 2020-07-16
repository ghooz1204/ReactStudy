import { startLoading, finishLoading } from '../modules/loading';
/*
----------Chapter 18.3.1.5----------
    리팩토링

    API를 요청해야 할 때마다 17줄 정도 되는 thunk 함수를 작성하는 것과
    로딩 상태를 리듀서에서 관리하는 작업은 귀찮을 뿐 아니라 코드도 길어지게 만듬.
    그러므로 반복되는 로직을 따로 분리하여 코드의 양을 줄여 봄.

    아래에 작성한 유틸 함수는 API 요청을 해 주는 thunk 함수를 한 줄로 생성할 수 있게 해줌.

    액션 타입과 API를 요청하는 함수를 파라미터로 넣어 주면 나머지 작업을 대신 처리해 줌.
*/

export default function createRequestThunk(type, request) {
    // 성공 및 실패 액션 타입을 정의함.
    const SUCCESS = `${type}_SUCCESS`;
    const FAILURE = `${type}_FAILURE`;
    return params => async dispatch => {
        dispatch({ type }); // 시작됨
        dispatch(startLoading(type));
        try {
            const response = await request(params);
            dispatch({
                type: SUCCESS,
                payload: response.data
            }); // 성공
            dispatch(finishLoading(type));
        } catch (e) {
            dispatch({
                type: FAILURE,
                payload: e,
                error: true
            }); // 에러 발생
            dispatch(finishLoading(type));
            throw e;
        }
    };
}

// 사용법: createRequestThunk('GET_USERS', api.getUsers);