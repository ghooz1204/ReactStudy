import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { getPost, getUsers } from '../modules/sample-saga';
import Sample from '../components/Sample';

const SampleContainer = ({
    getPost, getUsers,
    loadingPost, loadingUsers,
    post, users
}) => {
    // 클래스 형태 컴포넌트였다면 componentDidMount
    /*
    useEffect(() => {
        try {
            getPost(1);
            getUsers(1);
        } catch(e) {
            console.log(e);
        }
    }, [getPost, getUsers]);
    */
    // ??

    useEffect(() => {
        // useEffect에 파라미터로 넣는 함수는 async로 할 수 없기 때문에
        // 그 내부에서 async 함수를 선언하고 호출해 줌.
        const fn = async () => {
            try {
                await getPost(1);
                await getUsers(1);
            } catch (e) {
                console.log(e); // 에러 조회
            }
        };
        fn();
    }, [getPost, getUsers]);
    

    return (
        <Sample
            loadingPost={loadingPost}
            loadingUsers={loadingUsers}
            post={post}
            users={users}
        />
    );
};

export default connect(
    ({ sample, loading }) => ({
        post: sample.post,
        users: sample.users,
        // loadingPost: sample.loading.GET_POST,
        loadingPost: loading.GET_POST,
        // loadingUsers: sample.loading.GET_USERS,
        loadingUsers: loading.GET_USERS
    }),
    {
        getPost,
        getUsers
    }
)(SampleContainer);

/*
    redux-thunk를 처음 쓸 때는 비록 작성해야 할 코드가 많아서 불편할 수도 있지만,
    유용한 함수와 리듀서를 만들어서 상태를 관리한다면 매우 깔끔한 코드로 기능을 구현할 수 있음.
*/