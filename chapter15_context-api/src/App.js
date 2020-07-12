import React from 'react';
import ColorBox from './components/ColorBox';
// import ColorContext from './contexts/color';
import { ColorProvider } from './contexts/dynamicColor';
import SelectColors from './components/SelectColors';
import SelectColorsClass from './components/SelectColorsClass';

/*
==========Chapter 15==========
    Context API

    "Context API"는 리액트 프로젝트에서 전역적으로 사용할 데이터가 있을 때 유용한 기능.
    (Ex) 사용자 로그인 정보, 애플리케이션 환경 설정, 테마 등)
    이 API는 리액트 v16.3부터 사용하기 쉽게 많이 개선, 리액트 관련 라이브러리에서도 많이 사용됨.
    (Ex) 리덕스, 리액트 라우터, styled-components 등)

==========Chapter 15.1==========
    Context API를 사용한 전역 상태 관리 흐름 이해하기

    리액트 애플리케이션은 컴포넌트 간에 데이터를 props로 전달하기 때문에
    컴포넌트 여기저기서 필요한 데이터가 있을 때는 주로 최상위 컴포넌트인 App의 state에 넣어서 관리.
    하지만 이렇게되면 App 컴포넌트가 가지고 있는 업데이트 함수를 전달하기 위해
    하위 컴포넌트들을 여러 번 거쳐야하는 방식을 사용할 수 밖에 없음.
    => 이런 방식을 사용하면 유지 보수성이 낮아질 가능성이 있음.

    이를 Context API를 사용하면 Context를 만들어 단 한 번에 원하는 값을 받아 와 사용할 수 있음.
*/

/*
==========Chapter 15.2.3==========
    Provider

    "Provider"를 사용하면 Context의 value를 변경할 수 있음.

    기존에 createContext 함수를 사용할 때는 파라미터로 Context의 기본 값을 넣어 줌.
    이 기본 값은 Provider를 사용하지 않았을 때만 사용됨.
    만약 Provider를 사용했는데 value를 명시하지 않았다면, 이 기본 값을 사용하지 않기 때문에 오류 발생.
*/
/*
const App = () => {
    return (
        <ColorContext.Provider
            // 아래에 value를 명시하지 않으면 오류가 발생함.
            value={{ color: 'red' }}
            >
            <div>
                <ColorBox />
            </div>
        </ColorContext.Provider>
    );
}
*/

/*
==========Chapter 15.3.2==========
    새로워진 Context를 프로젝트에 반영하기
*/
const App = () => {
    return (
        <ColorProvider>
            <div>
                클래스:
                <SelectColorsClass />

                함수:
                <SelectColors />
                <ColorBox />
            </div>
        </ColorProvider>
    )
}

export default App;

/*
==========Chapter 15.5==========
    정리

    기존에는 컴포넌트 간에 상태를 교류해야할 때 무조건 부모 -> 자식 흐름으로 props를 통해 전달했는데,
    Context API를 사용하면 이 불편한 흐름의 상태 교류를 사용하지 않아도 됨.

    프로젝트의 컴포넌트 구조가 꽤 간단하고 다루는 상태의 종류가 그다지 많지 않다면, 굳이 Context를 사용하지 않아도 되지만,
    전역적으로 여기저기 사용되는 상태가 있고, 컴포넌트의 개수가 많은 상황이라면 Context API를 사용하는 것을 권함.

    여기서 또 단순한 전역 상태 관리라면 Context API로 충분하지만 리덕스를 대체할 순 없음.
*/