import React, {Component} from 'react';
/*
==========Chapter 3.4==========
    state

    리액트에서 state는 컴포넌트 내부에서 바뀔 수 있는 값을 의미함.
    props는 컴포넌트가 사용되는 과정에서 부모 컴포넌트가 설정하는 값.

    컴포넌트 자신은 해당 props를 읽기 전용으로만 사용할 수 있음.
    때문에 props를 바꾸려면 부모 컴포넌트에서 바꾸어 주어야 함.

    리액트에는 두 가지 종류의 state가 존재함.
    한 가지는 클래스형 컴포넌트가 지니고 있는 state.
    다른 한 가지는 함수형 컴포넌트에서 useState라는 함수를 통해 사용하는 state.
*/

/*
==========Chapter 3.4.1==========
    클래스형 컴포넌트의 state
*/
class Counter extends Component {
    constructor(props) {
        // state를 설정하기 위해선 생성자를 호출해야 함.
        // 때문에 컴포넌트의 state를 설정할 때 super(props) 호출.
        super(props);
        // state의 초깃값 설정하기
        this.state = {
            // 컴포넌트의 state는 객체 형식
            number: 0,
            /*
            ----------Chapter 3.4.1.1----------
                state 객체 안에 여러 값이 있을 때

                버튼이 클릭될 때 fixedNumber 값은 그대로 두고
                number 값만 바꾸더라도 this.setState의 인자로 전달되는 개체 내부에
                fixedNumber를 넣을 필요는 없음.
            */
            fixedNumber: 0
        };
    }
    /*
    ----------Chapter 3.4.1.2----------
        state를 constructor에서 꺼내기

        생성자를 선언하지 않고도 state 초깃값을 설정할 수 있음.
        state = {
            number: 0,
            fixedNumber: 0
        };
    */
    render() {
        const { number, fixedNumber } = this.state; // state를 조회할 때는 this.state로 조회함.
        return (
            <div>
                <h1>{number}</h1>
                <h2>바뀌지 않는 값: {fixedNumber}</h2>
                <button
                    // onClick을 통해 버튼이 클릭되었을 때 호출할 함수를 지정합니다. => 이벤트를 설정함.
                    onClick={() => {
                        // this.setState를 사용하여 state에 새로운 값을 넣을 수 있습니다.
                        
                        // this.setState({number: number + 1});
                        // this.setState({number: this.state.number + 1})
                        /*
                        ----------Chapter 3.4.1.3----------
                            this.setState에 객체 대신 함수 인자 전달하기

                            위와 같은 코드에서 this.setState를 두 번 사용하는 것임에도 불구하고
                            버튼을 클릭할 때 숫자가 1씩 더해짐. => this.setState 함수가 비동기식이기 때문

                            이에 대한 해결책은 this.setState를 사용할 때 객체 대신에 함수를 인자로 넣어주는 것
                            **
                                화살표 함수에서 값을 바로 반환하고 싶다면 코드 블록 {}를 생략하면 됩니다.
                                Example) const sum = (a, b) => a + b;

                                onClick에서 두 번째로 this.setState 함수를 사용할 때는 화살표 함수에서
                                바로 객체를 반환하도록 했기 때문에 prevState => ({})와 같은 형태의 코드.
                            **
                        */
                        this.setState((prevState, props) => {
                            // prevState: 기존 상태, props: 현재 지니고 있는 props
                            // 만약 업데이트 과정에서 props가 필요하지 않다면 생략해도 됨.
                            return {
                                // 업데이트 하고 싶은 내용
                                number: prevState.number + 1
                            };
                        });
                        // 위 코드와 아래 코드는 완전히 똑같은 기능을 합니다.
                        // 아래 코드는 함수에서 바로 객체를 반환한다는 의미입니다.
                        /*
                        ----------Chapter 3.4.1.4----------
                            this.setState가 끝난 후 특정 작업 실행하기

                            업데이트하고 난 다음에 특정 작업을 하고 싶을 때는
                            setState의 두 번째 파라미터로 콜백 함수를 등록하여
                            작업을 처리할 수 있음.
                        */
                        this.setState(prevState => ({
                                number: prevState.number + 1
                        }), () => {
                            console.log('방금 setState가 호출되었습니다.');
                            console.log(this.state)
                        });
                    }}
                >
                    +1
                </button>
            </div>
        )
    }
}

export default Counter;