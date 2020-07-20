import React, { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Counter from '../components/Counter';
import { increase, decrease } from '../modules/useReduxActionCounter';

/*
==========Chapter 17.7==========
    Hooks를 사용하여 컨테이너 컴포넌트 만들기

    리덕스 스토어와 연동된 컨테이너 컴포넌트를 만들 때 connect 함수를 사용하는 대신
    react-redux에서 제공하는 Hooks를 사용할 수도 있음.

==========Chapter 17.7.1==========
    useSelector로 상태 조회하기

    useSelector Hook을 사용하면 connect 함수를 사용하지 않고도 리덕스의 상태를 조회할 수 있음.
    * 사용법: const 결과 = useSelector(상태 선택 함수);

    여기서 상태 선택 함수는 mapStateToProps와 형태가 똑같음.

==========Chapter 17.7.2==========
    useDispatch를 사용하여 액션 디스패치 하기

    useDispatch Hook은 컴포넌트 내부에서 스토어의 내장 함수 dispatch를 사용할 수 있게 해줌.
    * 사용법:
        const dispatch = useDispatch();
        dispatch({ type: 'SAMPLE_ACTION' });
*/

const CounterContainer = () => {
    /*
        현재는 숫자가 바뀌어서 컴포넌트가 리렌더링될 때마다 onIncrease 함수와 onDecrease 함수가 새롭게 생성되고 있음.
        만약 컴포넌트 성능을 최적화해야 하는 상황이 온다면 useCallback으로 액션을 디스패치 하는 함수를 감싸주는 것이 좋음.
    */
    const number = useSelector(state => state.counter.number);
    const dispatch = useDispatch();
    const onIncrease = useCallback(() => dispatch(increase()), [dispatch]);
    const onDecrease = useCallback(() => dispatch(decrease()), [dispatch]);
    return (
        <Counter
            number={number}
            onIncrease={onIncrease}
            onDecrease={onDecrease}
        />
    );
};

// export default CounterContainer;
export default React.memo(CounterContainer);