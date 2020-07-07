import React, { Component } from 'react';

/*
==========Chapter 7.3.3==========
    에러 잡아내기

    만약 사용자가 웹 서비스를 사용할 때 에러가 발생하여 흰 화면만 나타나면 곤란.
    때문에 에러가 발생했다고 사용자에게 인지시켜 줄 필요가 있음.
*/

class ErrorBoundary extends Component {
    state = {
        error: false
    };

    componentDidCatch(error, info) {
        // 에러가 발생하면 호출됨. 
        this.setState({
            error: true
        });
        console.log({error, info});
    }
    render() {
        if (this.state.error) return <div>Error!</div>; // error 값이 true 이면 에러 문구 출력
        else return this.props.children; // false 이면 일반 화면 출력
    }
}

export default ErrorBoundary;