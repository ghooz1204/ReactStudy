import React from 'react';
import styled, { css } from 'styled-components';

/*
==========Chapter 9.4.5==========
    반응형 디자인

    브라우저의 가로 크기에 따라 다른 스타일을 적용하기 위해서는
    일반 CSS를 사용할 때와 똑같이 media 쿼리(query)를 사용하면 됨.
*/

const noMediaBox = styled.div`
    /* props로 넣어 준 값을 직접 전달해 줄 수 있음. */
    background: ${props => props.color || 'blue'};
    padding: 1rem;
    display: flex;

    width: 1024px;
    margin: 0 auto;
    /*
        기본적으로는 가로 크기 1024px에 가운데 정렬을 하고
        가로 크기가 작아짐에 따라 크기를 줄이고
        768px 미만이 되면 꽉 채움.
    */
    @media (max-width: 1024px) {
        width: 768px;
    }
    @media (max-width: 768px) {
        width: 100%;
    }
`;
/*
    일반 CSS에서 할 때랑 큰 차이는 없지만, 이 작업을 여러 컴포넌트에서 반복해야 한다면
    귀찮을 수가 있으므로 이 작업을 함수화하여 간편하게 사용할 수 있어야 함.
    => styled-components에서 제공하는 유틸 함수 사용.
*/
const sizes = {
    desktop: 1024,
    tablet: 768
};
// 위에 있는 sizes 객체에 따라 자동으로 media 쿼리를 만들어 줌.
// 참고 사이트: https://www.styled-components.com/docs/advanced#media-templates
const media = Object.keys(sizes).reduce((acc, label) => {
    acc[label] = (...args) => css`
        @media (max-width: ${sizes[label] / 16}em) {
            ${css(...args)}
        }
    `;
    console.log(acc, label)
    return acc;
}, {});
console.log(media);
const Box = styled.div`
    background: ${props => props.color || 'blue'};
    padding: 1rem;
    display: flex;

    width: 1024px;
    margin: 0 auto;
    ${media.desktop`width: 768px;`}
    ${media.tablet`width: 100%;`}
`
// media를 한 번 선언하고 나면 이를 사용할 때 스타일 쪽 코드가 훨씬 간단해 짐.
// 위 코드는 media를 MediaStyledComponents에서 만들었지만,
// 실제로 사용한다면 아예 다른 파일로 모듈화한 뒤 여기저기서 불러와 사용하는 방식이 훨씬 편함.

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
    & + button {
        margin-left: 1rem;
    }
`;
const MediaStyledComponent = () => (
    <Box color="black">
        <Button>안녕하세요</Button>
        <Button inverted={true}>테두리만</Button>
    </Box>
);

export default MediaStyledComponent;