import React from 'react';
import ReactDOMServer from 'react-dom/server';

/*
==========Chapter 20.3==========
    서버 사이드 렌더링 구현하기

    서버 사이드 렌더링을 구현하려면 웹팩 설정을 커스터마이징해 주어야 함.
    CRA로 만든 프로젝트에서는 웹팩 관련 설정이 기본적으로 모두 숨겨져 있으니
    $ yarn eject
    명령어를 실행하여 밖으로 꺼내 줌.

==========Chapter 20.3.1==========
*/

const html = ReactDOMServer.renderToString(
    <div>Hello Server Side Rendering!</div>
);

console.log(html);