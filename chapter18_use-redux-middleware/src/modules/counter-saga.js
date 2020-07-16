import { createAction, handleActions } from 'redux-actions';
import {
    delay,
    put,
    // takeEvery,
    takeLatest,
    select,
    throttle
} from 'redux-saga/effects';

/*
==========Chapter 18.3.2==========
    redux-saga

    redux-saga는 redux-thunk 다음으로 많이 사용하는 비동기 작업 관련 미들웨어.
    
    redux-thunk는 함수 형태의 액션을 디스패치하여 미들웨어에서 해당 함수에 스토어의 dispatch와 getState를 파라미터로 넣어서 사용하는 원리.
    그래서 구현한 thunk 함수 내부에서 원하는 API 요청도 하고, 다른 액션을 디스패치하거나 현재 상태를 조회하기 함.
    대부분의 경우에는 redux-thunk로도 충분히 기능을 구현할 수 있음.

    redux-saga는 좀 더 까다로운 상황에서 유용함.
    * 기존 요청을 취소 처리해야 할 때(불필요한 중복 요청 방지)
    * 특정 액션이 발생했을 때 다른 액션을 발생시키거나, API 요청 등 리덕스와 관계없는 코드를 실행할 때
    * 웹소켓을 사용할 때
    * API 요청 실패 시 재요청해야 할 때
     
----------Chapter 18.3.2.1----------
    제네레이터 함수 이해하기

    redux-saga에서는 ES6의 "제네레이터(generator)" 함수라는 문법을 사용함.
    보통 일반적인 상황에서는 많이 사용되지 않기 때문에 초반에 진입 장벽이 있을 수 있음.

    제네레이터 함수 문법의 핵심 기능은 함수를 작성할 때 함수를 특정 구간에 멈춰 놓을 수도 있고, 원할 때 다시 돌아가게 할 수도 있음.
        function weirdFunction() {
            return 1;
            return 2;
            return 3;
            return 4;
            return 5;
        }
    와 같은 함수가 있을 때, 하나의 함수에서 값을 여러 개 반환하는 것은 불가능하므로 이 코드는 제대로 작동하지 않음.
    => 정확히는 호출할 때마다 맨 위에 있는 값인 1만 반환.

    하지만 제네레이터 함수를 사용하면 함수에서 값을 순차적으로 반환할 수 있음.
    심지어 함수의 흐름을 도중에 멈춰놓았다가 다시 이어서 진행시킬 수도 있음.
        function* generatorFunction() {
            console.log('안녕하세요');
            yield 1;
            console.log('제네레이터 함수');
            yield 2;
            console.log('function*');
            yield 3;
            return 4;
        }
    제네레이터 함수를 만들 때는 function* 키워드를 사용.
    함수를 작성한 뒤에는 제네레이터를 생성함.
    
        const generator = generatorFunction();
        
    제네레이터 함수를 호출했을 때 반환되는 객체를 제네레이터라고 부름.

        generator.next();
        // 안녕하세요
        // {value: 1, done: false}
        generator.next();
        // 제네레이터 함수
        // {value: 2, done: false}
        generator.next();
        // function*
        // {value: 3, done: false}
        generator.next();
        // {value: 4, done: true}
        generator.next();
        // {value: undefined, done: true}

    제네레이터가 처음 만들어지면 함수의 흐름은 멈춰있는 상태.
    next()가 호출되면 다음 yield가 있는 곳까지 호출하고 다시 함수가 멈춤.
    제네레이터 함수를 사용하면 함수를 도중에 멈출 수도 있고, 순차적으로 여러 값을 반환시킬 수도 있음.
    next 함수에 파라미터를 넣으면 제네레이터 함수에서 yield를 사용하여 해당 값을 조회할 수도 있음.
        function* sumGenerator() {
            console.log('sumGenerator가 만들어졌습니다.');
            let a = yield;
            let b = yield;
            yield a + b;
        }

        const sum = sumGenerator();
        sum.next();
        // sumGenerator가 만들어졌습니다.
        // {value: undefined, done: false}
        sum.next(1);
        // {value: undefined, done: false}
        sum.next(2);
        // {value: 3, done: false}
        sum.next();
        // {value: undefined, done: true}

    redux-saga는 제네레이터 함수 문법을 기반으로 비동기 작업을 관리해 줌.
    좀 더 이해하기 쉽게 설명하면, redux-saga는 우리가 디스패치하는 액션을 모니터링해서 그에 따라 필요한 작업을 따로 수행할 수 있는 미들웨어.

        function* watchGenerator() {
            console.log('Monitoring...');
            let prevAction = null;
            while(true) {
                const action = yield;
                console.log('prevAction: ', prevAction);
                prevAction = action;
                if (action.type === 'HELLO') {
                    console.log('안녕하세요!');
                }
            }
        }
        const watch = watchGenerator();

        watch.next();
        // Monitoring...
        // {value: undefined, done: false}
        watch.next({ type: 'TEST' });
        // prevAction: null
        // {value: undefined, done: false}
        watch.next({ type: 'HELLO' });
        // prevAction: { type: 'TEST' }
        // 안녕하세요!
        // {value: undefined, done: false}

    redux-saga는 위 코드와 비슷한 원리로 작동함. 제네레이터 함수의 작동 방식만 기본적으로 파악하고 있으면,
    redux-saga에서 제공하는 여러 유용한 유틸 함수를 사용하여 액션을 쉽게 처리할 수 있음.
    
----------Chapter 18.3.2.2----------
    비동기 카운터 만들기

    $ yarn add redux-saga
    명령어를 통해 redux-saga를 다운로드.

    액션 타입을 선언하고, 해당 액션 타입에 대한 액션 함수도 만들고, 제너레이터 함수를 만듬.
    이 제네레이터 함수를 "사가(saga)"라고 부름.
*/

const INCREASE = 'counter/INCREASE';
const DECREASE = 'counter/DECREASE';

const INCREASE_ASYNC = 'counter/INCREASE_ASYNC';
const DECREASE_ASYNC = 'counter/DECREASE_ASYNC';

export const increase = createAction(INCREASE);
export const decrease = createAction(DECREASE);

// 마우스 클릭 이벤트가 payload 안에 들어가지 않도록
// () => undefined를 두 번째 파라미터로 넣어 줌.
export const increaseAsync = createAction(INCREASE_ASYNC, () => undefined);
export const decreaseAsync = createAction(DECREASE_ASYNC, () => undefined);

/*
----------Chapter 18.3.2.5----------
    알아 두면 유용한 기능들

    * select: 사가 내부에서 현재 상태를 조회하는 방법
    사가 내부에서 현재 상태를 참조해야 하는 상황이 생기면 select를 사용하면 됨.

    * throttle: 사가가 실행되는 주기를 제한하는 방법
    takeEvery 대신 throttle이라는 함수를 사용하면 사가가 n초에 단 한 번만 호출되도록 설정할 수 있음.
*/

function* increaseSaga() {
    yield delay(1000); // 1초를 기다립니다.
    yield put(increase()); // 특정 액션을 디스패치합니다.
    const number = yield select(state => state.counter); // state는 스토어의 상태를 의미함.
    console.log(`현재 값은 ${number}입니다.`);
}
function* decreaseSaga() {
    yield delay(1000); // 1초를 기다립니다.
    yield put(decrease()); // 특정 액션을 디스패치합니다.
    const number = yield select(state => state.counter); // state는 스토어의 상태를 의미함.
    console.log(`현재 값은 ${number}입니다.`);
}
/*
    +1 버튼을 연속해서 두 번 누르면 INCREASE_ASYNC 액션이 두 번 디스패치되고, 이에 따라 INCREASE 액션도 두 번 디스패치 됨.
    => takeEvery를 사용하여 increaseSaga를 등록했으므로 디스패치되는 모든 INCREASE_ASYNC 액션에 대해 1초 후 INCREASE 액션을 발생시켜 줌.

    -1 버튼을 연속해서 두 번 누르면 DECREASE_ASYNC 액션이 두 번 디스패치되지만, DECREASE 액션은 단 한 번 디스패치 됨.
    => takeLatest를 사용하여 decreaseSaga를 등록했으므로 여러 번 중첩된 액션 중 마지막 액션만 제대로 처리함.
*/

export function* counterSaga() {
    // takeEvery는 들어오는 모든 액션에 대해 특정 작업을 처리해 줍니다.
    // yield takeEvery(INCREASE_ASYNC, increaseSaga);

    yield throttle(3000, INCREASE_ASYNC, increaseSaga); // 사가가 다음과 같이 설정되면 increaseSaga는 3초에 단 한 번만 호출됨.

    // takeLatest는 기존에 진행 중이던 작업이 있다면 취소 처리하고
    // 가장 마지막으로 실행된 작업만 수행함.
    yield takeLatest(DECREASE_ASYNC, decreaseSaga);
}

const initialState = 0; // 상태는 꼭 객체일 필요가 없음. 숫자도 작동함.

const counter = handleActions(
    {
        [INCREASE]: state => state + 1,
        [DECREASE]: state => state - 1
    },
    initialState
);

export default counter;