import axios from 'axios';

/*
----------Chapter 18.3.1.4----------
    웹 요청 비동기 작업 처리하기

    API를 호출할 때는 주로
    $ yarn add axios
    명령어를 통해 Promise 기반 웹 클라이언트 다운로드.

    API를 모두 함수화해 줌. 각 API를 호출하는 함수를 따로 작성하면,
    나중에 사용할 때 가독성도 좋고 유지 보수도 쉬워짐.
    다른 파일에서 불러와 사용할 수 있도록 export를 사용하여 내보내 줌.
*/

const URL = 'https://jsonplaceholder.typicode.com';

export const getPost = id => {
    return axios.get(`${URL}/posts/${id}`);
}

export const getUsers = id =>
    axios.get(`${URL}/users`);