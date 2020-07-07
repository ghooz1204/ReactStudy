import React, { useReducer } from 'react';
import useInputs from './useInputs';

/*
==========Chapter 8.3.2==========
*/

const Info = () => {
    const [state, onChange] = useInputs({
        name: '',
        nickname: ''
    }); // useReducer에서 액션은 그 어떤 값도 사용 가능.
    const { name, nickname } = state;

    // 이 방식으로 인풋의 개수가 많아져도 코드를 짧고 깔끔하게 유지할 수 있음.
    return (
        <div>
            <div>
                <input name="name" value={name} onChange={onChange} />
                <input name="nickname" value={nickname} onChange={onChange} />
            </div>
            <div>
                <div>
                    <b>이름: </b> {name}
                </div>
                <div>
                    <b>닉네임: </b> {nickname}
                </div>
            </div>
        </div>
    );
};

export default Info;