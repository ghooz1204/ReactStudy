import React from 'react';
// Chapter 3.2 first component
/*
==========Chapter 3.2.1==========
    src 디렉터리에 MyComponent.js 파일 생성

    **
        화살표 함수 문법
        function ()을 사용하면 자신이 종속된 객체를 this로 가리키며,
        () =>를 사용하면 자신이 종속된 인스턴스를 가리킴

        또한 화살표 함수는 값을 연산하여 바로 반환해야할 때 사용하면 가독성을 높일 수 있음.
        Example)
            function twice(value) {
                return value * 2;
            }
            const triple = (value) => value * 3;

        이 때문에 함수형 컴포넌트를 선언할 때 function 키워드와 화살표 함수 문법은 큰 차이가 없음.
        어떤 방식을 채택할 지는 각자의 취향에 달려있음.
    **
*/

/*
==========Chapter 3.2.2==========
    코드 작성하기
*/
const MyComponent = () => {
    // 화살표 함수 문법을 통하여 선언
    return <div>나의 새롭고 멋진 컴포넌트</div>;
};

export default MyComponent;
/* 
----------Chapter 3.2.3.1----------
    모듈 내보내기
*/