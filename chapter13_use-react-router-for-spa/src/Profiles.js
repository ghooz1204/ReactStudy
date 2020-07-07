import React from 'react';
import { NavLink, Route } from 'react-router-dom';
import Profile from './Profile';
// import WithRouterSample from './WithRouterSample';


/*
==========Chapter 13.5==========
    서브 라우트

    "서브 라우트"는 라우트 내부에 또 라우트를 정의하는 것.
    이 작업은 그렇게 복잡하지 않고, 라우트로 사용하고 있는 컴포넌트의 내부에 Route 컴포넌트를 또 사용하면 됨.

    프로필 링크를 보여주는 Profiles 라우트 컴포넌트를 만들고,
    그 안에서 Profile 컴포넌트를 서브 라우트로 사용하도록 코드 작성.
*/

const Profiles = () => {
    /*
    ==========Chapter 13.6.4==========
        NavLink

        NavLink는 Link와 비슷하지만, 현재 경로와 Link에서 사용하는 경로가 일치할 경우
        특정 스타일 혹은 CSS 클래스를 적용할 수 있는 컴포넌트

        NavLink에서 링크가 활성화되었을 때의 스타일을 적용할 때는 activeStyle 값을,
        CSS 클래스를 적용할 때는 activeClassName 값을 props로 넣어 주면 됨.
    */
    const activeStyle = {
        background: 'black',
        color: 'white'
    };
    return (
        <div>
            <h3>사용자 목록: </h3>
            <ul>
                <li>
                    <NavLink activeStyle={activeStyle} to="/profiles/velopert">velopert</NavLink>
                </li>
                <li>
                    <NavLink activeStyle={activeStyle} to="/profiles/gildong">gildong</NavLink>
                </li>
            </ul>

            {/*
                첫 번째 Route 컴포넌트에는 component 대신 render라는 props를 넣어 줌.
                => 컴포넌트 자체를 전달하는 것이 아니라, 보여 주고 싶은 JSX를 넣어줄 수 있음.

                지금처럼 따로 컴포넌트를 만들기 애매한 상황에 사용해도 되고,
                컴포넌트에 props를 별도로 넣어주고 싶을 때 사용할 수 있음.
            */}
            <Route
                path="/profiles"
                exact
                render={() => <div>사용자를 선택해 주세요.</div>}
            />
            {/*
                JSX에서 props를 설정할 때 값을 생략하면 자동으로 true로 설정됨.
                예를 들어 현재 첫 번째 Route 컴포넌트에서 exact={true} 대신 exact라고만 적어도 같은 의미임.
            */}
            <Route path="/profiles/:username" component={Profile} />
            {/* <WithRouterSample /> */}
        </div>
    );
};

export default Profiles;