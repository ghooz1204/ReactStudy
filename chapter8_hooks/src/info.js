import React, { useState, useEffect } from 'react';

/*
==========Chapter 8.1.1==========
    useState를 여러 번 사용하기

    하나의 useState 함수는 하나의 상태 값만 관리할 수 있음.
    따라서 컴포넌트에서 관리해야 할 상태가 여러 개라면 useState를 여러 번 사용하면 됨.
*/

const Info = () => {
    const [name, setName] = useState('');
    const [nickname, setNickname] = useState('');

    /*
    ==========Chapter 8.2==========
        useEffect

        리액트 컴포넌트가 렌더링될 때마다 특정 작업을 수행하도록 설정할 수 있는 Hook.
        클래스형 컴포넌트의 componentDidMount와 componentDidUpdate를 합친 형태.
    */
    useEffect(() => {
        // console.log('렌더링이 완료되었습니다!');
        console.log('effect');
        console.log({
            name,
            nickname
        });
        /*
        ==========Chapter 8.2.1==========
            마운트될 때만 실행하고 싶을 때

            useEffect에서 설정한 함수를 컴포넌트가 화면에 맨 처음 렌더링될 때만 실행하고
            업데이트될 때는 실행하지 않으려면 두 번째 파라미터로 비어 있는 배열을 넣어주면 됨.
    }, []);
        */

        /*
        ==========Chapter 8.2.2==========
            특정 값이 업데이트될 때만 실행하고 싶을 때

            클래스형 컴포넌트 Example)
                componentDidUpdate(prevProps, prevState) {
                    if (prevProps.value !== this.props.value) {
                        doSomething();
                    }
                }
            이 코드는 props 안에 들어 있는 value 값이 바뀔 때만 특정 작업을 수행함.
            
            함수형 컴포넌트에서는
            useEffect의 두 번째 파라미터로 전달되는 배열 안에 검사하고 싶은 값들을 넣어주면 됨.
            배열 안에는 useState를 통해 관리하고 있는 상태를 넣어 주어도 되고,
            props로 전달 받은 값을 넣어 주어도 됨.
        */

        /*
        ==========Chapter 8.2.3==========
            뒷정리하기

            useEffect는 기본적으로 렌더링되고 난 직후마다 실행되며,
            두 번째 파라미터 배열에 무엇을 넣는지에 따라 실행되는 조건이 달라짐.

            컴포넌트가 "언마운트되기 전이나 업데이트되기 직전"에 어떠한 작업을 수행하고 싶다면
            useEffect에서 뒷정리(cleanup) 함수를 반환해 주어야 합니다.
        */
        return () => {
            console.log('cleanup');
            console.log(name);
        };
    }, [name]);

    const onChangeName = e => {
        setName(e.target.value);
    };

    const onChangeNickname = e => {
        setNickname(e.target.value);
    }

    return (
        <div>
            <div>
                <input value={name} onChange={onChangeName} />
                <input value={nickname} onChange={onChangeNickname} />
            </div>
            <div>
                <div>
                    <b>이름 :</b> {name}
                </div>
                <div>
                    <b>닉네임 :</b> {nickname}
                </div>
            </div>
        </div>
    );
};

export default Info;