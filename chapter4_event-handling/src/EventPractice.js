import React, {Component} from 'react';

/*
==========Chapter 4.2.1==========
    컴포넌트 생성 및 불러오기

----------Chapter 4.2.1.1----------
    컴포넌트 생성

    클래스형 컴포넌트로 작성
*/
class EventPractice extends Component {

    /*
    ----------Chapter 4.2.2.2----------
        state에 input 값 담기
    
        state = {
            message: ''
        };
    */
    constructor(props) {
        super(props);
        this.state = {
            message: ''
        };
    }
    render() {
        return (
            <div>
                <h1>이벤트 연습</h1>
                {
                    /*
                    ==========Chapter 4.2.2==========
                        onChange 이벤트 핸들링하기

                    ----------Chapter 4.2.2.1----------
                        onChange 이벤트 설정
                    */
                }
                <input
                    type="text"
                    name="message"
                    placeholder="아무거나 입력해보세요."
                    value={this.state.message}
                    onChange={
                        (e) => {
                            // e 객체는 SyntehticEvent로 웹 브라우저의 네이티브 이벤트를 감싸는 객체
                            // 네이티브 이벤트와 인터페이스가 같으므로 순수 자바스크립트에서 HTML 이벤트를 다룰 때와 똑같이 사용.
                            /*
                                SyntheticEvent는 네이티브 이벤트와 달리 이벤트가 끝나고 나면 이벤트가 초기화되므로
                                정보를 참조할 수 없음. 예를 들어, 0.5초 뒤에 e객체를 참조하면 e객체 내부의 모든 값이 비워짐.

                                때문에 비동기적으로 이벤트 객체를 참조할 일이 있다면 e.persist() 함수를 호출해주어야 함.
                            */
                            // console.log(e.target.value);

                            this.setState({message: e.target.value});
                        }
                    }/>
                {
                    /*
                    ----------Chapter 4.2.2.3----------
                        버튼을 누를 때 comment 값을 공백으로 설정
                    */
                }
                <button onClick={
                    () => {
                        alert(this.state.message);
                        this.setState({
                            message: ''
                        });
                    }
                }>확인</button>
            </div>
        );
    }
}

/*
==========Chapter 4.2.3==========
    임의 메서드 만들기

    주의사항 중 "이벤트에 실행할 자바스크립트 코드를 전달하는 것이 아니라, 함수 형태의 값을 전달함."
    그렇기에 이벤트를 처리할 때 렌더링을 하는 동시에 함수를 만들어서 전달해주었음.
    이 방법 대신 함수를 미리 준비하여 전달하는 방법 => 성능상으로는 거의 차이가 없지만 가독성이 훨씬 높음(상황에 따라 다름)
*/
class EventPracticeMethod extends Component {
    /*
    ----------Chapter 4.2.3.1----------
        기본 방식

        함수가 호출될 때 this는 호출부에 따라 결정되므로, 클래스의 임의 메서드가
        특정 HTML 요소의 이벤트로 등록되는 과정에서 메서드와 this의 관계가 끊어지게 됨.
        이 때문에 임의 메서드가 이벤트로 등록되어도 this가 컴포넌트 자신으로 제대로 가리키기 위해서는
        메서드를 this와 바인딩(binding)하는 작업이 필요. => 만약 바인딩하지 않으면 this가 undefined를 가리킴
    */
    state = {
        message: ''
    };
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
        // 메서드를 this와 binding
    }
    handleChange(e) {
        this.setState({
            message: e.target.value
        });
    }
    handleClick() {
        alert(this.state.message);
        this.setState({
            messsage: ''
        });
    }
    render() {
        return (
            <div>
                <h1>이벤트 연습</h1>
                <input
                    type="text"
                    name="message"
                    placeholder="아무거나 입력해보세요."
                    value={this.state.message}
                    onChange={this.handleChange}
                />
                <button onClick={this.handleClick}>확인</button>
            </div>
        )
    }
}

/*
----------Chapter 4.2.3.2----------
    Property Initializer Syntax를 사용한 메서드 작성

    메서드 바인딩은 생성자에서 하는 것이 정석.
    => 새 메서드를 만들 때 마다 constructor를 수정해야 하기 때문에 이 작업이 불편할 수 있음.

    하지만 바벨의 transform-class-properties 문법을 사용하여
    화살표 함수 형태로 메서드를 정의할 수 있음.
*/
class EventPracticePISMethod extends Component {
    state = {
        username: '',
        message: ''
    };
    /*
    ==========Chapter 4.2.4==========
        input 여러 개 다루기

        event 객체인 e를 활용, e.target.name 값을 사용하여
        손 쉽게 여러 개를 다룰 수 있음.
    */
    handleChange = (e) => {
        /*
            객체 안에서 key를 []로 감싸면 그 안에 넣은 레퍼런스가 가리키는 실제 값이 key 값으로 사용됨.
            Example)
                const name = 'variantKey';
                const object = {
                    [name]: 'value'
                };
                위 코드의 object 내용은
                { 'variantKey': 'value' }
        */
        this.setState({
            [e.target.name]: e.target.value
        });
    }
    handleClick = () => {
        alert(this.state.username + ': ' + this.state.message);
        this.setState({
            username: '',
            message: ''
        });
    }
    /*
    ==========Chapter 4.2.5==========
        onKeyPress 이벤트 핸들링
    */
    handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            this.handleClick();
        }
    }
    render() {
        return (
            <div>
                <h1>이벤트 연습</h1>
                <input
                    type="text"
                    name="username"
                    placeholder="사용자명"
                    value={this.state.username}
                    onChange={this.handleChange}
                />
                <input
                    type="text"
                    name="message"
                    placeholder="아무거나 입력해보세요."
                    value={this.state.message}
                    onChange={this.handleChange}
                    onKeyPress={this.handleKeyPress}
                />
                <button onClick={this.handleClick}>확인</button>
            </div>
        )
    }
}

export default EventPracticePISMethod;