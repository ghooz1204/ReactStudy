import React from 'react';
import WithRouterSample from './WithRouterSample';

/*
==========Chapter 13.4==========
    URL 파라미터와 쿼리

    페이지 주소를 정의할 때 가끔은 유동적인 값을 전달해야 할 때도 있음.
    이른 파라미터와 쿼리로 나뉨.
        * 파라미터 예시 : /profiles/velopert
        * 쿼리 예시 : /about?details=true

    유동적인 값을 사용해야 하는 상황에서 파라미터와 쿼리 중 무엇을 사용해야 하는 규칙은 없음.
    다만 일반적으로 파라미터는 특정 아이디 혹은 이름을 사용하여 조회할 때 사용.
    쿼리는 어떤 키워드를 검색하거나 페이지에 필요한 옵션을 전달할 때 사용.

==========Chapter 13.4.1==========
    URL 파라미터

    URL 파라미터를 사용할 때는 라우트로 사용하는 컴포넌트에서 받아 오는
    match라는 객체 안의 params 값을 참조함.
    match라는 객체 안에는 현재 컴포넌트가 어떤 경로 규칙에 의해 보이는지에 대한 정보가 들어있음.
*/

const data = {
    velopert: {
        name: 'Kim MinJoon',
        description: 'Developers who like React'
    },
    gildong: {
        name: 'Hong GilDong',
        description: 'The Main Character of the classic novel Hong gil-dong'
    }
};

const Profile = ({ match }) => {
    const { username } = match.params;
    const profile = data[username];
    if (!profile) {
        return <div>존재하지 않는 사용자입니다.</div>;
    } else {
        return (
            <div>
                <h3>
                    {username}({profile.name})
                </h3>
                <p>{profile.description}</p>
                <WithRouterSample />
            </div>
        );
    }
};

export default Profile;