import React from 'react';
import styled, { css } from 'styled-components';
import { NavLink } from 'react-router-dom';

/*
==========Chapter 14.6==========
    카테고리 기능 구현하기

    뉴스의 카테고리는 총 여섯 개이며
        - business(비즈니스)         - science(과학)
        - entertainment(연예)       - sports(스포츠)
        - health(건강)              - technology(기술)

    화면에서 카테고리를 보여 줄 때는 영어로 된 값을 그대로 보여주지 않고,
    한글로 보여 준 뒤 클릭했을 때는 영어로 된 카테고리 값을 사용하도록 구현.

==========Chapter 14.6.1==========
    카테고리 선택 UI 만들기

    categories라는 배열 안에 name과 text 값이 들어가 있는 객체들을 넣어 주어서
    한글로 된 카테고리와 실제 카테고리 값을 연결 시킴.
    여기서 name은 실제 카테고리 값을 가리키고, text는 렌더링할 때 사용할 한글 카테고리를 가리킴.
*/

const categories = [
    {
        name: 'all',
        text: '전체보기'
    },
    {
        name: 'business',
        text: '비즈니스'
    },
    {
        name: 'entertainment',
        text: '엔터테인먼트'
    },
    {
        name: 'health',
        text: '건강'
    },
    {
        name: 'science',
        text: '과학'
    },
    {
        name: 'sports',
        text: '스포츠'
    },
    {
        name: 'technology',
        text: '기술'
    }
];

const CategoriesBlock = styled.div`
    display: flex;
    padding: 1rem;
    width: 768px;
    margin: 0 auto;
    @media screen and (max-width: 768px) {
        width: 100%;
        overflow-x: auto;
    }
`;

// const Category = styled.div`
const Category = styled(NavLink)`
    font-size: 1.125rem;
    cursor: pointer;
    white-space: pre;
    text-decoration: none;
    color: inherit;
    padding-bottom: 0.25rem;

    &:hover {
        color: #495057;
    }

    &.active {
        font-weight: 600;
        border-bottom: 2px solid #22b8cf;
        color: #22b8cf;
        &:hover {
            color: #3bc9db;
        }
    }

    & + & {
        margin-left: 1rem;
    }

    /*
    ${props =>
        props.active && css`
            font-weight: 600;
            border-bottom: 2px solid #22b8cf;
            color: #22b8cf;
            &:hover {
                color: #3bc9db;
            }
    `}
    */
    /*
        props로 전달받은 onSelect를 각 Category 컴포넌트의
        onClick으로 설정해주고, 현재 선택된 카테고리 값에 따라 다른 스타일 적용.
    */
`;

/*
==========Chapter 14.7.3==========
    Categories에서 NavLink 사용하기

    Categories에서 기존의 onSelect 함수를 호출하여 카테고리를 선택하고, 선택된 카테고리에 다른 스타일을 주는 기능을 NavLink로 대체.
    div, a, button, input처럼 일반 HTML 요소가 아닌 특정 컴포넌트에 styled-components를 사용할 때는
    styled(컴포넌트 이름)`` 와 같은 형식을 사용함.

    NavLink로 만들어진 Category 컴포넌트에 to 값은 "/카테고리 이름"으로 설정.
    그리고 전체보기의 경우는 에외적으로 "/all" 대신에 "/"로 설정.

    to 값이 "/"를 가리키고 있을 때는 exact 값을 true로 해 주어야 함.
    이 값을 설정하지 않으면, 다른 카테고리가 선택되었을 때도 전체보기 링크에 active 스타일이 적용되는 오류가 발생.
*/

// const Categories = ({ category, onSelect }) => {
const Categories = () => {
    return (
        <CategoriesBlock>
            {categories.map(c => (
                <Category
                    key={c.name}
                    // active={category === c.name}
                    // onClick={() => onSelect(c.name)}
                    activeClassName="active"
                    exact={c.name === 'all'}
                    to={c.name === 'all' ? '/' : `/${c.name}`}
                >
                        {c.text}
                </Category>
            ))}
        </CategoriesBlock>
    );
}

export default Categories;