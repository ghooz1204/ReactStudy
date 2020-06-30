import React, { useReducer } from 'react';

/*
==========Chapter 8.3.2==========
    인풋 상태 관리하기

    useReducer를 사용하면 기존에 클래스형 컴포넌트에서
    input 태그에 name 값을 할당하고 e.target.name을 참조하여
    setState 해 준 것과 유사한 방식으로 작업을 처리할 수 있음.
*/

function reducer(state, action) {
    return {
        ...state,
        [action.name]: action.value
    };
}

const Info = () => {
    const [state, dispatch] = useReducer(reducer, {
        name: '',
        nickname: ''
    }); // useReducer에서 액션은 그 어떤 값도 사용 가능.
    const { name, nickname } = state;

    const onChange = e => {
        // 그렇기 때문에 이벤트 객체가 지니고 있는 e.target 값 자체를 액션 값으로 사용.
        // e.target 객체에 name과 value 보유.
        dispatch(e.target);
    };

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