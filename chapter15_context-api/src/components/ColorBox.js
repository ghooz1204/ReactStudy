import React, { useContext } from 'react';
// import ColorContext from '../contexts/color';
// import ColorContext, { ColorConsumer } from '../contexts/dynamicColor';
import ColorContext from '../contexts/dynamicColor';

/*
==========Chapter 15.2.2==========
    Consumer 사용하기

    색상을 props로 받아오는 것이 아니라 ColorContext 안에 들어 있는
    "Consumer"라는 컴포넌트를 통해 색상을 조회함.

    ColorContext.Consumer 사이에 중괄호를 열어서 그 안에 함수를 넣어 줌.
    이러한 패턴을 Function as a child, 혹은 Render Props라고 함.
    컴포넌트의 children이 있어야 할 자리에 일반 JSX 혹은 문자열이 아닌 함수를 전달하는 것.

    **
        Render Props 예제
        import React from 'react';

        const RenderPropsSample = ({ children }) => {
            return <div>결과: {children(5)}</div>;
        }

        export default RenderPropsSample;

        만약 위와 같은 컴포넌트가 있다면 추후 사용할 때 다음과 같이 사용할 수 있음.
        <RenderPrposSample>{value => value * 2}</RenderPrposSample>

        RenderPropsSample에게 children props로 파라미터에 2를 곱해서 반환하는 함수를 전달하면
        해당 컴포넌트에서는 이 함수에 5를 인자로 넣어서 "결과: 10"을 렌더링 함.
    **
*/
/*
const ColorBox = () => {
    return (
        <ColorContext.Consumer>
            {value => (
                <div
                    style={{
                        width: '64px',
                        height: '64px',
                        background: value.color
                    }}>
                </div>
            )}
        </ColorContext.Consumer>
    );
};
*/

/*
==========Chapter 15.3.2==========
    새로워진 Context를 프로젝트에 반영하기
*/
/*
const ColorBox = () => {
    return (
        <ColorConsumer>
            {({ state }) => (
                <>
                    <div style={{
                        width: '64px', height: '64px',
                        background: state.color
                    }}>
                    </div>
                    <div style={{
                        width: '32px', height: '32px',
                        background: state.subcolor
                    }}>
                    </div>
                </>
            )}
        </ColorConsumer>
    );
};
*/

/*
==========Chapter 15.4==========
    Consumer 대신 Hook 또는 static contextType 사용하기

==========Chapter 15.4.1==========
    useContext Hook 사용하기

    리액트에 내장되어 있는 Hooks 중에서 "useContext"라는 Hook을 사용하면,
    함수형 컴포넌트에서 Context를 아주 편하게 사용할 수 있음.

    만약 children에 함수를 전달하는 Render Props 패턴이 불편하다면,
    useContext Hook을 사용하여 훨씬 편하게 Context 값을 조회할 수 있음.

    그러나 Hook은 함수형 컴포넌트에서만 사용할 수 있다는 점에 주의! = 클래스형 컴포넌트에서 사용 불가.
*/
const ColorBox = () => {
    const { state } = useContext(ColorContext);
    return (
        <>
            <div style={{
                width: '64px', height: '64px',
                background: state.color
            }}>
            </div>
            <div style={{
                width: '32px', height: '32px',
                background: state.subcolor
            }}>
            </div>
        </>
    )
}

export default ColorBox;