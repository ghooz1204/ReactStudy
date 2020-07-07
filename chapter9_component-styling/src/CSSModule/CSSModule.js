import React from 'react';
// import styles from './CSSModule.module.css';
import styles from './CSSModule.module.scss';

// import styles from './CSSModule.scss';
// import styles from './CSSModule.css';

import classNames from 'classnames';
import classNamesBind from 'classnames/bind';

/*
==========Chapter 9.3==========
    CSS Module

    CSS Module은 CSS를 불러와서 사용할 때 클래스 이름을 고유한 값,
    즉 [파일 이름]_[클래스 이름]_[해시값] 형태로 자동으로 만들어서 컴포넌트 스타일 클래스 이름이
    중첩되는 현상을 방지해 주는 기술.

    CSS Module을 사용하기 위해 구버전(v1)의 create-react-app에서는
    웹팩에서 css-loader 설정을 별도로 해 주어야 했지만,
    v2 버전 이상부터는 따로 설정할 필요 없이 .module.css 확장자로
    파일을 저장하기만 하면 CSS Module이 적용됨.

    CSS Module을 사용하면 클래스 이름을 지을 때 그 고유성에 대해 고민하지 않아도 됨.
    해당 클래스는 개발자가 방금 만든 스타일을 직접 불러온 컴포넌트 내부에서만 작동하기 때문.
    => 흔히 사용하는 단어로 이름을 짓는다 해도 전혀 문제가 되지 않음.

    만약 특정 클래스가 웹 페이지에서 전역적으로 사용되는 경우라면
    :global을 앞에 입력하여 글로벌 CSS임을 명시할 수 있음.
*/

console.log(styles);
/*
    CSS Module이 적용된 스타일 파일을 불러오면 객체를 하나 전달받게 되는데
    CSS Module에서 사용한 클래스 이름과 해당 이름을 고유화한 값이 키-값 형태로 들어 있음.
    위의 styles 객체는 { wrapper: "CSSModule_wrapper__1SbdQ" } 와 같이 들어 있음.

    이 고유한 클래스 이름을 사용하려면 클래스를 적용하고 싶은 JSX 엘리먼트에
    className={styles.[클래스 이름]} 형태로 전달해 주면 됨.

    :global을 사용하여 전역적으로 선언한 클래스의 경우 평상시 해 왔던 것처럼 그냥 문자열로 넣어 줌.
*/

const CSSModuleNormal = () => {
    return (
        <div className={`${styles.wrapper} ${styles.inverted}`}>
            {/*
                CSS Module을 사용한 클래스 이름을 두 개 이상 적용할 때는 위와 같이 작성하면 됨.
                **
                    위 코드에서는 ES6 문법 템플릿 리터럴(Template Literal)을 사용하여 문자열을 합해줌.
                    이 문법을 사용하면 문자열 안에 자바스크립트 레퍼런스를 쉽게 넣어줄 수 있음.

                    Example)
                        const name = '리액트';
                        // const message = '제 이름은 ' + name + '입니다.';
                        const message = `제 이름은 ${name}입니다.`;
                    여기서 사용되는 `` 문자는 백틱(Backtick)이라고 부름.
                **
                CSS Module 클래스를 여러 개 사용할 때 템플릿 리터럴 문법을 사용하고 싶지 않다면
                className={[style.wrapper, styles.inverted].join(' ')}
                과 같이 작성할 수도 있음.
            */}
            안녕하세요, 저는 <span className="something">CSS Module!</span>
        </div>
    );
};


/*
==========Chapter 9.3.1==========
    classnames

    classnames는 CSS 클래스를 조건부로 설정할 때 매우 유용한 라이브러리
    또한, CSS Module을 사용할 때 이 라이브러리를 사용하면 여러 클래스를 적용할 때 매우 편리.

    yarn add classnames으로 해당 라이브러리 설치.
*/

// classnames 기본적인 사용법
classNames('one', 'two'); // = 'one two'
classNames('one', { two: true }) // = 'one two'
classNames('one', { two: false }) // = 'one'
classNames('one', ['two', 'three']) // = 'one two three'

const myClass = 'hello'
classNames('one', myClass, { myCondition: true }) // = 'one hello myCondition'
/*
    이런 식으로 여러 가지 종류의 파라미터를 조합해 CSS클래스를 설정할 수 있기 때문에
    컴포넌트에서 조건부로 클래스를 설정할 때 매우 편함.
    Example)
        const MyComponent = ({ highlighted, theme }) => {
            <div className={classNames('MyComponent', { highlighted }, theme)}>Hello</div>
        };
        이렇게 할 경우, 위 엘리멘트 클래스에 highlighted 값이 true이면 highlighted 클래스가 적용되고, false이면 적용되지 않음.
        추가로 theme로 전달받은 문자열은 내용 그대로 클래스에 적용 됨.
    
    이런 라이브러리의 도움을 받지 않는다면 다음과 같은 형식으로 처리해야 함
    Example)
        const MyComponent = ({ hightlighted, theme }) => {
            <div className={`MyComponent ${theme} ${hightlighted ? 'highlighted : ''}`}>
                Hello
            </div>
        }

    덧붙여서 CSS Module과 함께 사용하면 CSS Module 사용이 훨씬 쉬워짐.
    classnames에 내장된 bind 함수를 사용하면 클래스를 넣어 줄 때마다 styles.[클래스 이름] 형태를 사용할 필요가 없음.
    사전에 미리 styles에서 받아 온 후 사용하게끔 설정해두고 cx('클래스 이름1', '클래스 이름2') 형태로 사용할 수 있음.
*/
const cx = classNamesBind.bind(styles); // 미리 styles에서 클래스를 받아 오도록 설정.

const CSSModule = () => {
    return (
        <div className={cx('wrapper', 'inverted')}>
            안녕하세요, 저는 <span className="something">CSS Module!</span>
        </div>
    );
};

export default CSSModule;