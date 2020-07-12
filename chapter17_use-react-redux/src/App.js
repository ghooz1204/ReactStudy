import React from 'react';
// import CounterContainer from './containers/CounterContainer';
import CounterContainer from './containers/UseHooksCounterContainer';
// import TodosContainer from './containers/TodosContainer';
import TodosContainer from './containers/UseHooksTodosContainer';

/*
==========Chapter 17==========
    리덕스를 사용하여 리액트 애플리케이션 상태 관리하기

    소규모 프로젝트에서는 컴포넌트가 가진 state를 사용하는 것만으로도 관리가 되지만,
    프로젝트의 규모가 커짐에 따라 상태 관리가 번거로워질 수 있음.
    
    리액트 애플리케이션에서 리덕스를 사용하면, 상태 업데이트에 관한 로직을 모듈로 따로 분리하여
    컴포넌트 파일과 별개로 관리할 수 있으므로 코드를 유지 보수 하는데 유리함.
    또한, 여러 컴포넌트에서 동일한 상태를 공유해야할 때 매우 유용하고,
    실제 업데이트가 필요한 컴포넌트만 리렌더링되도록 쉽게 최적화할 수 있음.

    리액트 애플리케이션에서 리덕스를 사용할 때는 store 인스턴스를 직접 사용하기 보다는
    주로 react-redux라는 라이브러리에서 제공하는 유틸 함수(connect)와 컴포넌트(Provider)를 사용하여 리덕스 관련 작업을 처리.

==========Chapter 17.1==========
    작업 환경 설정

    $ yarn add redux react-redux
    명령어를 통하여 리덕스와 react-redux 라이브러리를 다운로드.
*/

const App = () => {
    return (
        <div>
            <CounterContainer />
            <hr />
            <TodosContainer />
        </div>
    );
}

export default App;

/*
==========Chapter 17.8==========
    정리

    리액트 프로젝트에서 리덕스를 사용하면 업데이트에 관련된 로직을 리액트 컴포넌트에서
    완벽하게 분리시킬 수 있으므로 유지 보수성이 높은 코드를 작성해 낼 수 있음

    정말 작은 프로젝트에 리덕스를 적용하면 오히려 프로젝트의 복잡도가 높아질 수 있지만,
    규모가 큰 프로젝트에 리덕스를 적용하면 상태를 더 체계적으로 관리할 수 있고, 개발자 경험도 향상시켜 줌.

*/