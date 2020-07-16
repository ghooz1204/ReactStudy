import React from 'react';
import CounterContainer from './containers/CounterContainer';
import SampleContainer from './containers/SampleContainer';

/*
==========Chapter 18==========
    리덕스 메들웨어를 통한 비동기 작업 관리

    리액트 웹 애플리케이션에서 API 서버를 연동할 때는 API 요청에 대한 상태도 잘 관리해야 함.
    요청이 시작되었을 때는 로딩 중임을, 요청이 성공하거나 실패했을 때는 로딩이 끝났음을 명시.
    요청에 성공하면 서버에서 받아 온 응답에 대한 상태를 관리하고, 실패하면 서버에서 반환한 에러에 대한 상태를 관리.

    리액트 프로젝트에서 '리덕스'를 사용하고 있으며 이러한 비동기 작업을 관리해야 한다면, "미들웨어(middleware)"를
    사용하여 매우 효율적이고 편하게 상태를 관리할 수 있음.

==========Chapter 18.1==========
    작업 환경 준비

    $ yarn add redux react-redux redux-actions
    명령어를 통해 리덕스 카운터 구현에 필요한 라이브러리 다운로드
*/

const App = () => {
    return (
        <>
            <CounterContainer />
            <hr />
            <SampleContainer />
        </>
    );
}

export default App;

/*
==========Chapter 18.4==========
    정리

    비동기 작업을 처리할 때 redux-thunk는 일반 함수로 이루어져 있기 때문에 간단명료하다는 장점이 있고,
    redux-saga는 진입 장벽이 조금 있을 수 있으나 복잡한 상황에서 더욱 효율적으로 작업을 관리할 수 있다는 장점이 있음.

    미들웨어를 사용하지 않고 그냥 컴포넌트 단에서 API를 요청하는 것도 틀린 방법은 아님.
    비동기 작업을 처리할 때 리덕스 미들웨어를 사용하는 이유는 결국 좀 더 편하게 처리하기 해서 이기 때문에
    불편하다고 느낀다면 사용하지 않는 편이 좋을 수도 있음.
*/