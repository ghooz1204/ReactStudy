import React from 'react';

/*
==========Chapter 20.4.7==========
    User, UserContainer 컴포넌트 준비하기

    Users 컴포넌트에서는 users 값이 null인지 배열인지 확인하는 유효성 검사를 했지만,
    User 컴포넌트에서는 user 값이 null인지 객체인지 확인하는 유효성 검사를 하지 않음.
    => 컨테이너 컴포넌트에서 유효성 검사.
*/

const User = ({ user }) => {
    const { username, name, email } = user;
    return (
        <div>
            <h1>
                {username} ({name})
            </h1>
            <p>
                <b>e-mail:</b> {email}
            </p>
        </div>
    );
};

export default User;