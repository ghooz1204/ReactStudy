import React from 'react';
import {
    MdCheckBoxOutlineBlank,
    MdCheckBox,
    MdRemoveCircleOutline
} from 'react-icons/md';
import cn from 'classnames';
import './TodoListItem.scss';

/*
    TodoList 컴포넌트로부터 받아온 todo 값에 따라
    제대로 된 UI를 보여줄 수 있도록 조건부 스타일링을 위해
    classnames를 사용하여 컴포넌트를 작성.
*/

const TodoListItem = ({ todo, onRemove, onToggle }) => {
    const { id, text, checked } = todo;
    /*
    ----------Chapter 10.3.3.3----------
        TodoListItem에서 삭제 함수 호출하기

        TodoList 컴포넌트를 거쳐서 props로 받아온 onRemove 함수를
        삭제 버튼 div의 onClick 함수로 등록하여 현재 자신이 가진 id를 넣어서
        삭제 함수를 호출하도록 설정.  
    */

    /*
    ----------Chapter 10.3.4.2----------
        TodoListItem에서 토글 함수 호출하기

        TodoList 컴포넌트를 거쳐서 props로 받아온 onToggle 함수를
        수정 버튼 div의 onClick 함수로 등록하여 현재 자신이 가진 id를 넣어서
        수정 함수를 호출하도록 설정.
    */
    return (
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
    );
};

export default TodoListItem;