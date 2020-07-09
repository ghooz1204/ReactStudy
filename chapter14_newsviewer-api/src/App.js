import React
  // , { useState, useCallback }
  from 'react';
// import axios from 'axios';
// import NewsList from './components/NewsList';
// import Categories from './components/Categories';
import { Route } from 'react-router-dom';
import NewsPage from './pages/NewsPage';
/*
==========Chapter 14==========
  외부 API를 연동하여 뉴스 뷰어 만들기

==========Chapter 14.2==========
  axios로 API 호출해서 데이터 받아 오기

  axios는 현재 가장 많이 사용되고 있는 자바스크립트 HTTP 클라이언트.
  이 라이브러리의 특징은 HTTP 요청을 Promise 기반으로 처리한다는 점.

  $ yarn add axios
  명령어를 통해 axios 모듈을 다운로드.

==========Chapter 14.3==========
  newsapi API 키 발급받기

  이번 프로젝트에서는 newsapi에서 제공하는 API를 사용하여
  최신 뉴스를 불러온 후 보여줄 것이기 때문에 사전에 API 키를 발급받아야 함.
  https://newsapi.org/register 에 가입하면 발급받을 수 있음.
  API Key: c8ead3135a58427691c9bb25bdc5e491

  발급 받은 API 키는 추후 API를 요철할 때 API 주소의 쿼리 파라미터로 넣어서 사용.

  https://newsapi.org/s/south-korea-news-api 링크에 들어가면 한국 뉴스를 가져오는 API 설명서가 있음.
  사용할 API 주소는 두 가지 형태
    1. 전체 뉴스 불러오기
      GET https://newsapi.org/v2/top-headlines?country=kr&apiKey=발급 받은 API Key
    2. 특정 카테고리 뉴스 불러오기
      GET https://newsapi.org/v2/top-headlines?country=kr&category=특정 카테고리 명&apiKey=발급 받은 API Key
  여기서 카테고리는 business, entertainment, health, science, sports, technology 중에 골라서 사용 가능.
  카테고리를 생략하면 모든 카테고리의 뉴스 불러옴.
  apiKey 값에는 발급 받았던 API 키를 입력하면 됨.
*/

// const LIE_URL = 'https://jsonplaceholder.typicode.com/todos/1';
// const API_URL = 'https://newsapi.org/v2/top-headlines?country=kr&apiKey=c8ead3135a58427691c9bb25bdc5e491';
// const API_CATEGORY_URL = 'https://newsapi.org/v2/top-headlines?country=kr&category=business&apiKey=c8ead3135a58427691c9bb25bdc5e491';

const App = () => {
  /*
    예시 코드는 불러오기 버튼을 누르면 JSONPlaceholder(https://jsonplaceholder.typicode.com/)에서 제공하는
    가짜 API를 호출하고 이에 대한 응답을 컴포넌트 상태에 넣어서 보여 주는 예제.

    onClick 함수에서는 axios.get 함수를 사용함.
    이 함수는 파라미터로 전달된 주소에 GET 요청을 해 줌.
    그리고 이에 대한 결과는 .then을 통해 비동기적으로 확인할 수 있음.
  */
  // const [data, setData] = useState(null);
  // const onClick = () => {
  //   axios.get(API_URL)
  //     .then(response => {
  //       setData(response.data);
  //     });
  // }
  // const onAsyncClick = async () => {
  //   try {
  //     const response = await axios.get(API_CATEGORY_URL);
  //     setData(response.data);
  //   } catch (e) {
  //     console.log(e);
  //   }
  // }

  /*
    App에서 category 상태를 useState로 관리.
    추가로 category 값을 업데이트하는 onSelect라는 함수를 만들고,
    category와 onSelect 함수를 Categories 컴포넌트의 props로 전달해 줌.
    category 값을 NewsList 컴포넌트에도 전달해 주어야 함.
  */
  // const [category, setCategory] = useState('all');
  // const onSelect = useCallback(category => setCategory(category), []);

  return (
    // <div>
    //   <div>
    //     <button onClick={onClick}>불러오기</button>
    //     <button onClick={onAsyncClick}>Async 불러오기</button>
    //   </div>
    //   {data && <textarea rows={7} value={JSON.stringify(data, null, 2)} readOnly />}
    // </div>
    <>
      {/*
        <Categories category={category} onSelect={onSelect}/>
        <NewsList category={category}/>
      */}
      <Route path="/:category?" component={NewsPage} />
      {/*
        위 코드에 사용된 path에 /:category?와 같은 형태로 맨 뒤에 물음표 문자가 들어갈 수 있는데,
        이는 category 값이 선택적(optional)이라는 의미.
        즉, 있을 수도 있고 없을 수도 있다는 뜻. => category URL 파라미터가 없다면 전체 카테고리를 선택한 것으로 간주
      */}
    </>
  )
}

export default App;

/*
==========Chapter 14.9==========
  정리

  리액트 컴포넌트에서 API를 연동하여 개발할 때 절대 잊지 말아야 할 유의사항은
  useEffect에 등록하는 함수는 async로 작성하면 안 된다는 점.
  그 대신 함수 내부에 async를 따로 만들어 주어야 함.

  지금은 usePromise라는 커스텀 Hook을 만들어 사용함으로써 코드가 조금 간결해지기는 했지만,
  나중에 사용해야 할 API의 종류가 많아지면 요청을 위한 상태 관리 하는 것이 번거로워질 수 있음.

  이는 리덕스와 리덕스 미들웨어를 통해 좀 더 쉽게 요청에 대한 상태를 관리할 수 있음.
*/