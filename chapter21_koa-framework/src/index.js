/*
==========Chapter 21==========
    백엔드 프로그래밍: Node.js의 Koa 프레임워크

==========Chapter 21.1==========
    소개하기
==========Chapter 21.1.1==========
    백엔드

    서버에 데이터를 무작정 담지는 않음. => 데이터를 담을 때는 여러 가지 규칙이 필요함.
    Example)
        특정 데이터를 등록할 때 사용자 인증 정보가 필요할 수도 있고,
        등록할 데이터를 어떻게 검증할지, 데이터의 종류가 다양하다면 어떻게 구분할지 등을 고려해야 함.
        데이터를 조회할 때도 마찬가지. 어떤 종류의 데이터를 몇 개씩 보여 줄지, 그리고 또 어떻게 보여 줄지.
    
    이러한 로직을 만드는 것을 "서버 프로그래밍" 또는 "백엔드(back-end) 프로그래밍"이라고 함.
    백엔드 프로그래밍은 여러 가지 환경으로 진행할 수 있음.
    즉, 언어에 구애 받지 않기 때문에 PHP, 파이썬, Golang, 자바, 자바스크립트, 루비 등과 같은 다양한 언어로 구현할 수 있음.

==========Chapter 21.1.2==========
    Node.js

    자바스크립트가 발전하고, 구글이 크롬 웹 브라우저를 소개하면서 "V8"이라는 자바스크립트 엔진도 공개됨.
    이 자바스크립트 엔진을 기반으로 웹 브라우저뿐만 아니라 서버에서도 자바스크립트를 사용할 수 있는 런타임을 개발했는데,
    이를 "Node.js"라고 함.

==========Chapter 21.1.3==========
    Koa

    "Koa"는 "Express"의 기존 개발 팀이 개발한 프레임워크.
    - 기존 'Express'에서 고치고 싶었던 점들을 개선하면 내부 설계가 완전히 바뀌기 때문에 아예 새로운 프레임워크 개발.
    'Express'는 미들웨어, 라우팅, 템플릿, 파일 호스팅 등과 같은 다양한 기능이 자체적으로 내장되어 있는 반면,
    'Koa'는 미들웨어 기능만 갖추고 있으며 나머지는 다른 라이브러리를 적용하여 사용함.
    즉, 'Koa'는 필요한 기능들만 붙여서 서버를 만들 수 있기 때문에 'Express'보다 훨씬 가벼움.
    추가로 'Koa'는 async/await 문법을 정식으로 지원하기 때문에 비동기 작업을 더 편하게 관리할 수 있음.

==========Chapter 21.2==========
    작업 환경 준비

==========Chapter 21.3==========
    Koa 기본 사용법

==========Chapter 21.3.1==========
    서버 띄우기

    $ node src
    명령어를 통해 서버를 실행시킴.

    원래 node를 통해 자바스크립트 파일을 실행할 때는 node src/index.js와 같이 전체 경로를 입력하는 것이 맞지만,
    index.js 파일은 예외로 디렉터리만 입력해도 실행할 수 있음. index.js는 해당 디렉터리를 대표하는 파일.

==========Chapter 21.3.2==========
    미들웨어

    Koa 애플리케이션은 미들웨어의 배열로 구성되어 있음.
    app.use 함수는 미들웨어 함수를 애플리케이션에 등록함.
    * 미들웨어 함수의 구성
        (ctx, next) => { ... }
    Koa의 미들웨어 함수는 두 개의 파라미터를 받음. 첫 번째 파라미터는 ctx라는 값이고 두 번째 파라미터는 next인데,
    ctx는 Context의 줄임말로 웹 요청과 응답에 관한 정보를 지니고 있음.
    next는 현재 처리 중인 미들웨어의 다음 미들웨어를 호출하는 함수. 미들웨어를 등록하고 next 함수를 호출하지 않으면, 그다음 미들웨어를 처리하지 않음.

    만약 미들웨어에서 next를 사용하지 않으면 ctx => {} 와 같은 형태로 파라미터에 next를 설정하지 않아도 상관없음.
    주로 다음 미들웨어를 처리할 필요가 없는 라우트 미들웨어를 나중에 설정할 때 이러한 구조로 next를 생략하여 미들웨어를 작성.

    미들웨어는 app.use를 사용하여 등록하는 순서대로 처리.
*/
const Koa = require('koa');

const app = new Koa();


app.use(async (ctx, next) => {
    console.log(ctx.url);
    console.log(1);
    // next();
    /*
    if (ctx.query.authorized !== '1') {
        // 요청 경로에 authorized=1이라는 쿼리 파라미터가 포함되어 있으면 이후 미들웨어 처리.
        // 포함되어 있지 않다면 이후 미들웨어를 처리하지 않음
        // ** 쿼리 파라미터는 문자열이기 때문에 비교할 때 꼭 문자열 비교!
        ctx.status = 401; // Unauthorized
        return;
    }
    */
    // 지금은 단순히 주소의 쿼리 파라미터를 사용하여 조건부로 처리했지만
    // 나중에는 웹 요청의 쿠키 혹은 헤더를 통해 처리할 수도 있음.


    /*
    ----------Chapter 21.3.2.1----------
        next 함수는 Promise를 반환

        next 함수를 호출하면 Promise를 반환함. 이는 Koa가 Express와 차별화되는 부분.
        next 함수가 반환하는 Promise는 다음에 처리해야 할 미들웨어가 끝나야 완료됨.

    ----------Chapter 21.3.2.2----------
        async/await 사용하기

        Koa는 async/await 문법을 정식으로 지원하기 때문에 해당 문법을 아주 편하게 사용할 수 있음
        **
            Express도 async/await 문법을 사용할 수 있지만, 오류를 처리하는 부분이 제대로 작동하지 않을 수 있음.

            백엔드 개발을 하면서 예상치 못한 에러를 제대로 잡아내려면
            express-async-errors라는 라이브러리를 따로 사용해야 함.
        **
    */
    // next().then(() => {
    //     console.log('END');
    // });
    await next();
    console.log('END');
});
// 크롬 브라우저는 사용자가 웹 페이지에 들어가면 해당 사이트의 아이콘 파일인 /favicon.ico 파일을 서버에 요청하기 때문에
// 결과에 / 경로도 나타나고 /favicon.ico 경로도 나타나게 됨.
app.use((ctx, next) => {
    console.log(2);
    next();
});

app.use((ctx, next) => {
    // ctx.body = 'hello world!';
    next();
});


/*
==========Chapter 21.4==========
    nodemon 사용하기

    서버 코드를 변경할 때마다 서버를 재시작하는 것이 번거로우면
    nodemon이라는 도구를 사용하여 코드를 변경할 때마다 서버를 자동으로 재시작해 줄 수 있음.

    $ yarn add --dev nodemon
    명령어를 통해 nodemon 라이브러리를 다운로드 함.
    package.json의 scripts에 "start:dev": "nodemon --watch src/ src/index.js" 라고 입력.

    여기서 nodemon은 src 디렉터리를 주시하고 있다가 해당 디렉터리 내부의 어떤 파일이 변경되면
    이를 감지하여 src/index.js를 재시작해 줌.
    $ yarn start # 재시작이 필요 없을 때
    $ yarn start:dev # 재시작이 필요할 때
    
==========Chapter 21.5==========
    koa-router 사용하기

    Koa를 사용할 때도 다른 주소로 요청이 들어올 경우 다른 작업을 처리할 수 있도록 라우터를 사용해야 함.
    Koa 자체에 이 기능에 내장되어 있지는 않으므로
    
    $ yarn add koa-router
    명령어를 통해 koa-router 라이브러리를 다운로드 함.

==========Chapter 21.5.1==========
    기본 사용법

    koa-router를 불러온 뒤 Router 인스턴스를 만듬.
    그리고 '/' 경로와 '/about' 경로에 각각 띄어줄 문구를 설정함.

    이처럼 라우트를 설정할 때 router.get의 첫 번째 파라미터에는 라우트의 경로를 넣고,
    두 번째 파라미터에서는 해당 라우트에 적용할 미들웨어 함수를 넣음.
    여기서 get 키워드는 해당 라우트에서 사용할 "HTTP 메서드(GET, POST, PUT, DELETE 등)"를 의미함.

==========Chapter 21.5.2==========
    라우트 파라미터와 쿼리

    라우터의 파라미터를 설정할 때는 '/about/:name' 형식으로 콜론(:)을 사용하여 라우트 경로를 설정함.
    리액트 라우터에서 설정했을 때와 비슷한 방식.

    파라미터가 있을 수도 있고 없을 수도 있다면 '/about/:name?' 같은 형식으로 파라미터 이름 뒤에 물음표 사용.

    URL 쿼리의 경우, /posts/?id=10 같은 형식으로 요청했다면 해당 값을 ctx.query에서 조회할 수 있음.
    쿼리 문자열을 자동으로 객체 형태로 파싱해 주므로 별도의 파싱 함수를 돌릴 필요가 없음.(문자열 형태의 쿼리 문자열을 조회해야할 때는 ctx.queryString 사용.)

    "파라미터"와 "쿼리"는 둘 다 주소를 통해 특정 값을 받아 올 때 사용하지만, 용도가 서로 조금씩 다름.
    정해진 규칙은 따로 없지만, 일반적으로 '파라미터'는 처리할 작업의 카테고리를 받아 오거나, 고유 ID 혹은 이름으로 특정 데이터를 조회할 때 사용.
    반면, '쿼리'는 옵션에 관련된 정보를 받아 옴.
    (Example) 여러 항목을 리스팅하는 API라면, 어떤 조건을 만족하는 항목을 보여 줄지 또는 어떤 기준으로 정렬할 지 정해야할 때 사용.)
*/
const Router = require('koa-router');
const router = new Router();


/*
----------Chapter 21.5.5.2----------
    컨트롤러 파일 작성

    라우트를 작성하는 과정에서 특정 경로에 미들웨어를 등록할 때는
    * router.get('/', ctx => { ... });
    위 처럼 두 번째 인자에 함수를 선언해서 바로 넣어줄 수 있음.

    하지만 각 라우트 처리함수의 코드가 길면 라우트 설정을 한눈에 보기가 힘듬.
    => 이 라우트 처리 함수들을 다른 파일로 따로 분리해서 관리할 수도 있음.
    => 이 라우트 처리 함수만 모아 놓은 파일을 "컨트롤러"라고 함.

    API 기능을 본격적으로 구현하기 전에 먼저 koa-bodyparser 미들웨어를 적용해야 함.
    이 미들웨어는 POST/PUT/PATCH 같은 메서드의 Request Body에 JSON 형식으로 데이터를 넣어 주면,
    이를 파싱하여 서버에서 사용할 수 있게 해줌.

    $ yarn add koa-bodyparser
    명령어를 통해 koa-bodyparser 라이브러리를 다운로드.

    이어서 미들웨어를 불러와 적용하는데, 주의할 점은 router를 적용하는 코드의 윗부분에서 적용해야 함.
    
    컨트롤러를 만들면서 exports.이름 = ... 형식으로 함수를 내보내 주었는데, 이렇게 내보낸 코드는
        const 모듈이름 = require('파일이름');
        모듈이름.이름();
    위와 같은 형식으로 불러올 수 있음.

*/
const bodyParser = require('koa-bodyparser');

const api = require('./api');

router.use('/api', api.routes()); // api 라우트 적용

// 라우터 설정
router.get('/', ctx => {
    ctx.body = '홈';
});
router.get('/about:name?', ctx => {
    const { name } = ctx.params;
    // name의 존재 유무에 따라 다른 결과 출력
    ctx.body = name ? `${name}의 소개` : '소개';
});
router.get('/posts', ctx => {
    const { id } = ctx.query;
    // id의 존재 유무에 따라 다른 결과 출력
    ctx.body = id ? `포스트 #${id}` : '포스트 아이디가 없습니다.'
})

// 라우터 적용 전에 bodyParser 적용
app.use(bodyParser());

// app 인스턴스에 라우터 적용
app.use(router.routes()).use(router.allowedMethods());


app.listen(4000, () => {
    console.log('Listening to port 4000');
})

/*
==========Chapter 21.6==========
    정리

    데이터베이스를 사용하면 다양하고 효율적인 방식으로 많은 양의 데이터를 읽고 쓸 수 있음.
*/