import React, { useState } from 'react';

/*
==========Chapter 6.1==========
    자바스크립트 배열의 map() 함수

    코드가 반복되는 경우, 코드 양은 더더욱 늘어날 것이며
    파일 용량도 쓸데없이 증가하기 때문에 낭비이고,
    보여 주어야 할 데이터가 유동적이라면 절대로 관리할 수 없음.

    자바스크립트 배열 객체의 내장 함수인 map 함수를 사용하여
    반복되는 컴포넌트를 렌더링할 수 있음.
    map 함수는 파라미터로 전달된 함수를 사용해서 배열 내 각 요소를
    원하는 규칙에 따라 변환한 후 그 결과로 새로운 배열을 생성.

==========Chapter 6.1.1==========
    문법

    arr.map(callback, [thisArg])

    이 함수의 파라미터는 다음과 같음.
        - callback: 새로운 배열의 요소를 생성하는 함수, 파라미터는 세가지
            - currentValue: 현재 처리하고 있는 요소
            - index: 현재 처리하고 있는 요소의 index 값
            - array: 현재 처리하고 있는 원본 배열
        - thisArg(선택 항목): callback 함수 내부에서 사용할 this 레퍼런스

==========Chapter 6.1.2==========
    예제

    ES5 문법

    var numbers = [1, 2, 3, 4, 5];
    var processed = numbers.map(function (num) {
        return num * num;
    });
    console.log(processed);

    결과 : [1, 4, 9, 16, 25]
    ------------------------
    ES6 문법

    const numbers = [1, 2, 3, 4, 5];
    const result = numbers.map(num => num * num);
    console.log(result)
*/
const NoIterationSample = () => {
    return (
        <ul>
            <li>눈사람</li>
            <li>얼음</li>
            <li>눈</li>
            <li>바람</li>
        </ul>
    );
};



/*
==========Chapter 6.2==========
    데이터 배열을 컴포넌트 배열로 변환하기
*/
const NoKeyIterationSample = () => {
    /*
    ==========Chapter 6.2.1==========
        컴포넌트 수정하기
        
        문자열로 구성된 배열을 선언하여, JSX 코드로 된 배열을
        새로 생성한 후 nameList에 담음.

        map 함수에서 JSX를 작성할 때는 앞서 다룬 예제처럼
        DOM 요소를 작성해도 되고, 컴포넌트를 사용해도 됨.
    */
    const names = ['눈사람', '얼음', '눈', '바람'];
    const nameList = names.map(name => <li>{name}</li>);
    return <ul>{nameList}</ul>;
};



/*
=========Chapter 6.3==========
    key

    리액트에서 key는 컴포넌트 배열을 렌더링했을 때 어떤 원소에 변동이 있었는지 알아내려고 사용함.
    유동적인 데이터를 다룰 때는 원소를 새로 생성할 수도, 제거할 수도, 수정할 수도 있음
    때문에 key가 없을 때는 Virtual DOM을 비교하는 과정에서 리스트를 순차적으로 비교하면서 변화를 감지.

    하지만 key가 있다면 이 값을 사용하여 어떤 변화가 일어났는지 더욱 빠르게 알아낼 수 있음.

==========Chapter 6.3.1==========
    key 설정

    key 값을 설정할 때는 map 함수의 인자로 전달되는 함수 내부에서
    컴포넌트 props를 설정하듯이 설정하면 됨.

    key값은 언제나 유일해야함 => 데이터가 가진 고유값을 key값으로 설정해야함.
    Example)
        const articleList = articles.map(article => (
            <Article
                title={article.title}
                writer={article.writer}
                key={article.id} // id는 게시글의 고유한 식별자이므로 key 값으로 설정.
            />
        ))
*/
const KeyIterationSample = () => {
    const names = ['눈사람', '얼음', '눈', '바람'];
    const nameList = names.map((name, index) => <li key={index}>{name}</li>);
    return <ul>{nameList}</ul>;
    // 하지만 위와 같이 index 값을 key로 사용하면
    // 배열이 변경될 때 효율적으로 리렌더링 하지 못 함.
}



/*
==========Chapter 6.4==========
    응용

==========Chapter 6.4.1==========
    초기 상태 설정하기

    응용을 하기 위해 세 가지 상태를 사용함
        1. 데이터 배열
        2. 텍스트를 입력할 수 있는 input의 상태
        3. 새로운 항목을 추가할 때 사용할 고유 id를 위한 상태

==========Chapter 6.4.2==========
    데이터 추가 기능 구현하기


*/

const IterationSample = () => {
    const [names, setNames] = useState([
        // 데이터의 배열
        { id: 1, text: '눈사람' },
        { id: 2, text: '얼음' },
        { id: 3, text: '눈' },
        { id: 4, text: '바람' }
    ]);
    const [inputText, setInputText] = useState(''); // 텍스트를 입력할 수 있는 input의 상태.
    const [nextId, setNextId] = useState(5); // 새로운 항목을 추가할 때 사용할 id

    const onChange = e => setInputText(e.target.value);
    const onClick = () => {
        // 배열의 내장 함수 concat을 이용하여 새로운 항목을 추가한 배열을 만듬.
        const nextNames = names.concat({
            id: nextId, // nextId 값을 id로 설정.
            text: inputText
        });
        setNextId(nextId + 1); // nextId 값에 1을 더해준다.
        setNames(nextNames); // 만든 배열을 setNames를 통해 업데이트.
        setInputText(''); // inputText를 비운다.
    }
    /*
        **
            배열에 새 항목을 추가할 때 배열의 push 함수를 사용하지 않고 concat을 사용하는 이유.

            push 함수는 기존 배열 자체를 변경해 주는 반면, concat은 새로운 배열을 만들어 줌.
            리액트에서 상태를 업데이트할 때는 기존 상태를 그대로 두면서 새로운 값을 상태로 설정해야 함.

            이를 [불변성 유지]라고 하는데, 불변성 유지를 해 주어야
            나중에 리액트 컴포넌트의 성능을 최적화 할 수 있음.
        **
    */
    

    /*
    ==========Chapter 6.4.3==========
        데이터 제거 기능 구현하기

        각 항목을 더블클릭했을 때 해당 항목이 화면에서 사라지는 기능 구현.
        불변성을 유지하면서 업데이트해 주어야 하므로 배열의 내장함수 filter 사용.

        **
            filter 함수를 사용하면 배열에서 특정 조건을 만족하는 원소들만 쉽게 분류할 수 있음.
            Example)
                const numbers = [1, 2, 3, 4, 5, 6];
                const biggerThanTree = numbers.filter(number => number > 3);
                
                결과: [4, 5, 6]
            filter 함수의 인자에 분류하고 싶은 조건을 반환하는 함수를 넣어 주면 쉽게 분류.

            이 filter 함수를 응용하여 특정 배열에서 특정 원소만 제외시킬 수 있음.
            Example)
                const numbers = [1, 2, 3, 4, 5, 6];
                const withoutThree = numbers.filter(number => number !== 3);

                결과: [1, 2, 4, 5, 6]
        **
    */
    const onRemove = id => {
        const nextNames = names.filter(name => name.id !== id);
        setNames(nextNames);
    };

    const nameList = names.map(name => (
        <li key={name.id} onDoubleClick={() => onRemove(name.id)}>
            {name.text}
        </li>
    ));
    // map 함수를 사용할 때 key 값을 index 대신 name.id 값으로 지정

    return (
        <>
            <input type="text" value={inputText} onChange={onChange} />
            <button onClick={onClick}>추가</button>
            <ul>{nameList}</ul>
        </>
    );
}

export default IterationSample;