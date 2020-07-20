import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

/*
==========Chapter 19.2.1==========
    state를 사용한 코드 스플리팅

    버튼을 누르면 Split 컴포넌트를 import 구문을 통해 불러옴.
    state를 통해 렌더링 할지 말지 여부를 판단하는 코드 작성.

    이처럼 클래스형 컴포넌트에서 state를 통해 컴포넌트 코드 스플리팅을 하는 것이
    어렵지는 않지만, 매번 state를 선언해 주어야 한다는 단점이 있음.
*/

class AppClass extends Component {
    state = {
        SplitMe: null
    }
    handleClick = async () => {
        const loadedModule = await import('./SplitMe');
        this.setState({
            SplitMe: loadedModule.default
        });
    };
    render() {
        const { SplitMe } = this.state;
        return (
            <div className="App">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />
                    <p onClick={this.handleClick}>Hello React!</p>
                    {SplitMe && <SplitMe />}
                </header>
            </div>
        );
    }
};

export default AppClass;