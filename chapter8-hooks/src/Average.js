import React, { useState, useMemo, useCallback, useRef } from 'react';

/*
==========Chapter 8.4==========
    useMemo

    useMemo를 사용하면 함수형 컴포넌트 내부에서
    발생하는 연산을 최적화할 수 있음.
*/

const getAverage = numbers => {
    console.log('평균값 계산 중..');
    if (numbers.length === 0) return 0;
    const sum = numbers.reduce((a, b) => a + b);
    return sum / numbers.length;
};

/*
    useMemo를 사용하지 않은 상태에서는
    숫자를 등록할 때 뿐만 아니라 인풋 내용이 수정될 때도
    getAverage 함수가 호출되는 것을 확인할 수 있음.

    useMemo Hook은 특정 값이 바뀌었을 때만 연산을 실행하고,
    원하는 값이 바뀌지 않았다면 이전에 연산했던 결과를 다시 사용함.
*/
const useMemoAverage = () => {
    const [list, setList] = useState([]);
    const [number, setNumber] = useState('');

    const onChange = e => {
        setNumber(e.target.value);
    }   
    const onInsert = e => {
        const nextList = list.concat(parseInt(number));
        setList(nextList);
        setNumber('');
    }
    const avg = useMemo(() => getAverage(list), [list]);
    return (
        <div>
            <input value={number} onChange={onChange} />
            <button onClick={onInsert}>등록</button>
            <ul>
                {
                    list.map((value, index) => 
                        (<li key={index}>{value}</li>)
                    )
                }
            </ul>
            <div>
                <b>평균값: </b> {avg}
            </div>
        </div>
    );
};

/*
==========Chapter 8.5==========
    useCallback

    useCallback은 useMemo와 상당히 비슷한 함수.
    주로 렌더링 성능을 최적화해야 하는 상황에서 사용.
    이 Hook을 사용하면 이벤트 핸들러 함수를 필요할 때만 생성할 수 있음.

    위의 useMomeAverage 컴포넌트에서, onChange와 onInsert함수는 컴포넌트가 리렌더링될 때마다 새로 생성됨.
    컴포넌트의 렌더링이 자주 발생하거나 렌더링해야 할 컴포넌트의 개수가 많아지면 이 부분을 최적화 하는 것이 좋음.
*/
const useCallbackAverage = () => {
    const [list, setList] = useState([]);
    const [number, setNumber] = useState('');

    const onChange = useCallback(e => {
        setNumber(e.target.value);
    }, []); // 컴포넌트가 처음 렌더링될 때만 함수 생성
    const onInsert = useCallback(() => {
        const nextList = list.concat(parseInt(number));
        setList(nextList);
        setNumber('');
    }, [number, list]) // number 혹은 list가 바뀌었을 때만 함수 생성.
    /*
        useCallback의 첫 번째 파라미터에는 생성하고 싶은 함수를 넣고,
        두 번째 파라미터에는 배열을 넣으면 됨.
        이 배열에는 어떤 값이 바뀌었을 때 함수를 새로 생성해야 하는지 명시.

        onChange처럼 비어 있는 배열을 넣게 되면 컴포넌트가 렌더링될 때 단 한 번만 함수가 생성되며,
        onInsert처럼 배열 안에 number안에 list를 넣게 되면 인풋 내용이 바뀌거나 새로운 항목이 추가될 때마다 함수가 생성됨.
        
        함수 내부에서 상태 값에 의존해야 할 때는 그 값을 반드시 두 번째 파라미터 안에 포함시켜 주어야 함.
        예를 들어, onChange의 경우 기존의 값을 조회하지 않고 바로 설정만 하기 때문에 배열이 비어 있어도 상관없지만,
        onInsert는 기존의 number를 조회해서 nextList를 생성하기 때문에 배열 안에 number와 list를 꼭 넣어 주어야 함.

        Example)
            useCallback(() => {
                console.log("hello world!");
            }, []);
            useMemo(() => {
                const fn = () => {
                    console.log("hello world!");
                };
                return fn;
            }, []);

            위 두 코드는 완전히 똑같은 코드.
            useCallback은 결국 useMemo로 함수를 반환하는 상황에서 더 편하게 사용할 수 있는 Hook.
            숫자, 문자열, 객체처럼 일반 값을 재사용하려면 useMemo, 함수를 재사용하려면 useCallback.
    */
    const avg = useMemo(() => getAverage(list), [list]);
    return (
        <div>
            <input value={number} onChange={onChange} />
            <button onClick={onInsert}>등록</button>
            <ul>
                {
                    list.map((value, index) => 
                        (<li key={index}>{value}</li>)
                    )
                }
            </ul>
            <div>
                <b>평균값: </b> {avg}
            </div>
        </div>
    );
}

/*
==========Chapter 8.6==========
    useRef

    useRef는 함수형 컴포넌트에서 ref를 쉽게 사용할 수 있도록 해 줍니다.
*/
const Average = () => {
    const [list, setList] = useState([]);
    const [number, setNumber] = useState('');
    const inputEl = useRef(null);

    const onChange = useCallback(e => {
        setNumber(e.target.value);
    }, []); // 컴포넌트가 처음 렌더링될 때만 함수 생성
    const onInsert = useCallback(() => {
        const nextList = list.concat(parseInt(number));
        setList(nextList);
        setNumber('');
        inputEl.current.focus(); // 등록 버튼을 눌렀을 때 input으로 포커스가 넘어감.
    }, [number, list]) // number 혹은 list가 바뀌었을 때만 함수 생성.
    
    const avg = useMemo(() => getAverage(list), [list]);
    return (
        <div>
            <input 
                value={number} onChange={onChange}
                ref={inputEl} // ref를 설정하면 useRef를 통해 만든 객체 안의 current 값이 실제 엘리먼트를 가리킴
            />
            <button onClick={onInsert}>등록</button>
            <ul>
                {
                    list.map((value, index) => 
                        (<li key={index}>{value}</li>)
                    )
                }
            </ul>
            <div>
                <b>평균값: </b> {avg}
            </div>
        </div>
    );
}

export default Average;