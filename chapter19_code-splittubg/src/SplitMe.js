import React from 'react';

/*
==========Chapter 19.2==========
    React.lazy와 Suspense를 통한 컴포넌트 코드 스플리팅

    코드 스플리팅을 위해 리액트에 내장된 기능으로 유틸 함수인
    React.lazy와 컴포넌트인 Suspense가 있음.

    이 기능은 리액트 16.6 버전부터 도입되었음.
    이전 버전에서는 import 함수를 통해 불러온 다음, 컴포넌트 자체를 state에 넣는 방식으로 구현해야 함.
*/

const SplitMe = () => {
    return <div>SplitMe</div>;
}

export default SplitMe;