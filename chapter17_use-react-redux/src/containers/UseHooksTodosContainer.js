import React, { useCallback } from 'react';
import Todos from '../components/Todos';
import { useSelector, useDispatch } from 'react-redux';
import { changeInput, insert, toggle, remove } from '../modules/useImmerTodos';
import useActions from '../lib/useActions';

/*
==========Chapter 17.7.3==========
    useStore를 사용하여 리덕스 스토어 사용하기

    useStore Hooks를 사용하면 컴포넌트 내부에서 리덕스 스토어 객체를 직접 사용할 수 있음.
    * 사용법:
        const store = useStore();
        store.dispatch({ type: 'SAMPLE_ACTION' });
        store.getState()

    useStore는 컴포넌트에서 정말 어쩌다가 스토어에 직접 접근해야 하는 상황에만 사용해야 함.
    이를 사용하는 상황은 흔치 않을 것.

==========Chapter 17.7.4==========
    TodosContainer를 Hooks로 전환하기

    useSelector를 사용할 때 비구조화 할당 문법 활용.
    또한, useDispatch를 사용할 때 각 액션을 디스패치하는 함수를 만들었는데,
    아래 코드의 경우 액션의 종류가 많은데 어떤 값이 액션 생성 함수의 파라미터로 사용되어야 하는지 일일이 명시해 주어야 하므로 번거로움.
*/

const TodosContainer = () => {
    const { input, todos } = useSelector(({ todos }) => ({
        input: todos.input,
        todos: todos.todos
    }));
    // const dispatch = useDispatch();
    // const onChangeInput = useCallback(input => dispatch(changeInput(input)), [dispatch]);
    // const onInsert = useCallback(text => dispatch(insert(text)), [dispatch]);
    // const onToggle = useCallback(id => dispatch(toggle(id)), [dispatch]);
    // const onRemove = useCallback(id => dispatch(remove(id)), [dispatch]);
    const [onChangeInput, onInsert, onToggle, onRemove] = useActions(
        [changeInput, insert, toggle, remove],
        []
    );
    return (
        <Todos
            input={input}
            todos={todos}
            onChangeInput={onChangeInput}
            onInsert={onInsert}
            onToggle={onToggle}
            onRemove={onRemove}
        />
    );
};

/*
==========Chapter 17.7.6==========
    connect 함수와의 주요 차이점

    앞으로 컨테이너 컴포넌트를 만들 때 connect 함수를 사용해도 좋고, useSelector와 useDispatch를 사용해도 좋음.
    리덕스 관련 Hook이 있다고 해서 기존 connect 함수가 사라지는 것은 아니므로 더 편한 것을 사용하면 됨.

    하지만 Hooks를 사용하여 컨테이너 컴포넌트를 만들 때 잘 알아 두어야 할 차이점이 있음.

    connect 함수를 사용하여 컨테이너 컴포넌트를 만들었을 경우, 해당 컨네이너 컴포넌트의 부모 컴포넌트가 리렌더링될 때
    해당 컴포넌트의 props가 바뀌지 않았다면 리렌더링이 자동으로 방지되어 성능이 최적화 됨.

    반면 useSelector를 사용하여 리덕스 상태를 조회했을 때는 이 최적화 작업이 자동으로 이루어지지 않으므로,
    성능 최적화를 위해서는 React.memo를 컨테이너 컴포넌트에 사용해 주어야 함.

    물론 지금과 같은 경우에는 TodosContainer의 부모 컴포넌트인 App 컴포넌트가 리렌더링되는 일이 없으므로 불필요한 성능 최적화
*/

// export default TodosContainer;
export default React.memo(TodosContainer);