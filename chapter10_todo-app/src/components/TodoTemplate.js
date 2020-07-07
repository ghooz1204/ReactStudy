import React from 'react';
import './TodoTemplate.scss';

/*
==========Chapter 10.2==========
    UI 구성하기

    앞으로 만들 컴포넌트는
    1. TodoTemplate:
        화면을 가운데에 정렬시켜 주며, 앱 타이틀(일정 관리)을 보여 줌.
        children으로 내부 JSX를 props로 받아 와서 렌더링해 줌.
    2. TodoInsert:
        새로운 항목을 입력하고 추가할 수 있는 컴포넌트.
        state를 통해 인풋의 상태를 관리함.
    3. TodoListItem:
        각 할 일 항목에 대한 정보를 보여 주는 컴포넌트.
        todo 객체를 props로 받아와서 상태에 따라 다른 스타일의 UI를 보여줌.
    4. TodoList:
        todos 배열을 props로 받아 온 후, 이를 배열 내장 함수 map을 사용해서
        여러 개의 TodoListItem 컴포넌트로 변환하여 보여줌.

    이렇게 총 네 개의 컴포넌트를 src 디렉터리에 components라는 디렉터리를 생성하여 그 안에 저장.
    컴포넌트 파일을 components 디렉터리에 넣는 이유는 기능이나 구조 상
    필요하기 때문이 아니라 자주 사용되는 관습이기 때문.

==========Chapter 10.2.1==========
    TodoTemplate 만들기

    컴포넌트를 App.js를 불러오는 과정에 import를 넣지 않고 바로 컴포넌트를 사용하려고 하면
    VS Code 에디터에서 자동 완성 기능이 나타날 것임.

    그러나 TodoTemplate.js 컴포넌트가 VS Code에서 다른 탭으로 열려 있지 않으면 자동 완성이 작동하지 않음.
    닫혀 있는 파일에도 자동 완성이 제대로 작동하려면 프로젝트 최상위 디렉터리에 jsconfig.json 파일을 만들고,
    {
        "compilerOptions": {
            "target": "es6"
        }
    }
    위와 같이 내용을 작성하면 됨.

*/

const TodoTemplate = ({ children }) => {
    return (
        <div className="TodoTemplate">
            <div className="app-title">일정관리</div>
            <div className="content">{children}</div>
        </div>
    );
};

export default TodoTemplate;