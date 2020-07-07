import React from 'react';
import qs from 'qs';

/*
==========Chapter 13.2.3==========
    페이지 만들기

    라우트로 사용할 페이지 컴포넌트를 만듬.
*/

/*
==========Chapter 13.4.2==========
    URL 쿼리

    쿼리는 location 객체에 들어 있는 search 값에서 조회할 수 있음.
    location 객체는 라우트로 사용된 컴포넌트에게 props로 전달되며,
    웹 애플리케이션의 현재 주소에 대한 정보를 지니고 있음.
    
    location 객체의 형태
        {
            "pathname": "/about",
            "search": "?detail=true",
            "hash": ""
        }
    위 location 객체는 http://localhost:3000/about?detail=true 주소로 들어갔을 때의 값.

    URL 쿼리를 읽을 때는 위 객체가 지닌 값 중에서 search 값을 확인해야 함.
    이 값은 문자열 형태로 되어있으며, URL 쿼리는 ?detail=true&another=1과 같이 문자열에 여러 가지 값 설정 가능.
    search 값에서 특정 값을 읽어 오기 위해서는 이 문자열을 객체 형태로 변환해 주어야 함.

    쿼리 문자열을 객체로 변환할 때는 'qs'라는 라이브러리를 사용.
    $ yarn add qs

    쿼리를 사용할 때는 쿼리 문자열을 객체로 파싱하는 과정에서 결과 값은 언제나 문자열이라는 점에 주의!
    ?value=1 혹은 ?value=true와 같이 숫자나 논리 자료형(boolean)을 사용한다고 해서 해당 값이
    우리가 원하는 형태로 변환되는 것이 아니라, "1", "true"와 같이 문자열 형태로 받아짐.

    그렇기 때문에 숫자를 받아 와야 하면 parseInt 함수를 통해 꼭 숫자로 변환해 주고,
    논리 자료형 값을 사용해야 하는 경우에는 정확히 "true" 문자열이랑 일치하는지 비교.
*/
const About = ({ location }) => {
    const query = qs.parse(location.search, {
        ignoreQueryPrefix: true // 이 설정을 통해 문자열 맨 앞의 ?를 생략.
    });
    const showDetail = query.detail === 'true' // 쿼리 파싱 결과 값은 문자열.
    return (
        <div>
            <h1>소개</h1>
            <p>이 프로젝트는 리액트 라우터 기초를 실습해 보는 예제 프로젝트입니다.</p>
            {showDetail && <p>detail 값을 true로 설정하셨군요!</p>}
        </div>
    );
}

export default About;