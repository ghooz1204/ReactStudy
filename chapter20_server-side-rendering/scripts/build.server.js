process.env.BABEL_ENV = 'production';
process.env.NODE_ENV = 'production';

process.on('unhandledRejection', err => {
    throw err;
});

/*
==========Chapter 20.3.3==========
    빌드 스크립트 작성하기

    방금 만든 환경 설정을 사용하여 웹팩으로 프로젝트를 빌드하는 스크립트 작성.
    scripts 디렉터리 내부에 build.js라는 파일이 있는데, 이 스크립트는 클라이언트에서 사용할 빌드 파일을 만드는 작업을 함.
    이 스크립트와 비슷한 형식으로 서버에서 사용할 빌드 파일을 만드는 build.server.js 작성
*/

require('../config/env');
const fs = require('fs-extra');
const webpack = require('webpack');
const config = require('../config/webpack.config.server');
const paths = require('../config/paths');

function build() {
    console.log('Creating server build...');
    fs.emptyDirSync(paths.ssrBuild);
    let compiler = webpack(config);
    return new Promise((resolve, reject) => {
        compiler.run((err, stats) => {
            if (err) {
                console.log(err);
                return;
            }
            console.log(stats.toString());
        })
    })
}

build();

/*
    코드를 다 작성한 뒤에는
    $ node scripts/build.server.js
    명령어를 실행하여 빌드.

    빌드가 다 된 후에
    $ node dist/server.js
    명령어를 실행하여 테스트 JSX 문자열이 렌더링 되는지 확인함.

    매번 빌드하고 실행할 때마다 파일 경로를 입력하는 것이 번거로울 수 있으니,
    package.json에서 스크립트를 생성하여 더 편하게 명령어를 입력할 수 있도록 함.
    scripts: {
        ...
        "start:server": "node dist/server.js",
        "build:server": "node scripts/build.server.js"
    }

    이렇게 스크립트를 만들면
    $ yarn build:server
    $ yarn start:server
    명령어로 서버를 빌드하고 시작할 수 있음.
*/