import React from 'react';
import TodoListItem from './TodoListItem';
import './TodoList.scss';

/*
==========Chapter 10.2.3==========
    TodoListItem과 TodoList 만들기

    이 컴폰터는에서 TodoListItem 컴포넌트를 불러와서
    props 전달을 통해 기능을 추가하고 다양한 데이터를 전달함.
*/

/*
    props로 받아온 todos 배열을 배열 내장 함수 map을 통해
    TodoListItem으로 이루어진 배열로 변환하여 렌더링 해 줌.

    map을 통하여 컴포넌트로 변환할 때는 key props를 전달해 주어야 하기 때문에
    key 값으로 각 항목마다 가지고 있는 고윳 값인 id를 넣어 줌.

    그리고 todo 데이터는 통째로 props로 전달해 줌.
    여러 종류의 값을 전달해야 하는 경우에는 객체 통째로 전달하는 편이
    성능 최적화를 할 때 편리함.
*/

const TodoList = ({ todos, onRemove, onToggle }) => {
    return (
        <div className="TodoList">
            {todos.map(todo => (
                <TodoListItem
                    todo={todo} key={todo.id}
                    onRemove={onRemove} onToggle={onToggle}/>
            ))}
        </div>
    );
};

export default TodoList;