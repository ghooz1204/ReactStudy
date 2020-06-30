import React, { Component } from 'react';

/*
==========Chapter 7.3==========
    라이프사이클 메서드 사용하기

    LifeCycleSample 컴포넌트 만들기 -> App에 렌더링하기 -> 버튼 누르고 콘솔 창 관찰하기
*/

class LifeCycleSample extends Component {
    /*
    ==========Chapter 7.3.1==========
        에제 컴포넌트 생성
    */
    state = {
        number: 0,
        color: null
    }

    myRef = null; // ref를 설정할 부분

    constructor(props) {
        super(props);

        console.log('constructor');
    }
    static getDerivedStateFromProps(nextProps, prevState) {
        // 부모에게서 받은 color 값을 state에 동기화
        console.log('getDerivedStateFromProps');
        if (nextProps.color !== prevState.color) {
            return { color: nextProps.color };
        }
        return null;
    }
    componentDidMount() {
        console.log('componentDidMount');
    }
    shouldComponentUpdate(nextProps, nextState) {
        console.log('shouldComponentUpdate', nextProps, nextState);
        // 숫자의 마지막 자리가 4면 리렌더링 하지 않습니다.
        return nextState.number % 10 !== 4;
    }
    componentWillUnmount() {
        console.log('componentWillUnmount')
    }
    getSnapshotBeforeUpdate(prevProps, prevState) {
        // DOM에 변화가 일어나기 직전의 색상 속성을 snapshot 값으로 변환.
        console.log('getSnapshotBeforeUpdate');
        if (prevProps.color !== this.props.color) {
            return this.myRef.style.color;
        }
        return null;
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        // snapshot 값을 조회
        console.log('componentDidUpdate', prevProps, prevState);
        if (snapshot) {
            console.log('업데이트되기 직전 색상: ', snapshot);
        }
    }

    handleClick = () => {
        this.setState({
            number: this.state.number + 1
        });
    }
    /*
        이 컴포넌트는 각 라이프사이클 메서드를 실행할 때마다 콘솔 디버거에 기록하고,
        부모 컴포넌트에서 props로 색상을 받아 버튼을 누르면 state.number 값을 1씩 더합니다.

        getDerivedStateProps는 부모에게서 받은 color 값을 state에 동기화하고 있습니다.
        그리고 getSnapshotBeforeUpdate는 DOM에 변화가 일어나기 직전의 색상 속성을
        snapshot 값으로 반환하여 이것을 componentDidUpdate에서 조회할 수 있게 했습니다.

        추가로 shouldComponentUpdate 메서드에서 state.number 값의 마지막 자리 수가 4이면 리렌더링을 취소하도록 설정.
    */
    render() {
        console.log('render');
        const style = {
            color: this.props.color
        };
        return (
            <div>
                {/* {this.props.missing.value} */}
                <h1 style={style} ref={ref => this.myRef = ref}>
                    {this.state.number}
                </h1>
                <p>color: {this.state.color}</p>
                <button onClick={this.handleClick}>
                    더하기
                </button>
            </div>
        )
    }
}

export default LifeCycleSample;