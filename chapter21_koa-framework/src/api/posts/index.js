/*
==========Chapter 21.5.5==========
    posts 라우트 생성

    posts 라우트에 여러 종류의 라우트를 설정한 후 모두 printInfo 함수를 호출하도록 설정.
    문자열이 아닌 JSON 객체를 반환하도록 설정하고, 이 객체에는 현재 요청의 메서드, 경로, 파라미터를 담음.

----------Chapter 21.5.5.1----------
    Postman의 설치 및 사용

    Postman은 macOS, Windows, 리눅스에서 모두 사용할 수 있는 프로그램임.
    https://www.getpostman.com
*/

const Router = require('koa-router');
const postsCtrl = require('./posts.ctrl');

const posts = new Router();

const printInfo = ctx => {
    ctx.body = {
        method: ctx.method,
        path: ctx.path,
        params: ctx.params
    };
};


posts.get('/', postsCtrl.list);
posts.post('/', postsCtrl.write);
posts.get('/:id', postsCtrl.read);
posts.delete('/:id', postsCtrl.remove);
posts.put('/:id', postsCtrl.replace);
posts.patch('/:id', postsCtrl.update);

module.exports = posts;