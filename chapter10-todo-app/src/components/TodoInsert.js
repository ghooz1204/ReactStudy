import React, { useState, useCallback } from 'react';
import { MdAdd } from 'react-icons/md';
import './TodoInsert.scss';

/*
==========Chapter 10.2.2==========
    TodoInsert 만들기

    여기서 사용하는 react-icons는,
    https://react-icons.netlify.com/#/icons/md 페이지에 들어가면
    확인할 수 있음.
*/

/*
==========Chapter 10.3.2==========
    항목 추가 기능 구현하기

----------Chapter 10.3.2.1----------
    TodoInsert value 상태 관리하기

    컴포넌트가 리렌더링될 때마다 함수를 새로 만드는 것이 아니라,
    한 번 함수를 만들고 재사용할 수 있도록 useCallback Hook을 사용.

    사실 인풋은 value 값과 onChange를 설정하지 않더라도 입력할 수 있음.
    그저 리액트 컴포넌트 쪽에서 해당 인풋에 무엇이 입력되어 있는지 추적하여 사용하기 위함.
    
    이런 경우 현재 state가 잘 업데이트되고 있는지 확인하려면, onChange 함수 안에서
    console.log를 찍어 보는 것 외에 리액트 개발자 도구(React Developer Tools)를 사용하는 방법이 있음.

----------Chapter 10.3.2.2----------
    리액트 개발자 도구

    리액트 개발자 도구는 브라우저에 나타난 리액트 컴포넌트를 심층 분석할 수 있도록
    크롬 웹 스토어(https://chrome.google.com/webstore/category/extensions)에 등록된 확장 프로그램임.
    
    설치하고 나서 크롬 개발자 도구를 열면 개발자 도구 탭에 React가 나타남.
    그리고 하단에 나오는 Elements 탭에서 컴포넌트를 검색한 후 선택하면
    그 컴포넌트에 등록된 정보들을 확인할 수 있음.
*/

const TodoInsert = ({ onInsert }) => {
    const [value, setValue] = useState('');

    const onChange = useCallback(e => {
        setValue(e.target.value);
    }, [])

    /*
    ----------Chapter 10.3.2.4----------
        TodoInsert에서 onSubmit 이벤트 설정하기

        App 컴포넌트에서 TodoInsert에 넣어 준 onInsert 함수에
        현재 useState를 통해 관리하고 있는 value 값을 파라미터로 넣어서 호출.

        onSubmit이라는 함수를 만들고 이를 form의 onSubmit으로 설정.
        이 함수가 호출되면 props로 받아온 onInsert 함수에 value 값을 파라미터로 넣어서 호출하고,
        현재 value 값을 초기화 함.
        **
            form의 onSubmit 이벤트는 브라우저를 새로고침 시킴.
            이때 e.preventDefault() 함수를 호출하면 새로고침 방지 가능.
            
            물론 onSubmit 대신에 onClick 이벤트로도 충분히 처리할 수 있으나,
            onSubmit 이벤트를 사용하면 인풋에서 Enter 키를 눌렀을 때도 이벤트가 발생하기 때문.

            onClick 이벤트를 사용하면 인풋에서 onKeyPress 이벤트를 통해 Enter를 감지하는
            로직을 따로 작성해야 하기 때문에 불편함이 존재함.
        **
    */

    const onSubmit = useCallback(
        e => {
            onInsert(value);
            setValue(''); // value 값 초기화

            // submit 이벤트는 브라우저에서 새로고침을 발생시킴.
            // 이를 방지하기 위해 이 함수를 호출함.
            e.preventDefault();
        },
        [onInsert, value]
    );
    return (
        <form className="TodoInsert" onSubmit={onSubmit}>
            <input
                placeholder="할 일을 입력하세요."
                value={value}
                onChange={onChange}
            />
            <button type="submit">
                <MdAdd />
            </button>
        </form>
    );
};

export default TodoInsert;