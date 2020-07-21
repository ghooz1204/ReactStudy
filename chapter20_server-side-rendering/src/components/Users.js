import React from 'react';
import { Link } from 'react-router-dom';

/*
==========Chapter 20.4.2==========
    Users, UsersContainer 컴포넌트 준비하기

    서버 사이드 렌더링을 할 때는 이미 있는 정보를 재요청하지 않게 처리하는 작업이 중요함.
    이 작업을 하지 않으면 서버 사이드 렌더링 후 브라우저에서 페이지를 확인할 때
    이미 데이터를 가지고 있음에도 불구하고 불필요한 API를 호출하게 됨.
    => 트래픽 낭비, 사용자 경험 저하
*/

const Users = ({ users }) => {
    if (!users) return null; // users가 유효하지 않다면 아무 것도 보여주지 않음
    return (
        <div>
            <ul>
                {users.map(user => (
                    <li key={user.id}>
                        <Link to={`/users/${user.id}`}>{user.username}</Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Users;