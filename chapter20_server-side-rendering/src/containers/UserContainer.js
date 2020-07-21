import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
// import { Preloader } from '../lib/PreloadContext';
import { usePreloader } from '../lib/PreloadContext';
import { getUser } from '../modules/users';
import User from '../components/User';

/*
    컨테이너 컴포넌트에서 유효성 검사를 할 때 아직 정보가 없는 경우에는 user 값이 null을 가리키므로,
    User 컴포넌트가 렌더링되지 않도록 컨테이너 컴포넌트가 null을 반환해 주어야 함.

    하지만 서버 사이드 렌더링을 해야 하기 때문에 null이 아닌 Preloader 컴포넌트를 렌더링하여 반환.
    => 이렇게 해 주면 서버 사이드 렌더링을 하는 과정에서 데이터가 없을 경우 GET_USER 액션을 발생 시킴.

    추가로 중복 요청을 방지하는 과정에서 user 값이 존재하는지 확인하고, id가 일치하는지도 확인 했음.
    id 값은 추후 URL 파라미터를 통해 받아 오기 때문에 문자열로 이루어져 있음.
    반면 user 객체 안에 들어 있는 id는 숫자 형태이기 때문에 parseInt를 사용하여 비교함.
*/

const UserContainer = ({ id }) => {
    const user = useSelector(state => state.users.user);
    const dispatch = useDispatch();

    usePreloader(() => dispatch(getUser(id))); // 서버 사이드 렌더링을 할 때 API 호출.
    useEffect(() => {
        if (user && user.id === parseInt(id, 10)) return; // 사용자가 존재하고, id가 일치한다면 요청하지 않음.
        dispatch(getUser(id));
    }, [dispatch, user, id]); // id가 바뀔 때 새로 요청해야 함

    // 컨테이너 유효성 검사 후 return null을 해야 하는 경우에
    // null 대신 Preloader 반환
    if (!user) {
        // return <Preloader resolve={() => dispatch(getUser(id))} />;
        return null;
    }
    return <User user={user} />;
};

export default UserContainer;