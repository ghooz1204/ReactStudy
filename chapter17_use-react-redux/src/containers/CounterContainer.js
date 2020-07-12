import React from 'react';
// import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Counter from '../components/Counter';
// import { increase, decrease } from '../modules/counter';
import { increase, decrease } from '../modules/useReduxActionCounter';

/*
==========Chapter 17.5==========
    컨테이너 컴포넌트 만들기

    컴포넌트에서 리덕스 스토어에 접근하여 원하는 상태를 받아 오고, 액션도 디스패치해야 함.

==========Chapter 17.5.1==========
    CounterContainer 만들기

    이 컴포넌트를 리덕스와 연동하기 위해선 react-redux에서 제공하는 connect 함수를 사용해야 함.
    * 사용법: connect(mapStateToProps, mapDispatchToProps)(연동할 컴포넌트)
    
    위와 같이 사용하고, 'mapStateToProps'는 리덕스 스토어 안의 상태를 컴포넌트의 props로 넘겨 주기 위해 설정하는 함수.
    'mapDispatchToProps'는 액션 생성 함수를 컴포넌트의 props로 넘겨주기 위해서 사용하는 함수.

    connect를 호출하고 나면 또 다른 함수를 반환하는데, 반환된 함수에 컴포넌트를 파라미터로 넣어 주면 리덕스와 연동된 컴포넌트가 만들어짐.
    Example)
        const makeContainer = connect(mapStateToProps, mapDispatchToProps)
        makeContainer(타깃 컴포넌트)
*/

const CounterContainer = ({ number, increase, decrease }) => {
    return (
        <Counter number={number} onIncrease={increase} onDecrease={decrease} />
    );
};

/*
    mapStateToProps와 mapDispatchToProps에서 반환하는 객체 내부의 값들은 컴포넌트의 props로 전달됨.
    
    mapStateToProps는 state를 파라미터로 받아 오며, 이 값은 현재 스토어가 지니고 있는 상태를 가리킴.
    mapDispatchToProps는 store의 내장 함수 dispatch를 파라미터로 받아옴.

    const mapStateToProps = state => ({
        number: state.counter.number
    });
    const mapDispatchToProps = dispatch => ({
        // 임시 함수
        increase: () => {
            // console.log('increase');
            dispatch(increase());
        },
        decrease: () => {
            // console.log('decrease');
            dispatch(decrease());
        }
    });
    export default connect(
        mapStateToProps,
        mapDispatchToProps
    )(CounterContainer);
*/

/*
    connect 함수를 사용할 때는 일반적으로 위 코드와 같이 mapStateToProps와 mapDispatchToProps를 미리 선언해 놓고 사용.
    하지만 connect 함수 내부에 익명 함수 형태로 선언해도 문제가 되지 않음. 오히려 코드는 더 깔끔하므로 취향에 따라 작성.

    export default connect(
        state => ({
            number: state.counter.number
        }),
        dispatch => ({
            increase: () => dispatch(increase()),
            decrease: () => dispatch(decrease())
            // decrease: () => { return dispatch(decrease()) } 와 완전히 같은 코드.
        })
    )(CounterContainer);
*/

/*
    컴포넌트에서 액션을 디스패치하기 위해 각 액션 생성 함수를 호출하고 dispatch로 감싸는 작업이 조금 번거로울 수 있음.
    특히 액션 함수의 개수가 많아진다면 심할 것.
    이와 같은 경우에는 리덕스에서 제공하는 bindActionCreators 유틸 함수를 사용하면 간편함.

    export default connect(
        state => ({
            number: state.counter.number
        }),
        dispatch =>
            bindActionCreators(
                {
                    increase,
                    decrease
                },
                dispatch
            )
    )(CounterContainer);
*/

/*
    위 방법보다 더 편한 방법이 한 가지 있는데, 바로 mapDispatchToProps에 해당하는 파라미터를
    함수 형태가 아닌 액션 생성 함수로 이루어진 객체 형태로 넣어주는 것.

    이렇게 두 번째 파라미터를 아예 객체 형태로 넣어 주면 connect 함수가 내부적으로 bindActionCreators 작업을 대신해 줌.
*/
export default connect(
    state => ({
        number: state.counter.number
    }),
    {
        increase,
        decrease
    }
)(CounterContainer);