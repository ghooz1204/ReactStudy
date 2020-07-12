import React from 'react';

/*
==========Chapter 17.2.2==========
    할 일 목록 컴포넌트 만들기

    파일 하나에 컴포넌트를 두 개 이상 선언해도 되고, 파일을 두 개로 분리해도 됨.
*/
const TodoItem = ({ todo, onToggle, onRemove }) => {
    return (
        <div>
            <input type="checkbox"
                checked={todo.done}
                onClick={() => onToggle(todo.id)}
                readOnly={true} // 이거 안하면 오류 뜸
            />
            <span style={{ textDecoration: todo.done ? 'line-through' : 'none' }}>
                {todo.text}
            </span>
            <button onClick={() => onRemove(todo.id)}>삭제</button>
        </div>
    );
}

const Todos = ({
    input, // 인풋에 입력되는 텍스트
    todos, // 할 일 목록이 들어 있는 객체
    onChangeInput,
    onInsert,
    onToggle,
    onRemove
}) => {
    const onSubmit = e => {
        e.preventDefault();
        onInsert(input);
        onChangeInput(''); // 등록 후 인풋 초기화
    };
    const onChange = e => onChangeInput(e.target.value);
    return (
        <div>
            <form onSubmit={onSubmit}>
                <input value={input} onChange={onChange} />
                <button type="submit">등록</button>
            </form>
            <div>
                {todos.map(todo => (
                    <TodoItem
                        todo={todo}
                        key={todo.id}
                        onToggle={onToggle}
                        onRemove={onRemove}
                    />
                ))}
            </div>
        </div>
    );
};

export default Todos;