import React from 'react';

/*
==========Chapter 7.2==========
    라이프사이클 메서드 살펴보기
*/

class ViewLifeCycleMethod extends React.Component {
    render() {
        /*
        ==========Chapter 7.2.1==========
            render() {...} 함수

            컴포넌트의 모양새를 정의하는 메서드. => 컴포넌트에서 가장 중요한 메서드(라이프사이클 메서드 중 유일한 필수 메서드)

            이 메서드 안에서 this.props와 this.state에 접근할 수 있으며, 리액트 요소를 반환.
            요소는 div 같은 태그가 될 수도 있고, 따로 선언한 컴포넌트가 될 수도 있음.
            아무 것도 보여주고 싶지 않다면 null 값이나 false 값을 반환.
            **
                이 메서드 안에서는 이벤트 설정이 아닌 곳에서 setState를 사용하면 안 되며,
                브라우저의 DOM에 접근해서도 안됨.
                DOM 정보를 가져오거나 state에 변화를 줄 때는 componentDidMount에서 가져와야 함.
            **
        */
        return <div></div>;
    }
    constructor(props) {
        /*
        ==========Chapter 7.2.2==========
            constructor(props) {...} 메서드

            컴포넌트의 생성자 메서드로 컴포넌트를 만들 때 처음으로 실행.
            이 메서드에서는 초기 state를 정할 수 있음.
        */
        super(props);
    }
    getDerivedStateFromProps(nextProps, prevState) {
        /*
        ==========Chapter 7.2.3==========
            getDerivedStateFromProps(nextProps, prevState) {...} 메서드

            리액트 v16.3 이후에 새로 만든 라이프사이클 메서드.
            props로 받아 온 값을 state에 동기화시키는 용도로 사용하며,
            컴포넌트가 마운트될 때와 업데이트될 때 호출.
        */
        if (nextProps.value !== prevState.value) { // 조건에 따라 특정 값 동기화
            return { value: nextProps.value };
        }
        return null; // state를 변경할 필요가 없다면 null을 반환
    }
    componentDidMount() {
        /*
        ==========Chapter 7.2.4==========
            componentDidMount() {...} 메서드

            컴포넌트를 만들고, 첫 렌더링을 다 마친 후 실행함.
            이 안에서 다른 자바스크립트 라이브러리 또는 프레임워크의 함수를 호출하거나
            이벤트 등록, setTimeout, setInterval, 네트워크 요청 같은 비동기 작업을 처리하면 됨.
        */
    }
    shouldComponentUpdate(nextProps, nextState) {
        /*
        ==========Chapter 7.2.5==========
            shouldComponentUpdate(nextProps, nextState) {...} 메서드
            
            props 또는 state를 변경했을 때, 리렌더링을 시작할지 여부를 지정하는 메서드.
            이 메서드에서는 반드시 true 값 또는 false 값을 반환해야 함.
            컴포넌트를 만들 때 이 메서드를 따로 생성하지 않으면 기본적으로 언제나 true 값을 반환.
            이 메서드가 false 값을 반환한다면 업데이트 과정은 여기서 중지됨.

            이 메서드 안에서 현재 props와 state는 this.props와 this.state로 접근하고
            새로 설정될 props 또는 stateSMS nextProps와 nextState로 접근할 수 있음.

            프로젝트 성능을 최적화할 때, 상황에 맞는 알고리즘을 작성하여 리렌더링을 방지할 때는
            false 값을 반환하게 함.
        */
    }
    getSnapshotBeforeUpdate(prevProps, prevState) {
        /*
        ==========Chapter 7.2.6==========
            getSnapshotBeforeUpdate(prevProps, prevState) {...} 메서드

            리액트 v16.3 이후에 새로 만든 라이프사이클 메서드.
            render에서 만들어진 결과물이 브라우저에 실제로 반영되기 직전에 호출됨.
            
            이 메서드에서 반환하는 값은 componentDidUpdate에서
            세 번째 파라미터인 snapshot 값으로 전달 받을 수 있는데,
            주로 업데이트하기 직전의 값을 참고할 일이 있을 때 활용됨.
            Example) 스크롤 바의 위치 유지
        */
        if (prevProps.array !== this.state.array) {
            const { scrollTop, scrollHeight } = this.list;
            return { scrollTop, scrollHeight };
        }
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        /*
        ==========Chapter 7.2.7==========
            componentDidUpdate(prevProps, prevState, snapshot) {...} 메서드

            컴포넌트가 리렌더링을 완료한 후 실행.
            업데이트가 끝난 직후이므로 DOM 관련 처리를 해도 무방함.
            여기서는 prevProps 또는 prevState를 사용하여 컴포넌트가 이전에 가졌던 데이터에 접근할 수 있음.
            또 getSnapshotBeforeUpdate에서 반환한 값이 있다면 여기서 snapshot 값을 전달받을 수 있음.
        */
    }
    componentWillUnmount() {
        /*
        ==========Chapter 7.2.8==========
            componentWillUnmount() {...} 메서드

            컴포넌트를 DOM에서 제거할 때 실행.
            componentDidMount에서 등록한
            이벤트, 타이머, 직접 생성한 DOM이 있다면 여기서 제거 작업을 해야 함.
        */
    }
    componentDidCatch(error, info) {
        /*
        ==========Chapter 7.2.9==========
            componentDidCatch(error, info) {...} 메서드

            리액트 v16에서 새롭게 도입된 라이프사이클 메서드.
            컴포넌트 렌더링 도중에 에러가 발생했을 때 애플리케이션이 먹통이 되지 않고
            오류 UI를 보여줄 수 있게 해줌.
        */
        this.setState({
            error: true
        });
        console.log({error, info});
        /*
            여기서 error은 파라미터에 어떤 에러가 발생했는지 알려 주며,
            info 파라미터는 어디에 있는 코드에서 오류가 발생했는지에 대한 정보를 줌.
            나중에 실제로 사용할 때 오류가 발생하면 서버 API를 호출하여 따로 수집할 수 있음.

            그러나 이 메서드를 사용할 때는 컴포넌트 자신에게 발생하는 에러를 잡아낼 수 없고
            자신의 tihs.props.children으로 전달되는 컴포넌트에서 발생한 에러만 잡아낼 수 있다는 점 염두.
        */
    }
}