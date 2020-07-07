import React, { Component } from 'react';

/*
==========Chapter 13.6==========
    리액트 라우터 부가 기능

==========Chapter 13.6.1==========
    history

    history 객체는 라우트로 사용된 컴포넌트에 match, location과 함께 전달되는 props 중 하나로,
    이 객체를 통해 컴포넌트 내에 구현하는 메서드에서 라우터 API를 호출할 수 있음.
    예를 들어, 특정 버튼을 눌렀을 때 뒤로 가거나, 로그인 후 화면을 전환하거나, 다른 페이지로 이탈하는 것을 방지해야 할 때 history를 활용.
*/

class HistorySample extends Component {
    // 뒤로가기
    handleGoBack = () => {
        this.props.history.goBack();
    }

    // 홈으로 이동
    handleGoHome = () => {
        this.props.history.push('/');
    }

    componentDidMount() {
        // 이것을 설정하고 나면 페이지에 변화가 생기려고 할 때마다 정말 나갈 것인지 질문함
        this.unblock = this.props.history.block('정말 떠나실 건가요?');
    }

    componentWillUnmount() {
        // 컴포넌트가 언마운트되면 질문을 멈춤
        if (this.unblock) {
            this.unblock();
        }
    }

    render() {
        return (
            <div>
                <button onClick={this.handleGoBack}>뒤로</button>
                <button onClick={this.handleGoHome}>홈으로</button>
            </div>
        );
    }
}

export default HistorySample;