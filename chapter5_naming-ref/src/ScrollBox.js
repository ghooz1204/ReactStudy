import React, {Component} from 'react';

/*
==========Chapter 5.3==========
    컴포넌트에 ref 달기

    리액트에서는 컴포넌트에도 ref를 달 수 있음.
    이 방법은 주로 컴포넌트 내부에 있는 DOM을 컴포넌트 외부에서 사용할 때 씀.
    컴포넌트에 ref를 다는 방법은 DOM에 ref를 다는 방법과 같음.

==========Chapter 5.3.1==========
    사용법

    <MyComponent 
        ref={(ref) => {this.myComponent=ref}}
    />
    위 처럼 하면 MyComponent 내부의 메서드 및 멤버 변수에도 접근할 수 있음.
    => 즉, 내부의 ref에도 접근할 수 있음.


==========Chapter 5.3.2==========
    컴포넌트 초기 설정

----------Chapter 5.3.2.1----------
    컴포넌트 파일 생성
    
    ScrollBox.js
*/
class ScrollBox extends Component {

    /*
    ==========Chapter 5.3.3==========
        컴포넌트에 메서드 생성

        컴포넌트에 스크롤바를 맨 아래쪽으로 내리는 메서드 생성.
        **
            자바스크립트로 스크롤바를 내릴 때는 DOM 노드가 가진 다음 값들을 사용.
            - scrollTop: 세로 스크롤바 위치(0~350)
            - scrollHeight: 스크롤이 있는 박스 안의 div 높이(650)
            - clientHeight: 스크롤이 있는 박스의 높이(300)
        **

        스크롤바를 맨 아래쪽으로 내리려면 scrollHeight - clientHeight
    */
    scrollToBottom = () => {
        const { scrollHeight, clientHeight } = this.box;
        /*
            앞 코드에는 비구조화 할당 문법을 사용했습니다.
            다음 코드와 같은 의미입니다.
            const scrollHeight = this.box.scrollHeight;
            const clientHeight = this.box.clientHeight;

        */
        this.box.scrollTop = scrollHeight - clientHeight;
    }
    render() {
        const style = {
            border: '1px solid black',
            height: '300px',
            width: '300px',
            overflow: 'auto',
            position: 'relative'
        };

        const innerStyle = {
            width: '100%',
            height: 650,
            background: 'linear-gradient(white, black)'
        };

        return (
            <div
                style={style}
                ref={(ref) => {this.box=ref}}>
                <div style={innerStyle} />
            </div>
        )
    }
}

export default ScrollBox;