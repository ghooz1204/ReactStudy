import React from 'react';
import {
    MdCheckBoxOutlineBlank,
    MdCheckBox,
    MdRemoveCircleOutline
} from 'react-icons/md';
import cn from 'classnames';
import './TodoListItem.scss';

/*
==========Chapter 11.4==========
    React.memo를 사용하여 컴포넌트 성능 최적화

    컴포넌트의 리렌더링을 방지할 때는 shouldComponentUpdate라는 라이프사이클을 사용하면 되지만,
    함수형 컴포넌트에서는 라이프사이클을 사용할 수 없음.
    그 대신 React.memo라는 함수를 사용함.

    컴포넌트의 props가 바뀌지 않았다면, 리렌더링하지 않도록 설정하여
    함수형 컴포넌트의 리렌더링 성능을 최적화해 줄 수 있음.

    React.memo의 사용법은 매우 간단한데 컴포넌트를 만들고 나서 감싸주기만 하면 됨.
*/

/*
==========Chapter 11.8.3==========
    TodoListItem 수정

    TodoList를 저장하고 나면 스타일이 깨져서 나타남.
    이를 다음과 같이 수정하면 해결 됨.
*/
const TodoListItem = ({ todo, onRemove, onToggle, style }) => {
    const { id, text, checked } = todo;
    return (
        <div className="TodoListItem-virtualized" style={style}>
            <div className="TodoListItem">
                <div className={cn('checkbox', { checked })}
                    onClick={() => onToggle(id)}>
                    {checked ? <MdCheckBox /> : <MdCheckBoxOutlineBlank />}
                    <div className="text">{text}</div>
                </div>
                <div className="remove">
                    <MdRemoveCircleOutline onClick={() => onRemove(id)}/>
                </div>
            </div>
        </div>
    );
};

/*
    render 함수에서 기존에 보여 주던 내용을 div로 한 번 감싸고,
    해당 div에는 TodoListItem-virtualized라는 className을 설정하고,
    props로 받아온 style을 적용시켜 주었음.

    여기서 TodoListItem-virtualized라는 클래스를 만든 것은 컴포넌트 사이사이에 테두리를 제대로 쳐 주고,
    홀수 번째/짝수 번째 항목에 다른 배경 색상을 설정하기 위함.
*/

export default React.memo(
    TodoListItem,
    (prevProps, nextProps) => prevProps.todo === nextProps.todo
); // todo, onRemove, onToggle이 바뀌지 않으면 리렌더링을 하지 않음.

// export default TodoListItem;