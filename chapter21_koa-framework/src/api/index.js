/*
==========Chapter 21.5.3==========
    REST API

    웹 애플리케이션을 만들려면 데이터베이스에 정보를 입력하고 읽어와야 함.
    그런데 웹 브라우저에서 데이터베이스에 직접 접속하여 데이터를 변경한다면 보안상 문제가 됨.
    => "REST API"를 만들어서 사용

    **
        REST API의 역할

        DB --[처리]-- 서버(REST API) --[응답]-- 클라이언트
    **
    클라이언트가 서버에 자신이 데이터를 조회, 생성, 삭제, 업데이트하겠다고 요청하면,
    서버는 필요한 로직에 따라 데이터베이스에 접근하여 작업을 처리함.

    'REST API'는 요청 종류에 따라 다른 HTTP 메서드를 사용함.
    **
        HTTP 메서드의 종류
        
        GET - 데이터를 조회할 때 사용
        POST - 데이터를 등록할 때 사용함(인증 작업을 거칠 때 사용함)
        DELETE - 데이터를 지울 때 사용
        PUT - 데이터를 새 정보로 통째로 교체할 때 사용함
        PATCH - 데이터의 특정 필드를 수정할 때 사용함
    **
    'REST API'를 설계할 때는 API 주소와 메서드에 따라 어떤 역할을 하는지 쉽게 파악할 수 있도록 작성해야 함.
    Example)
        POST '/posts' - 포스트 작성
        GET '/posts' - 포스트 목록 조회
        GET '/posts/:id' - 특정 포스트 조회
        DELETE '/posts/:id' - 특정 포스트 삭제
        PATCH '/posts/:id' - 특정 포스트 업데이트(구현 방식에 따라 PUT으로도 사용 가능)
        POST '/posts/:id/comments' - 특정 포스트에 덧글 등록
        GET '/posts/:id/comments' - 특정 포스트의 덧글 목록 조회
        DELETE '/posts/:id/comments/:commentId' - 특정 포스트의 특정 덧글 삭제

==========Chapter 21.5.4==========
    라우트 모듈화

    프로젝트를 진행하다 보면 여러 종류의 라우트를 만들게 됨.
    하지만 각 라우트를 index.js 파일 하나에 모두 작성하면, 코드가 너무 길어질 뿐 아니라 유지 보수 하기 힘들어짐.
    라우터를 여러 파일에 분리시켜서 작성하고, 이를 불러와 적용하여 사용할 필요가 있음.
*/

const Router = require('koa-router');
const posts = require('./posts');

const api = new Router();

api.use('/posts', posts.routes());

// 메인에서 라우트를 설정할 때 '/api' 경로를 넣어줬으므로
// 아래 라우팅 경로는 '/api/test'
api.get('/test', ctx => {
    ctx.body = 'test 성공';
});

// 라우터를 내보냄
module.exports = api;