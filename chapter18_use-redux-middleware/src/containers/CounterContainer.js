import React from 'react';
import { connect } from 'react-redux';
// import { increase, decrease } from '../modules/counter';
import { increaseAsync, decreaseAsync } from '../modules/counter-saga';
import Counter from '../components/Counter';

const CounterContainer = ({ number, increase, decrease }) => {
    return (
        <Counter number={number} onIncrease={increase} onDecrease={decrease} />
    );
};

export default connect(
    state => ({
        number: state.counter
    }),
    {
        increase: increaseAsync,
        decrease: decreaseAsync
    }
)(CounterContainer);