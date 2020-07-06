import React, { useCallback } from 'react';
import { List } from 'react-virtualized';
import TodoListItem from './TodoListItem';
import './TodoList.scss';

/*
==========Chapter 11.7==========
    TodoList 컴포넌트 최적화하기

    리스트에 관련된 컴포넌트를 최적화할 때는 리스트 내부에서 사용하는 컴포넌트도 최적화해야 하고,
    리스트로 사용되는 컴포넌트 자체도 최적화해 주는 것이 좋음.

    아래 최적화 코드는 현재 프로젝트 성능에 전혀 영향을 주지 않음.
    => TodoList 컴포넌트의 부모 컴포넌트인 App 컴포넌트가 리렌더링 되는 유일한 이유가
    todos 배열이 업데이트될 때이기 떄문.

    즉, 지금 TodoList 컴포넌트는 불필요한 리렌더링이 발생하지 않음.

    하지만 App 컴포넌트에 다른 state가 추가되어 해당 값들이 업데이트될 때는 TodoList 컴포넌트가
    불필요한 리렌더링을 할 수도 있음. => 때문에 미리 React.memo를 통해 최적화해 준 것.

    리스트 관련 컴포넌트를 작성할 때는 리스트 아이템과 리스트, 이 두 가지 컴포넌트를 최적화해 주는 것을 잊으면 안 됨.
    그러나 내부 데이터가 100개를 넘지 않거나, 업데이트가 자주 발생하지 않는다면, 이런 최적화 작업을 반드시 해 줄 필요는 없음.
*/

/*
==========Chapter 11.8==========
    react-virtualized를 사용한 렌더링 최적화

    일정 관리 애플리케이션에 초기 데이터가 2,500개 등록되어 있는데,
    실제 화면에 나오는 항목은 아홉 개 뿐임. 나머지는 스크롤해야 볼 수 있음.

    현재 컴포넌트가 맨 처음 렌더링될 때 2,500개 컴포넌트 중 2,491개 컴포넌트는
    스크롤하기 전에는 보이지 않음에도 불구하고 렌더링이 이루어짐. => 이는 꽤 비효율적.
    그리고 나중에 todos 배열에 변동이 생길 때도 TodoList 컴포넌트 내부의 map 함수에서
    배열의 처음부터 끝까지 컴포넌트로 변환해 주는데, 이 중에서 2,491개는 보이지 않으므로 시스템 자원 낭비.

    react-virtualized를 사용하면 리스트 컴포넌트에서 스크롤되기 전에 보이지 않는 컴포넌트는
    렌더링하지 않고 크기만 차지하게끔 할 수 있음.
    그리고 만약 스크롤되면 해당 스크롤 위치에서 보여 주어야 할 컴포넌트를 자연스롭게 렌더링시킴.

    이 라이브러리를 사용하면 낭비되는 자원을 아주 쉽게 아낄 수 있음.

==========Chapter 11.8.1==========
    최적화 준비

    $ yarn add react-virtualized

    react-virtualized에서 제공하는 List 컴포넌트를 사용하여 TodoList 컴포넌트의 성능을 최적화할 것.

    최적하를 수행하려면 사전에 먼저 해야 하는 작업이 있는데, 바로 각 항목의 실제 크기를 px단위로 알아내는 것.
    이 값은 우리가 작성한 CSS를 확인해서 직접 계산해도 되지만, 크롬 개발자 도구의 좌측 상단에 있는
    아이콘을 눌러서 크기를 알고 싶은 항목에 커서를 대면 요소의 크기를 확인할 수 있음.
*/

const NotUsedVirtualizedTodoList = ({ todos, onRemove, onToggle }) => {
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

const TodoList = ({ todos, onRemove, onToggle }) => {
    const rowRenderer = useCallback(
        ({ index, key, style }) => {
            const todo = todos[index];
            return (
                <TodoListItem
                    todo={todo}
                    key={key}
                    onRemove={onRemove}
                    onToggle={onToggle}
                    style={style}
                />
            );
        }, [onRemove, onToggle, todos]
    );
    /*
        List 컴포넌트를 사용하기 위해 rowRenderer라는 함수를 새로 작성해주었음.
        이 함수는 react-virtualized의 List 컴포넌트에서 각 TodoItem을 렌더링할 때 사용하며,
        이 함수를 List 컴포넌트의 props로 설정해 주어야 함.

        이 함수는 파라미터에 index, key, style 값을 객체 타입으로 받아 와서 사용함.

        List 컴포넌트를 사용할 때는
            1. 해당 리스트의 전체 크기,
            2. 각 항목의 높이,
            3. 각 항목을 렌더링할 때 사용해야 하는 함수,
            4. 배열
        을 props로 넣어 주어야 함. 그러면 이 컴포넌트가 전달받은 props를 사용하여 자동으로 최적화해 줌.
    */
    return (
        <List
            className="TodoList"
            width={512} // 전체 크기
            height={513} // 전체 높이
            rowCount={todos.length} // 항목 개수
            rowHeight={57} // 항목 높이
            rowRenderer={rowRenderer} // 항목을 렌더링할 때 쓰는 함수
            list={todos} // 배열
            style={{ outline: 'none' }} // List에 기본 적용되는 outline 스타일 제거
        />
    );
};

export default React.memo(TodoList);
// export default NotUsedVirtualizedTodoList;