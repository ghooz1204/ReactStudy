import React from 'react';
import './SassComponent.scss';
/*
==========Chapter 9.2==========
    Sass 사용하기

    Sass(Syntactically Awesome Style Sheets)(문법적으로 매우 멋진 스타일시트)는
    CSS 전처리기로 복잡한 작업을 쉽게 할 수 있도록 해주고, 스타일 코드의 재활용성을 높여 줄 뿐만 아니라,
    코드의 가독성을 높여서 유지 보수를 더욱 쉽게 해 줌.

    * create-react-app 구버전에서는 Sass를 사용하려면 추가 작업이 필요했는데,
    * v2 버전부터는 별도의 추가 설정 없이 바로 사용할 수 있음.
    
    Sass에서는 두 가지 확장자 .scss와 .sass를 지원함.
    * .sass만 지원했으나 후에 개발자들의 요청을 .scss도 지원
    Example)
        .sass [
            $font-stack: Helvetica, sans-self
            $primary-color: #333

            body
                font: 100% $font-stack
                color: $primary-color
        ],
        .scss [
            $font-stack: Helvetica, sans-self;
            $primary-color: #333;

            body {
                font: 100% $font-stack;
                color: $primary-color;
            }
        ]
        주요 차이점을 살펴보면, .sass 확장자는 중괄호({})와 세미콜론(;)을 사용하지 않음.
        반면 .scss 확장자는 기존 CSS를 작성하는 방식과 비교해서 문법이 크게 다르지 않음.

    Sass를 사용하기 위해서는 node-sass라는 라이브러리를 설치해주어야 함.
    이 라이브러리는 Sass를 CSS로 변환해 줌.
*/

const SassComponent = () => {
    return (
        <div className="SassComponent">
            <div className="box red" />
            <div className="box orange" />
            <div className="box yellow" />
            <div className="box green" />
            <div className="box blue" />
            <div className="box indigo" />
            <div className="box violet" />
        </div>
    );
};

export default SassComponent;