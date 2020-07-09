import React from 'react';
import Categories from '../components/Categories';
import NewsList from '../components/NewsList';

/*
==========Chatper 14.7==========
    리액트 라우터 적용하기

    기존에는 카테고리 값을 useState로 관리했지만, 이 것을 리액트 라우터의 URL 파라미터를 사용하여 관리.

==========Chapter 14.7.1==========
    리액트 라우터 설치 및 적용

    $ yarn add react-router-dom
    명령어를 통해 react-router-dom을 다운로드

==========Chapter 14.7.2==========
    NewsPage 생성

    이 프로젝트에서 리액트 라우터를 적용할 때 만들어야 할 페이지는 단 하나.
    src 디렉터리에 pages라는 디렉터리를 만들고, 그 안에 NewsPage.js 작성

    현재 선택된 category 값을 URL 파라미터를 통해 사용할 것이므로 Categories 컴포넌트에서
    현재 선택된 카테고리 값을 알려 줄 필요도 없고, onSelect 함수를 전달해 줄 필요도 없음.

*/

const NewsPage = ({ match }) => {
    // 카테고리가 선택되지 않았으면 기본값 all 사용
    const category = match.params.category || 'all';
    return (
        <>
            <Categories />
            <NewsList category={category} />
        </>
    );
}

export default NewsPage;