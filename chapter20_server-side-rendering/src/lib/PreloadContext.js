import { createContext, useContext } from 'react';

/*
==========Chapter 20.4.3==========
    PreloadContext 만들기

    서버 사이드 렌더링을 할 때는 useEffect나 componentDidMount에서 설정한 작업이 호출되지 않음.
    렌더링하기 전에 API를 요청한 뒤 스토어에 데이터를 담아야 하는데, 서버 환경에서 이러한 작업을 하려면
    클래스형 컴포넌트가 지니고 있는 constructor 메소드를 사용하거나 render 함수 자체에서 처리해야 함.
    그리고 요청이 끝날 때까지 대기했다가 다시 렌더링해 주어야 함.

    이 작업을 PreloadContext로 만들고, 이를 사용하면 Preloader 컴포넌트를 만들어 처리.
*/

// 클라이언트 환경: null
// 서버 환경: { done: false, promises: [] }
const PreloadContext = createContext(null);
export default PreloadContext;

// resolve는 함수 타입
export const Preloader = ({ resolve }) => {
    const preloadContext = useContext(PreloadContext);
    if (!preloadContext) return null; // context 값이 유효하지 않다면 아무것도 하지 않음.
    if (preloadContext.done) return null; // 이미 작업이 끝났다면 아무것도 하지 않음.

    // promises 배열에 프로미스 등록
    // 설령 resolve 함수가 프로미스를 반환하지 않더라도, 프로미스 취급을 하기위해
    // Promise.resolve 함수 사용
    preloadContext.promises.push(Promise.resolve(resolve()));
    return null;
};
/*
    PreloadContext는 서버 사이드 렌더링을 하는 과정에서 처리해야 할 작업들을 실행하고,
    만약 기다려야 하는 "프로미스(promise)"가 있다면 프로미스를 수집함.
    모든 프로미스를 수집한 뒤, 수집된 프로미스들이 끝날 때까지 기다렸다가
    그다음에 다시 렌더링하면 데이터가 채워진 상태로 컴포넌트들이 나타나게 됨.

    Preloader 컴포넌트는 resolve라는 함수를 props로 받아 오며, 컴포넌트가 렌더링될 때
    서버 환경에서만 resolve 함수를 호출해 줌.
*/

/*
==========Chapter 20.4.9==========
    usePreloader Hook 만들어서 사용하기

    usePreloader는 Preloader 컴포넌트와 매우 유사함, 컴포넌트가 아닌 함수일 뿐임.
    함수형 컴포넌트에서는 usePreloader Hook을 사용하고, 클래스형 컴포넌트를 사용하는 일이 있을 때는 Preloader 컴포넌트 사용.
    
    $ yarn build
    $ yarn build:server
    $ yarn start:server
    
*/
// Hook 형태로 사용할 수 있는 함수
export const usePreloader = resolve => {
    const preloadContext = useContext(PreloadContext);
    if (!preloadContext) return null;
    if (preloadContext.done) return null;
    preloadContext.promises.push(Promise.resolve(resolve()))
}