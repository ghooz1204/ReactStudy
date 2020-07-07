import React from 'react';
import styled, { css } from 'styled-components';
/*
==========Chapter 9.4==========
    styled-components

    컴포넌트 스타일링의 또 다른 패러다임은 자바스크립트 파일 안에 스타일을 선언하는 방식.
    이 방식을 'CSS-in-JS'라고 부르는데, 이와 관련된 라이브러리는 매우 많음
        * 참고 사이트 : https://github.com/MicheleBertoli/css-in-js

    이 CSS-in-JS 라이브러리 중 개발자들이 가장선호하는 styled-components를 탐구.
    **
        styled-components를 대채할 수 있는 라이브러리로는 현재 emotion이 대표적.
        작동 방식은 styled-components와 꽤 비슷함.
    **
    
    yarn add styled-components 명령어로 설치.
    
    styled-components를 사용하면 자바스크립트 파일 하나에 스타일까지 작성할 수 있기 때문에
    .css 또는 .scss 확장자를 가진 스타일 파일을 따로 만들지 않아도 된다는 큰 이점이 있음.
*/
/*
    **
        VSCode를 사용할 때 styled-components를 위해 컴포넌트 내부에 작성한 스타일이
        그저 문자열로 간주되어 코드 신택스 하이라이팅(문법에 따라 에디터 폰트 색상을 입히는 작업)이 제대로 이루어지지 않음.
        => VSCode의 마켓 플레이스에서 vscode-styled-components를 검색하여 설치하면 정상적으로 입혀짐.
    **

    styled-components와 일반 classNames를 사용하는 CSS/Sass를 비교했을 때,
    가장 큰 장점은 props 값으로 전달해 주는 값을 쉽게 스타일에 적용할 수 있다는 것.
*/



/*
==========Chapter 9.4.1==========
    Tagged 템플릿 리터럴

    아래 작성한 코드를 확인해 보면, 스타일을 작성할 때 `을 사용하여 만든 문자열에 스타일 정보를 넣어줌.
    여기서 사용한 문법을 'Tagged 템플릿 리터럴'이라고 부름.

    앞서 CSS Module에서 설명한 일반 템플릿 리터럴과 다른 점은
    템플릿 안에 자바스크립트 객체나 함수를 전달할 때 온전히 추출할 수 있다는 것.
    Example)
        console.log(`hello ${{foo: 'bar'}} ${() => 'world'}!`);
        결과: "hello [object Object] () => 'world'!"
    이처럼 템플릿에 객체를 넣거나 함수를 넣으면 형태를 잃어버리게 됨.
    객체는 "[object Object]"로 변환되고 함수는 함수 내용이 그대로 문자열화되어 나타남.

    만약 다음과 같은 함수를 작성하고 나서 해당 함수 뒤에 템플릿 리터럴을 넣어 준다면,
    템플릿 안에 넣은 값을 온전히 추출할 수 있음. 
    
    * 문자열 우선 나열 후 ${} 태그 순서대로 배열에 담김.
*/
function tagged(...args) {
    console.log(args);
}
tagged`hello ${{foo: 'bar'}} ${() => 'world'}!`;
/*
    Tagged 템플릿 리터럴을 사용하면 이렇게 템플릿 사이사이에 들어가는
    자바스크립트 객체나 함수의 원본 값을 그대로 추출할 수 있음.

    styled-components는 이러한 속성을 사용하여 styled-components로
    만든 컴포넌트의 props를 스타일 쪽에서 쉽게 조회할 수 있도록 해줌.
*/

/*
==========Chapter 9.4.2==========
    스타일링된 엘리먼트 만들기

    styled-components를 사용하여 스타일링된 엘리먼트를 만들 때는
    컴포넌트 파일 상단에서 styled를 불러오고, styled.태그명을 사용하여 구현함.
    Example)
        import styled from 'styled-components';

        const MyComponent = styled.div`
            font-size: 2rem;
        `;
    이렇게 styled.div 뒤에 Tagged 템플릿 리터럴 문법을 통해 스타일을 넣어주면
    해당 스타일이 적용된 div로 이루어진 리액트 컴포넌트가 생성됨.
    => 그래서 나중에 <MyComponents>Hello</MyComponents>와 같은 형태로 사용 가능.

    div가 아닌 button이나 input에 스타일링을 하고 싶다면
    styled.button 혹은 styled.input 같은 형태로 뒤에 태그 명을 넣어주면 됨.

    사용해야 할 태그명이 유동적이거나 특정 컴포넌트 자체에 스타일링을 해 주고 싶다면
    Example)
        // 태그의 타입을 styled 함수의 인자로 전달
        const MyInput = styled('input')`
            background: gray;
        `;
        // 아예 컴포넌트 형식의 값을 넣어줌
        const StyledLink = styled(Link)`
            color: blue;
        `

    위의 예시에서 사용된 Link 컴포넌트는 리액트 라우터를 배울 때 사용할 컴포넌트.
    이런 식으로 컴포넌트를 styled의 파라미터에 넣는 경우에는 해당 컴포넌트에
    className props를 최상위 DOM의 className 값으로 설정하는 작업이
    내부적으로 되어 있어야 함.
    Example)
        const Sample = ({ className }) => {
            return <div className={className}>Sample</div>;
        }
        const StyledSample = styled(Sample)`
            font-size: 2rem;
        `;
*/

/*
==========Chapter 9.4.3==========
    스타일에서 props 조회하기

    styled-components를 사용하면 스타일 쪽에서 컴포넌트에게 전달된 props 값을 참조할 수 있음.

    import styled, { css } from 'styled-components'; 에서,
    css는 단순 변수의 형태가 아니라 스타일 구문을 조건부로 설정해야 하는 경우에 불러옴.
*/
const Box = styled.div`
    /* props로 넣어 준 값을 직접 전달해 줄 수 있음. */
    background: ${props => props.color || 'blue'};
    /*
        background 값에 props를 조회해서 props.color의 값을 사용하게 함.
        color 값이 주어지지 않았을 경우 blue를 기본 색상으로 설정.
        이렇게 만들어진 코드(BOX)는 JSX에서 사용될 때 color 값을 props로 넣어주면 사용 가능.
    */
    padding: 1rem;
    display: flex;
`;

/*
==========Chapter 9.4.4==========
    props에 따른 조건부 스타일링

    일반 CSS 클래스를 사용하여 조건부 스타일링을 해야 할 때는 className을 사용하였는데,
    styled-components에서는 간단하게 props로 처리할 수 있음.
*/
const Button = styled.button`
    background: white; color: black;
    border-radius: 4px;
    padding: 0.5rem;
    display: flex;
    align-items: center; justify-content: center;
    box-sizing: border-box;
    font-size: 1rem; font-weight: 600;

    border: none;
    /* & 문자를 사용하여 Sass처럼 자기 자신 선택 가능 */
    &:hover {
        background: rgba(255, 255, 255, 0.9);
    }

    /* 다음 코드는 inverted 값이 true일 때 특정 스타일을 부여해 줌. */
    ${props =>
        props.inverted &&
        css`
            background: none;
            border: 2px solid white;
            color: white;

            &:hover {
                background: white;
                color: black;
            }`
    }
        /*
            이렇게 만든 컴포넌트는 아래의 props를 사용하여
            서로 다른 스타일을 적용할 수 있음.

            스타일 코드 여러 줄을 props에 따라 넣어 주어야 할 때는
            css를 styled-components에서 불러와야 함.
            css를 사용하지 않고 바로 문자열을 넣어도 동작하기는 함.

            하지만 해당 내용이 그저 문자열로만 취급되기 때문에 VS Code 확장 프로그램에서
            신택스 하이라이팅이 제대로 이루어지지 않는 다는 단점이 존재하며,
            치명적으로 Tagged 템플릿 리터럴이 아니기때문에 함수를 받아 사용하지 못해
            해당 부분에서는 props 값을 사용하지 못한다는 단점 또한 존재함.

            => 만약 조건부 스타일링을 할 때 넣는 여러 줄의 코드에서 props를 참조하지 않는다면
            굳이 css를 불러와서 사용하지 않아도 상관없지만, props를 참조한다면 반드시 css로 감싸
            Tagged 템플릿 리터럴을 사용해 주어야 함.
        */
    & + button {
        margin-left: 1rem;
    }
`;
const StyledComponent = () => (
    <Box color="black">
        <Button>안녕하세요</Button>
        <Button inverted={true}>테두리만</Button>
    </Box>
);

export default StyledComponent;