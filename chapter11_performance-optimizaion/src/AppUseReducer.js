import React, { useCallback, useRef, useReducer } from 'react';
import TodoTemplate from './components/TodoTemplate';
import TodoInsert from './components/TodoInsert';
import TodoList from './components/TodoList';

/*
==========Chapter 11.5.2==========
    useReducer 사용하기

    useState의 함수형 업데이트를 사용하는 대신, useReducer를 사용해도
    onToggle과 onRemove가 계속 새로워지는 문제를 해결할 수 있음.
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

function todoReducer(todos, action) {
    switch (action.type) {
        case 'INSERT': // 추가
            // { type: 'INSERT', todo: { id: 1, text: 'todo', checked: false } }
            return todos.concat(action.todo);
        case 'REMOVE': // 삭제
            // { type: 'REMOVE', id: 1 }
            return todos.filter(todo => todo.id !== action.id);
        case 'TOGGLE': // 수정
            // { type: 'TOGGLE', id: 1 }
            return todos.map(todo => todo.id === action.id ? { ...todo, checked: !todo.checked } : todo);
        default:
            return todos;
    }
}

const AppUseReducer = () => {
    const [todos, dispatch] = useReducer(todoReducer, undefined, createBulkTodos);
    /*
        useReducer를 사용할 때는 원래 두 번째 파라미터에 초기 상태를 넣어 주어야 함.
        하지만 그 대신 두 번째 파라미터에 undefined를 넣고,
        세 번째 파라미터에 초기 상태를 만들어 주는 함수인 createBulkTodos를 넣어 주었는데,
        이렇게 하면 컴포넌트가 맨 처음 렌더링될 때만 createBulkTodos 함수가 호출 됨.
    */

    // 고윳값으로 사용될 id
    // ref를 사용하여 변수 담기
    const nextId = useRef(2500);
    const onInsert = useCallback(text => {
        const todo = {
        id: nextId.current,
        text: text,
        checked: false
        };
        dispatch({type: 'INSERT', todo: todo});
        nextId.current += 1; // nextId 1씩 더하기
    }, []);
    const onRemove = useCallback(id => {
        dispatch({type: 'REMOVE', id: id});
    }, []);
    const onToggle = useCallback(id => {
        dispatch({type: 'TOGGLE', id: id});
    }, []);

    return (
        <TodoTemplate>
        <TodoInsert onInsert={onInsert}/>
        <TodoList onRemove={onRemove} onToggle={onToggle} todos={todos}/>
        </TodoTemplate>
    );
}

export default AppUseReducer;

/*
    useReducer를 사용하는 방법은 기존 코드를 많이 고쳐야 한다는 단점이 있지만,
    상태를 업데이트 하는 로직을 모아서 컴포넌트 바깥에 둘 수 있다는 장점이 있음.

    성능상으로는 두 가지 방법이 비슷하기 때문에 어떤 방법을 선택할지는 취향에 따라 결정.
*/