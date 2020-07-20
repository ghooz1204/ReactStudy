/*
==========Chapter 17.3==========
    리덕스 관련 코드 작성하기

    리덕스를 사용할 때는 액션 타입, 액션 생성 함수, 리듀서 코드를 작성해야 함.
    이 코드들을 각각 다르 파일에 작성하는 방법이 있고, 기능 별로 묶어서 파일 하나에 작성하는 방법이 있음.

    가장 일반적인 구조는 actions, constrants, reducers라는 세 개의 디렉터리를 만들고 그 안에 기능별로 파일을 하나씩 만드는 방식.
    코드를 종류에 따라 다른 파일에 작성하여 정리할 수 있어서 편리하지만,
    새로운 액션을 만들 때마다 세 종류의 파일을 모두 수정해야 하기 때문에 불편하기도 함.
    이 방식은 리덕스 공식 문서에서도 사용되므로 가장 기본적이라고 할 수 있지만, 사람에 따라서는 불편할 수도 있는 구조

    액션 타입, 액션 생성 함수, 리듀서 함수를 기능 별로 파일 하나에 몰아서 다 작성하는 방식을 "Ducks 패턴" 이라고 부르며,
    일반적인 구조로 리덕스를 사용하다가 불편함을 느낀 개발자들이 자주 사용하는 방식.

==========Chapter 17.3.1==========
    counter 모듈 작성하기

    'Ducks 패턴'을 사용하여 액션 타입, 액션 생성 함수, 리듀서를 작성한 코드를 "모듈"이라고 함.

----------Chapter 17.3.1.1----------
    액션 타입 정의하기

    가장 먼저 해야할 작업.
    액션 타입은 대문자로 정의하고, 문자열 내용은 '모듈 이름/액션 이름'과 같은 형태로 작성.
    문자열 안에 모듈 이름을 넣음으로써, 나중에 프로젝트가 커졌을 때 액션의 이름이 충돌되지 않게 해줌.
*/
const INCREASE = 'counter/INCREASE';
const DECREASE = 'counter/DECREASE';

/*
----------Chapter 17.3.1.2----------
    액션 생성 함수 만들기

    액션 타입을 정의한 후 액션 생성 함수를 만들어 주는데,
    더 필요하거나 추가할 값이 없으면 아래와 같이 만들어 주면 됨.
    
    주의! 앞부분에 export라는 키워드를 통해 추후 이 함수를 다른 파일에서 불러와 사용할 수 있게 만들어야 함!
*/
export const increase = () => ({ type: INCREASE });
export const decrease = () => ({ type: DECREASE });

/*
----------Chapter 17.3.1.3----------
    초기 상태 및 리듀서 함수 만들기

    이 모듈의 초기 상태는 number 값을 설정해 주고, 리듀서 함수에는 현재 상태를 참조하여 새로운 객체를 생성해서 반환하는 코드 작성.
    마지막으로 export default라는 키워드를 통해 함수를 내보내 주었음.
    **
        export와 export default의 차이점.

        export는 여러 개 내보낼 수 있지만 export default는 단 한 개만 내 보낼 수 있고, 불러오는 방식도 다름
        Example)
            import counter, { increase, decrease } from './counter';
    **
*/
const initialState = {
    number: 0
};
function counter(state = initialState, action) {
    switch (action.type) {
        case INCREASE:
            return {
                number: state.number + 1
            };
        case DECREASE:
            return {
                number: state.number - 1
            };
        default:
            return state;
    }
}

export default counter;