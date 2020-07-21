import React from 'react';
import { Link } from 'react-router-dom';

/*
==========Chapter 20.2==========
    프로젝트 준비하기

    $ yarn add react-router-dom
    명령어를 통해 react-router-dom 라이브러리 다운로드.

==========Chapter 20.2.1==========
    컴포넌트 만들기

    빨간색, 파란색 박스를 보여 주는 컴포넌트와 각 링크로
    이동할 수 있게 해 주는 메뉴 컴포넌트 작성.
*/

const Menu = () => {
    return (
        <ul>
            <li>
                <Link to="/red">Red</Link>
            </li>
            <li>
                <Link to="/blue">Blue</Link>
            </li>
            <li>
                <Link to="/users">Users</Link>
            </li>
        </ul>
    );
};

export default Menu;