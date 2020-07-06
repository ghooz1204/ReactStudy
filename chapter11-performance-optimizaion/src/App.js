import React, { useState, useCallback, useRef } from 'react';
import TodoTemplate from './components/TodoTemplate';
import TodoInsert from './components/TodoInsert';
import TodoList from './components/TodoList';

/*
==========Chapter 11==========
  컴포넌트 성능 최적화

  이전에 만든 일정 관리 어플리케이션은 불편함이 없음.
  이는 추가되어 있는 데이터가 매우 적기 때문이며, 데이터가 무수히 많아지면
  애플리케이션이 느려지는 것을 체감할 수 있음.
  이 지연을 최소화 시키는 것을 컴포넌트 성능 최적화라고 함.

==========Chapter 11.1==========
  많은 데이터 렌더링하기

  실제로 랙(lag)를 경험할 수 있도록 많은 데이터를 렌더링 해봄.
  데이터를 하나하나 직접 입력할 수는 없으므로 createBulkTodos라는 함수를 만들어
  2,500개의 데이터를 자동으로 생성함.

  여기서 주의할 점은 useState의 기본 값에 함수를 넣어 주었다는 것!
  useState(createBulkTodos())라고 작성하면 리렌더링될 때마다 createBulkTodos가 호출되지만,
  useState(createBulkTodos)처럼 파라미터를 함수 형태로 넣어주면
  컴포넌트가 처음 렌더링될 때만 createBulkTodos 함수가 실행됨.

==========Chapter 11.2==========
  크롬 개발자 도구를 통한 성능 모니터링

  성능을 분석해야 할 때는 느려졌다는 느낌만으로 충분하지 않음.
  정확히 몇 초가 걸리는지 확인하려면 크롬 개발자 도구의 Performance 탭을 사용하여 측정하면 됨.
  크롬 개발자 도구의 Performance 탭을 열면 녹화 버튼이 나타나는데,
  이 버튼을 누르고 성능 체크할 요소를 확인한 후, 화면에 변화가 반영되면 Stop을 누르면 성능 분석 결과가 나타남.
  여기서 Timings를 열어 보면 각 시간대에 컴포넌트의 어떤 작업이 처리되었는지 확인 가능.

  데이터가 2,500개 밖에 안되는데 1초 가량 걸린다는 것은 성능이 매우 나쁘다는 의미.

==========Chapter 11.3==========
  느려지는 원인 분석

  컴포넌트의 리렌더링이 발생하는 상황
    1. 자신이 전달받은 props가 변경될 때
    2. 자신의 state가 바뀔 때
    3. 부모 컴포넌트가 리렌더링될 때
    4. forceUpdate 함수가 실행될 때
  
  지금 상황을 분석해 보면, '할 일 i' 항목을 체크할 경우 App 컴포넌트의 state가 변경되면서 App 컴포넌트가 리렌더링 됨.
  부모 컴포넌트인 App 컴포넌트가 리렌더링되었으니 TodoList 컴포넌트가 리렌더링 되고, 그 안의 무수한 컴포넌트들도 리렌더링 됨.

  '할 일 1' 항목은 리렌더링 되어야 하는 것이 맞지만, '할 일 2'부터 '할 일 2499'까지는
  리렌더링을 안 해도 되는 상황인데 모두 리렌더링되고 있으므로 이렇게 느린 것.
  컴포넌트의 개수가 많지 않다면 모든 컴포넌트를 리렌더링해도 느려지지 않는데, 지금처럼 약 2,000개가 넘어가면 성능이 저하됨.

  이럴 때는 컴포넌트 리렌더링 성능을 최적화해 주는 작업을 해 주어야 합니다.
  즉, 리렌더링이 불필요할 때는 리렌더링을 방지해 주어야 함.
*/

function createBulkTodos() {
  const array = [];
  for (let i = 0; i < 2500; i++) {
    array.push({
      id: i,
      text: `할 일 ${i}`,
      checked: false
    });
  }
  return array;
}

/*
==========Chapter 11.5==========
  onToggle, onRemove 함수가 바뀌지 않게 하기

  React.memo를 사용하는 것ㅁ나으로는 컴포넌트 최적화가 끝나지 않음.
  현재 프로젝트에서는 todos 배열이 업데이트되면 onRemove와 onToggle 함수도 새롭게 바뀌기 때문.

  onRemove와 onToggle 함수는 배열 상태를 업데이트하는 과정에서
  최신 상태의 todos를 참조하기 때문에 todos 배열이 바뀔 때마다 함수가 새로 만들어 짐.

  이렇게 함수가 계속 만들어지는 상황을 방지하는 방법은 두 가지.
    1. useState에 함수형 업데이트 기능을 사용하는 것.
    2. useReducer를 사용하는 것.
*/

const App = () => {
  const [todos, setTodos] = useState(createBulkTodos);
  // 고윳값으로 사용될 id
  // ref를 사용하여 변수 담기

  const nextId = useRef(2500);
  /*
  ==========Chapter 11.5.1==========
    useState의 함수형 업데이트

    기존에 setTodos 함수를 사용할 때는 새로운 상태를 파라미터로 넣어 주었음.
    setTodos를 사용할 때 새로운 상태를 넣는 대신, 상태 업데이트를 어떻게 할지 정의해 주는 업데이트 함수를 넣을 수도 있음.
    => 이를 함수형 업데이트라고 칭함.
    Example)
      const [number, setNumber] = useState(0);
      // prevNumbers는 현재 number 값을 가리킴.
      const onIncrease = useCallback(
        () => setNumber(prevNumber => prevNumber + 1),
        []
      );

      setNumber(number + 1)을 하는 것이 아니라, 위 코드처럼 어떻게 업데이트할지 정의해 주는 업데이트 함수를 넣어주면,
      useCallback을 사용할 때 두 번째 파라미터로 넣는 배열에 number를 넣지 않아도 됨.

    setTodos를 사용할 때 그 안에 todos => 만 앞에 넣어주면 됨.
  */
  const onInsert = useCallback(text => {
    const todo = {
      id: nextId.current,
      text: text,
      checked: false
    };
    setTodos(todos => todos.concat(todo));
    nextId.current += 1; // nextId 1씩 더하기
  }, []);
  const onRemove = useCallback(id => {
    setTodos(todos =>
      todos.filter(todo => todo.id !== id)
    )
  }, []);
  /*
  ==========Chapter 11.6==========
    불변성의 중요성

    리액트 컴포넌트에서 상태를 업데이트할 때 불변성을 지키는 것은 매우 중요함.
    
    아래의 useState를 통해 만든 onToggle 함수를 확인해 보면,
    기존 데이터를 수정할 때 직접 수정하지 않고, 새로운 배열을 만든 다음에
    새로운 객체를 만들어서 필요한 부분을 교체해 주는 방식으로 구현했음.
    업데이트가 필요한 곳에서는 아예 새로운 배열 혹은 새로운 객체를 만들기 때문에,
    React.memo를 사용했을 때 props가 바뀌었는지 혹은 바뀌지 않았는지 알아내서 리렌더링 성능을 최적화해 줄 수 있음.

    이렇게 기존의 값을 직접 수정하지 않으면서 새로운 값을 만들어 내는 것을 '불변성을 지킨다'고 함.
    Example)
      const array = [1, 2, 3, 4, 5];

      const nextArrayBad = array; // 배열을 복사하는 것이 아니라 똑같은 배열을 가리킴
      nextArray[0] = 100;
      console.log(array === nextArrayBad); // 완전히 같은 배열이기 때문에 true

      const nextArrayGood = [...array]; // 배열 내부의 값을 모두 복사함.
      nextArrayGood[0] = 100;
      console.log(array === nxtArrayGood); // 다른 배열이기 때문에 false

      const object = {
        foo: 'bar',
        value: 1
      };

      const nextObjectBad = object; // 객체가 복사되지 않고, 똑같은 객체를 가리킴
      nextObjectBad.value = nextObjectBad.value + 1;
      console.log(object === nextObjectBad); // 같은 객체이기 때문에 true

      const nextObjectGood = {
        ...object, // 기존에 있던 내용을 모두 복사해서 넣음
        value: object.value + 1 // 새로운 값을 덮어 씀.
      };
      console.log(object === nextObjectGood); // 다른 객체이기 때문에 false

    위 예시처럼 불변성이 지켜지지 않으면 객체 내부의 값이 새로워져도 바뀐 것을 감지하지 못 함.
    => React.memo에서 서로 비교하여 최적화하는 것이 불가능.
      
    추가로 전개 연산자(... 문법)를 사용하여 객체나 배열 내부의 값을 복사할 때는 얕은 복사(shallow copy)를 하게 됨.
    즉, 내부의 값이 완전히 새로 복사되는 것이 아니라, 가장 바깥 쪽에 있는 값만 복사됨.
    따라서 내부의 값이 객체 혹은 배열이라면 내부의 값 또한 따로 복사해주어야 함.
    Example)
      const todos = [{ id: 1, checked: true }, { id: 2, checked: true }];
      const nextTodos = [...todos];

      nextTodos[0].checked = false;
      console.log(todos[0] === nextTodos[0]); // 아직까지는 똑같은 객체를 가리키고 있기 때문에 true

      nextTodos[0] = {
        ...nextTodos[0],
        checked: false
      };
      console.log(todos[0] === nextTodos[0]); // 새로운 객체를 할당해 주었기에 false

    위 예시처럼 만약 객체 안에 있는 객체라면 불변성을 지키면서 새 값을 할당해야 하므로 아래와 같이 안쪽까지 모두 복사해야 함.
    Example)
      const nextComplexObject = {
        ...complexObject,
        objectInside: {
          ...complexObject.objectInside,
          enabled: false
        }
      };
      console.log(complexObject === nextComplexObject); // false
      console.log(complexObject.objectInside === nextComplexObject.objectInside); // false

    배열 혹은 객체의 구조가 정말 복잡해진다면 이렇게 불변성을 유지하면서 업데이트하는 것도 까다로워짐.
    이렇게 복잡한 상황일 경우 immer라는 라이브러리의 도움을 받으면 정말 편하게 작업할 수 있음.
  */
  const onToggle = useCallback(id => {
    setTodos(todos =>
      todos.map(todo =>
        todo.id === id ? { ...todo, checked: !todo.checked } : todo
      )
    );
  }, []);
  /*
    **
      개발 환경에서의 성능

      현재 yarn start를 통해 개발 서버를 구동하고 있는데, 개발 서버를 통해 보이는 리액트 어플리케이션은
      실제 프로덕션에서 구동될 때보다 처리 속도가 느림.
      실제 프로덕션 모드에서는 에러 시스템 및 Timing이 비활성화되어 처리 속도가 훨씬 더 빠름.

      지금은 소규모 프로젝트이기 때문에 프로덕션 모드일 때와 개발 모드일 때의 차이가 그렇기 크지 않지만,
      프로젝트의 규모가 커질수록 차이가 커짐.

      프로덕션 모드로 구동해 보고 싶다면 프로젝트 디렉터리에서 다음 명령어를 입력함.
        $ yarn build
        $ yarn global add serve
        $ serve -s build
    **
  */
  return (
    <TodoTemplate>
      <TodoInsert onInsert={onInsert}/>
      <TodoList onRemove={onRemove} onToggle={onToggle} todos={todos}/>
    </TodoTemplate>
  );
}

export default App;

/*
==========Chapter 11.9==========
  정리
  
  리액트 컴포넌트의 렌더링은 기본적으로 빠르기 때문에 컴포넌트를 개발할 때
  최적화 작업에 대해 너무 큰 스트레스를 받거나 모든 컴포넌트에 일일이 React.memo를 작성할 필요는 없음.

  단, 리스트와 관련된 컴포넌트를 만들 때 보여 줄 항목이 100개 이상이고 업데이트가 자주 발생한다면,
  이 장에서 학습한 방법을 사용하여 꼭 최적화해야 함.
*/