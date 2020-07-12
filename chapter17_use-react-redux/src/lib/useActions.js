import { bindActionCreators } from 'redux';
import { useDispatch } from 'react-redux';
import { useMemo } from 'react';
/*
==========Chapter 17.7.5==========
    useActions 유틸 Hook 만들어서 사용하기

    useActions는 원래 react-redux에 내장된 상태로 릴리즈될 계획이었으나 리덕스 개발 팀에서 꼭 필요하지 않다고 판단되어 제외된 Hook.
    그 대신 공식 문서에서 그대로 복사하여 사용할 수 있도록 제공하고 있음(https://react-redux.js.org/next/api/hooks#recipe-useactions)

    이 Hook을 사용하면 여러 개의 액션을 사용해야 하는 경우 코드를 훨씬 깔끔하게 정리하여 작성할 수 있음.
*/

export default function useActions(actions, deps) {
    const dispatch = useDispatch();
    return useMemo(
        () => {
            if (Array.isArray(actions)) {
                return actions.map(a => bindActionCreators(a, dispatch));
            }
            return bindActionCreators(actions, dispatch);
        },
        deps ? [dispatch, ...deps] : deps
    );
}

/*
    위에 작성한 useActions Hook은 액션 생성 함수를 액션을 디스패치 하는 함수로 변환해 줌.
    => 액션 생성 함수를 사용하여 액션 객체를 만들고, 이를 스토어에 디스패치하는 작업을 해 주는 함수를 자동으로 만들어 주는 것.

    useActions는 두 가지 파라미터가 필요함.
    첫 번째 파라미터는 액션 생성 함수로 이루어진 배열.
    두 번째 파라미터는 deps 배열. 이 배열 안에 들어 있는 원소가 바뀌면 액션을 디스패치하는 함수를 새로 만들게 됨.
*/