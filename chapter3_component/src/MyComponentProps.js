import React, {Component} from 'react';
import PropTypes from 'prop-types';
import MyComponent from './MyComponent';
// Chapter 3.3 props
/*
==========Chapter 3.3.1==========
    JSX 내부에서 props 렌더링
*/
const MyComponentProps = (/* props */ {name, children, favoriteNumber}) => {
    // props 값은 컴포넌트 함수의 파라미터로 받아와서 사용.
    // children 값은 props 내에 속해있음. => 때문에 props.children으로 접근함.

    /*
    ==========Chapter 3.3.5==========
        비구조화 할당 문법을 통해 props 내부 값 추출하기

        ES6의 비구조화 할당 문법을 활용하여 작업을 편하게 함.
        구조 분해 문법이라고 불리며, 객체에 하나하나 접근하는 것보다 더 짧은 코드로 사용 가능함.
        위의 주석처럼 파라미터 부분에서 바로 비구조화 할당 문법 사용 가능.
    */

    // const {name, children} = props;
    return (
        <div>
            안녕하세요, 제 이름은 
            {
                /*props.name*/
                name
            }입니다. <br />
            {
                /*
                ==========Chapter 3.3.4==========
                    태그 사이의 내용을 보여주는 children
                */
            }
            children 값은
            {
                /*props.children*/
                children
            }입니다. <br />
            제가 좋아하는 숫자는 {favoriteNumber}입니다.
        </div>
    );
}

/*
==========Chapter 3.3.3==========
    props 기본값 설정: defaultProps

    props 값을 따로 지정하지 않았을 때
    보여 줄 기본 값을 설정함.
*/
MyComponentProps.defaultProps = {
    name : '기본 함수 이름'
}

/*
==========Chapter 3.3.6==========
    propTypes를 통한 props 검증

    컴포넌트의 필수 props를 지정하거나 props의 타입을 지정할 때 사용.
*/
MyComponentProps.propTypes = {
    // name 값은 무조건 문자열(string) 형태로 전달해야 된다는 것을 의미.
    // App 컴포넌트에서 name 값을 문자열이 아닌 숫자로 전달한 뒤 개발자 도구의 Console 탭을 확인하면 경고 메세지를 출력.
    name: PropTypes.string,
    /*
    ----------Chapter 3.3.6.1----------
        isRequired를 사용하여 필수 propTypes 설정
    */
    favoriteNumber: PropTypes.number.isRequired // props를 전달하지 않았을 때 경고 메세지를 출력.
}

/*
----------Chapter 3.3.6.2----------
    더 많은 PropTypes 종류

    array: 배열
    arrayOf(다른 PropType): 특정 PropType으로 이루어진 배열을 의미.
        Example) arrayOf(PropTypes.nymber)는 숫자로 이루어진 배열
    bool: true | false
    func: 함수
    number: 숫자
    object: 객체
    string: 문자열
    symbol: ES6의 symbol
    node: 렌더링할 수 있는 모든 것(숫자, 문자열, JSX Code, children도 node PropType)
    instanceOf(클래스): 특정 클래스의 인스턴스(에: instanceOf(MyClass))
    oneOf(['dog', 'cat']): 주어진 배열 요소 중 값 하나
    oneOfType(React.PropTypes.string, PropTypes.number): 주어진 배열 안의 종류 중 하나
    objectOf(React.PropTypes.number): 객체의 모든 키 값이 인자로 주어진 PropType인 객체
    shape({ name: PropTypes.string, num: PropTypes.number }): 주어진 스키마를 가진 객체
    any: 아무 종류

    더 자세한 정보는 https://github.com/facebook/prop-types 에서 확인할 수 있습니다.

    **
        defaultProps와 propTypes는 컴포넌트의 필수 사항이 아니므로 꼭 사용할 필요가 없음.
        하지만 React를 사용하여 큰 규모의 프로젝트를 진행하고, 다른 개발자들과 협업한다면
        해당 컴포넌트에 어떤 props가 필요한지 쉽게 알 수 있어 개발 능률이 좋아질 것.
    **
*/



/*
==========Chapter 3.3.7==========
    클래스형 컴포넌트에서 props 사용하기

    클래스형 컴포넌트에서 props를 사용할 때는 render 함수에서 this.props를 조회하면 됨.
    그리고 defaultProps와 propTypes는 똑같은 방식으로 설정할 수 있음.
*/
class MyComponentClass extends Component {
    render() {
        const { name, favoriteNumber, children } = this.props // 비구조화 할당
        return (
            <div>
                안녕하세요, 제 이름은 {name}입니다.<br />
                children 값은 {children}입니다.<br />
                제가 좋아하는 숫자는 {favoriteNumber}입니다.
            </div>
        );
    }
}

MyComponentClass.defaultProps = {
    name: '기본 클래스 이름'
}
MyComponentClass.propTypes = {
    name: PropTypes.string,
    favoriteNumber: PropTypes.number.isRequired
}

export default MyComponentClass;