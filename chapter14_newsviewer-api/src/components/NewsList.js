import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import NewsItem from './NewsItem';
import axios from 'axios';
import usePromise from '../lib/usePromise';

/*
==========Chapter 14.4.2==========
    NewsList 만들기

    이 컴포넌트에서 API를 요청하게 됨.
    우선은 데이터를 불러오지 않고 있으니 sampleArticle이라는 객체에 미리 예시 데이터를 넣고,
    각 컴포넌트에 전달하여 가짜 내용이 보이게 만듬.
*/

const NewsListBlock = styled.div`
    box-sizing: border-box;
    padding-bottom: 3rem;
    width: 768px;
    margin: 0 auto;
    margin-top: 2rem;
    @media screen and (max-width: 768px) {
        width: 100%;
        padding-left: 1rem;
        padding-right: 1rem;
    }
`;

// const sampleArticle = {
//     title: '제목',
//     description: '내용',
//     url: 'https://google.com',
//     urlToImage: 'https://via.placeholder.com/160'
// };

/*
==========Chapter 14.5==========
    데이터 연동하기

    useEffect를 사용하여 컴포넌트가 처음 렌더링되는 시점에 API 요청.
    여기서 주의할 점은 useEffect에 등록하는 함수에 async를 붙이면 안 됨.(useEffect에서 반환해야 하는 값은 뒷정리 함수이기 때문)
    따라서 useEffect 내부에서 async/await를 사용하고 싶다면, 함수 내부에 async 키워드가 붙은 또 다른 함수를 만들어서 사용.

    추가로 loading이라는 상태도 관리하여 API 요청이 대기 중인지 판별할 것.
    요청이 대기 중일 때는 loading 값이 true가 되고, 요청이 끝나면 loading 값이 false가 돼야 함.

    데이터를 불러와서 뉴스 데이터 배열을 map 함수를 사용하여 컴포넌트 배열로 변환할 때 주의!
    map 함수를 사용하기 전에 꼭 !articles를 조회하여 해당 값이 현재 null이 아닌지 검사해야 함.
    이 작업을 하지 않으면, 아직 데이터가 없을 때 null에는 map 함수가 없기 때문에
    렌더링 과정에서 오류가 발생하고, 애플리케이션이 제대로 나타나지 않고 흰 페이지만 보이게 됨.
*/

/*
==========Chapter 14.6.2==========
    API를 호출할 때 카테고리 지정하기

    NewsList 컴포넌트에서 현재 props로 받아 온 category에 따라 카테고리를 지정하여 API를 요청하도록 구현.

    현재 category 값이 무엇인지에 따라 요청할 주소가 동적으로 바뀌고 있음.
    category 값이 all이라면 query 값을 공백으로 설정하고, all이 아니라면 "&category=카테고리" 형태의 문자열을 만들고 주소에 포함시키도록 함.

    추가로 category 값이 바뀔 때마다 뉴스를 새로 불러와야 하기 때문에
    useEffect의 의존 배열(두 번째 파라미터로 설정하는 배열)에 category를 넣어주어야 함.
    만약 클래스형 컴포넌트였다면 componentDidMount와 componentDidUpdate에서 요청을 시작하도록 설정해야 하는데,
    함수형 컴포넌트라면 이렇게 useEffect 한 번으로 컴포넌트가 처음 렌더링될 때, category 값이 바뀔 때 요청하도록 설정 가능.
*/

const NewsNotUsedPromiseList = ({ category }) => {
    const [articles, setArticles] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const query = category === 'all' ? '' : `&category=${category}`;
                const response = await axios.get(`https://newsapi.org/v2/top-headlines?country=kr${query}&apiKey=c8ead3135a58427691c9bb25bdc5e491`);

                console.log(query);
                setArticles(response.data.articles);
            } catch(e) {
                console.log(e);
            }
            setLoading(false);
        };
        fetchData();
    }, [category]);

    // 대기 중일 때
    if (loading) {
        return <NewsListBlock>대기 중...</NewsListBlock>
    }

    // articles 값이 설정되지 않았을 때
    if (!articles) {
        return null;
    }

    // articles 값이 유효할 때
    return (
        <NewsListBlock>
            {articles.map(article  => (
                <NewsItem key={article.url} article={article} />
            ))}
        </NewsListBlock>        
    );
    // return (
    //     <NewListBlock>
    //         <NewsItem article={sampleArticle}></NewsItem>
    //         <NewsItem article={sampleArticle}></NewsItem>
    //         <NewsItem article={sampleArticle}></NewsItem>
    //         <NewsItem article={sampleArticle}></NewsItem>
    //         <NewsItem article={sampleArticle}></NewsItem>
    //         <NewsItem article={sampleArticle}></NewsItem>
    //     </NewListBlock>
    // );
}

const NewsList = ({ category }) => {
    const [loading, response, error] = usePromise(() => {
        const query = category === 'all' ? '' : `&category=${category}`;
        return axios.get(`https://newsapi.org/v2/top-headlines?country=kr${query}&apiKey=c8ead3135a58427691c9bb25bdc5e491`);
    }, [category]);

    // 대기 중일 때
    if (loading) {
        return <NewsListBlock>대기 중...</NewsListBlock>
    }

    // 아직 response 값이 설정되지 않았을 때
    if (!response) {
        return null;
    }
    
    // 에러가 발생했을 때
    if (error) {
        return <NewsListBlock>에러 발생!</NewsListBlock>;
    }

    // response 값이 유효할 때
    const { articles } = response.data;
    return (
        <NewsListBlock>
            {articles.map(article => 
                <NewsItem key={article.url} article={article} />
            )}
        </NewsListBlock>
    )
}

export default NewsList;

/*
    usePromise를 사용하면 NewsList에서 대기 중 상태 관리와 useEffect 설정을
    직접 하지 않아도 되므로 코드가 훨씬 간결해 짐.

    요청 상태를 관리할 때 무조건 커스텀 Hook을 만들어서 사용해야 하는 것은 아니지만,
    상황에 따라 적절히 사용하면 좋은 코드를 만들어갈 수 있음.
*/