import React, { useState, useCallback, useRef } from 'react';
import TodoTemplate from './components/TodoTemplate';
import TodoInsert from './components/TodoInsert';
import TodoList from './components/TodoList';

/*
==========Chapter 10==========
  Make a Todo Web Application

  지금까지 배운 리액트의 기본기 지식을 활용하여
  프런트엔드를 공부할 때 많이 구형하는 일정 관리 어플리케이션 제작.

==========Chapter 10.1==========
  프로젝트 준비하기

==========Chapter 10.1.1==========
  프로젝트 생성 및 필요한 라이브러리 설치

  $ yarn create react-app app-name
  명령어를 통해 프로젝트를 생성하고

  $ cd app-name
  $ yarn add node-sass classnames react-icons
  명령어를 통해 필요한 라이브러리를 설치함.
  이 중 react-icons는 리액트에서 다양한 아이콘을 사용할 수 있는 라이브러리임.
  이 라이브러리의 장점은 SVG 형태로 이루어진 아이콘을 리액트 컴포넌트처럼 매우 쉽게 사용할 수 있다는 것.
  아이콘의 크기나 색상은 props 혹은 CSS 스타일로 변경하여 사용할 수 있음.

==========Chapger 10.1.2==========
  Prettier 설정
  
  코드를 작성할 때 코드를 깔끔하게 정리하기 위해서
  프로젝트 최상위 디렉터리에 .prettierrc 파일을 생성하고 다음과 같이 내용 작성.
  {
    "singleQuote": true,
    "semi": true,
    "useTabs": false,
    "tabWidth": 2,
    "trailingComma": "all",
    "printWidth": 80
  }
*/

const App = () => {
  /*
  ==========Chapter 10.3==========
    기능 구현하기
  
  ==========Chapter 10.3.1==========
    App에서 todos 상태 사용하기
  
    나중에 추가할 일정 항목에 대한 상태들은 모두 App 컴포넌트에서 관리.
    todos 배열 안에 들어 있는 객체는 각 항목의 고유 id, 내용, 완료 여부를 알려 주는 값이 포함.
    이 배열은 TodoList 컴포넌트에서 TodoListItem으로 변환하여 렌더링하도록 설정.
  */
  const [todos, setTodos] = useState([
    {
      id: 1,
      text: '리액트의 기초 알아보기',
      checked: true
    },
    {
      id: 2,
      text: '컴포넌트 스타일링해 보기',
      checked: true
    },
    {
      id: 3,
      text: '일정 관리 앱 만들어 보기',
      checked: false
    }
  ]);

  /*
  ----------Chapter 10.3.2.3----------
    todos 배열에 새 객체 추가하기

    이 함수에서는 새로운 객체를 만들 때마다 id 값에 1씩 더해 주어야 함.
    => id 값은 useRef를 사용하여 관리.

    useState가 아니라 useRef를 사용하여 컴포넌트에서 사용할 변수를 만드는 이유?
    => id 값은 렌더링되는 정보가 아니기 때문.
    => 이 값은 화면에도 보이지 않고, 이 값이 바뀐다고 해서 컴포넌트가 리렌더링될 필요도 없음.
    => 단순이 새로운 항ㅁ고을 만들 때 참조되는 값일 뿐이기 때문.

    또한 onInsert 함수는 성능을 아낄 수 있도록 useCallback으로 감싸줌.
    * props로 전달해야 할 함수를 만들 때는 useCallback을 사용하여 함수를 감싸는 것을 습관할 것!

  */
  // 고윳값으로 사용될 id
  // ref를 사용하여 변수 담기
  const nextId = useRef(4);
  const onInsert = useCallback(
    text => {
      const todo = {
        id: nextId.current,
        text: text,
        checked: false
      };
      setTodos(todos.concat(todo));
      nextId.current += 1; // nextId 1씩 더하기
    }, [todos]
  );

  /*
  ==========Chapter 10.3.3==========
    지우기 기능 구현하기

    리액트 컴포넌트에서 배열의 불변성을 지키면서 배열 원소를 제거해야 할 경우,
    배열 내장 함수인 filter를 사용하면 매운 간편함.

  ----------Chapter 10.3.3.1----------
    배열 내장 함수 filter

    filter 함수는 기존의 배열은 그대로 둔 상태에서 특정 조건을 만족하는
    원소들만 따로 추출하여 새로운 배열을 만들어 줌.
    Example)
      const array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
      const biggerThanFive = array.filter(number => number > 5);
      // 결과 : [6, 7, 8, 9, 10]

    filter 함수에는 조건을 확인해 주는 함수를 파라미터로 넣어 줌.
    파라미터로 넣는 함수는 true 혹은 false를 반환해야 하며, true인 경우에만 새로운 배열에 포함됨.


  ----------Chapter 10.3.3.2----------
    todos 배열에서 id로 항목 지우기

    TodoListItem에서 사용하기 위해 작성한 onRemove 함수를 TodoList의 props로 설정.
  */
  const onRemove = useCallback(
    id => {
      setTodos(todos.filter(todo => todo.id !== id))
    }, [todos]
  );

  /*
  ==========Chapter 10.3.4==========
    수정 기능

    삭제 기능과 비슷하게 onToggle이라는 함수를 만들고 해당 함수를
    TodoListItem에서 사용할 수 있도록 props로 전달해주면 됨.

  ----------Chapter 10.3.4.1----------
    onToggle 구현하기

    배열 내장 함수 map을 사용하여 특정 id를 가지고 있는 객체의 checked 값을 반전 시켜줌.
    불변성을 유지하면서 특정 배열 원소를 업데이트해야 할 때 map을 사용하면 짧은 코드로 쉽게 작성할 수 있음.

    **
      갑자기 배열 내장 함수 map이 사용된 이유?

      map 함수는 배열을 전체적으로 새로운 형태로 변환하여 새로운 배열을 생성해야할 때 사용하는데,
      지금은 딱 하나의 원소만 수정하는데 왜 map을 사용하나?

      작성한 onToggle 함수를 보면 todo.id === id ? ... : ... 이라는 삼항 연산자가 사용됨.
      이 코드를 자세히 분석하면, todo.id와 현재 파라미터로 사용된 id 값이 같을 때는 우리가
      정해 준 규칙대로 새로운 객체를 생성하지만, id 값이 다를 때는 변화를 주지 않고 처음 받아 왔던 상태 그대로 반환.
      그렇게 때문에 map을 사용하여 만든 배열에서 변화가 필요한 원소만 업데이트되고 나머지는 그대로 남아 있게 되는 것.
    **
  */
  const onToggle = useCallback(
    id => {
      setTodos(
        todos.map(todo =>
          todo.id === id ? { ...todo, checked: !todo.checked } : todo
        )
      );
    }, [todos]
  );
  
  return (
    <TodoTemplate>
      <TodoInsert onInsert={onInsert}/>
      <TodoList onRemove={onRemove} onToggle={onToggle} todos={todos}/>
    </TodoTemplate>
  );
}

export default App;

/*
==========Chapter 10.4==========
  정리
  
  이번에 만든 프로젝트는 소규모이기 때문에 따로 컴포넌트 리렌더링
  최적화 작업을 하지 않아도 정상적으로 작동.

  하지만 일정 항목이 몇 만 개씩 생긴다면 새로운 항목을 추가하거나
  기존 항목을 삭제 및 토글할 때 지연이 발생할 수 있음.

  클라이언트 자원을 더욱 효율적으로 사용하려면 불필요한 리렌더링을 방지해야 함.
*/