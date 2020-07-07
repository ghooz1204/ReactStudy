import React, { useState } from 'react'

/*
==========Chapter 4.3==========
    함수형 컴포넌트로 구현해 보기
*/

const EventPractice = () => {
    /*
    const [username, setUsername] = useState('');
    const [message, setMessage] = useState('');
    const onChangeUsername = e => setUsername(e.target.value);
    const onChangeMessage = e => setMessage(e.target.value);
    const onClick = () => {
        alert(username + ': ' + message);
        setUsername('');
        setMessage('');
    };
    const onKeyPress = e => {
        if (e.key == 'Enter') {
            onClick();
        }
    };
    
        위 코드에서는 e.target.name을 활용하지 않고 onChange 관련 함수 두 개를 따로 만듬.
        input이 두 개밖에 없다면 이런 코드도 나쁘지 않지만, input의 개수가 많아지면
        e.target.name을 적극적으로 활용하는 것이 좋음.
    */
    const [form, setForm] = useState({
        username: '',
        message: ''
    }); // 문자열이 아닌 객체를 넣음.
    const { username, message } = form;
    const onChange = e => {
        const nextForm = {
            ...form,
            [e.target.name]: e.target.value
        };
        setForm(nextForm);
    };
    const onClick = () => {
        alert(username + ': ' + message);
        setForm({
            username: '',
            message: ''
        });
    };
    const onKeyPress = e => {
        if (e.key === 'Enter') {
            onClick();
        }
    }
    return (
        <div>
            <h1>이벤트 연습</h1>
            <input
                type="text"
                name="username"
                placeholder="사용자명"
                value={username}
                // onChange={onChangeUsername}
                onChange={onChange}
            />
            <input
                type="text"
                name="message"
                placeholder="아무거나 입력해 보세요"
                value={message}
                // onChange={onChangeUsername}
                onChange={onChange}
                onKeyPress={onKeyPress}
            />
            <button onClick={onClick}>확인</button>
        </div>
    )
    // 함수형 컴포넌트에서 e.target.name을 활용하려면, 위와 같이 useState를 쓸 때 input 값들이 들어 있는 form 객체를 사용.
};
export default EventPractice;