import React from 'react';

/*
    데이터를 불러와서 렌더링해 줄 때는 유효성 검사를 해 주는 것이 중요함.
    
    예를 들어 post && 를 사용하면 post 객체가 유효할 때만
    그 내부의 post.title, post.body 값을 보여줌.
    => 만약 데이터가 없는 상태라면 post.title을 조회하려고 할 때 자바스크립트 오류가 발생하니 반드시 유효성을 검사해 주어야 함.

    users도 마찬가지로 데이터가 배열 형태로 들어올 것을 기대하고 map 함수를 사용하고 있음.
    하지만 유효성 검사를 하지 않으면 null 값에 대해 map 함수를 호출하고, 결국 map 함수가 존재하지 않아 오류가 발생.
*/

const Sample = ({ loadingPost, loadingUsers, post, users }) => {
    return (
        <div>
            <section>
                <h1>포스트</h1>
                {loadingPost && '로딩 중...'}
                {!loadingPost && post && (
                    <div>
                        <h3>{post.title}</h3>
                        <h3>{post.body}</h3>
                    </div>
                )}
            </section>
            <hr />
            <section>
                <h1>사용자 목록</h1>
                {loadingUsers && 'loading...'}
                {!loadingUsers && users && (
                    <ul>
                        {users.map(user => (
                            <li key={user.id}>
                                {user.username} ({user.email})
                            </li>
                        ))}
                    </ul>
                )}
            </section>
        </div>
    );
}

export default Sample;