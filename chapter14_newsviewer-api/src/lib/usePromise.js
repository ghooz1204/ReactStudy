import { useState, useEffect } from 'react';
/*
==========Chapter 14.8==========
    usePromise 커스텀 Hook 만들기

    컴포넌트에서 API 호출처럼 Promise를 사용해야 하는 경우
    더욱 간결하게 코드를 작성할 수 있도록 해 주는 커스텀 Hook을 만들어서 적용.

    프로젝트의 다양한 곳에서 사용될 수 있는 유틸 함수들은 보통
    src 디렉터리에 lib 디렉터리를 만든 후 그 안에 작성.

    아래에 작성한 usePromise Hook은 Promise의 대기 중, 완료 결과, 실패 결과에 대한 상태를 관리.
    usePromise의 의존 배열 deps를 파라미터로 받아 옴.
    deps 배열은 usePromise 내부에서 사용한 useEffect의 의존 배열로 설정.
    
    * 이 배열을 설정하는 부분에서 ESLint 경고가 나타남
    이 경고를 무시하기 위해서는 특정 줄에서만 ESLint 규칙을 무시하도록 주석을 작성해 주어야 함.
    
*/

export default function usePromise(promiseCreator, deps) {
    // 대기 중/완료/실패에 대한 상태 관리
    const [loading, setLoading] = useState(false);
    const [resolved, setResolved] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const process = async () => {
            setLoading(true);
            try {
                const resolved = await promiseCreator();
                setResolved(resolved);
            } catch (e) {
                setError(e);
            }
            setLoading(false);
        }
        process();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, deps);

    return [loading, resolved, error];
}