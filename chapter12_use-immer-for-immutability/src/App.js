import React, { useRef, useState, useCallback } from 'react';
import produce from 'immer';

/*
==========Chapter 12==========
  immer를 사용하여 더 쉽게 불변성 유지하기

  전개 연산자와 배열의 내장 함수를 이용하면 간단하게
  배열 혹은 객체를 복사하고 새로운 값을 덮어쓸 수 있음.

  하지만, 객체의 구조가 엄청나게 깊어지면 불변성을 유지하면서 이를 업데이트하는 것이 매우 힘듬.
  Example)
    const object = {
      somewhere: {
        deep: {
          inside: 3,
          array: [1, 2, 3, 4]
        },
        bar: 2
      },
      foo: 1
    };

    // somewhere.deep.inside 값을 4로 바꾸기
    let nextObject = {
      ...object,
      somewhere: {
        ..object.somewhere,
        deep: {
          ...object.somewhere.deep,
          inside: 4
        }
      }
    };

    // somewhere.deep.array에 5 추가하기
    let nextObject = {
      ...object,
      somewhere: {
        ..object.somewhere,
        deep: {
          ...object.somewhere.deep,
          array: object.somewhere.deep.array.concat(5)
        }
      }
    };

  위처럼 값 하나를 업데이트하기 위해 코드를 열 줄 정도 작성해야 함.
  이렇게 전개 연산자와 배열 내장 함수를 자주 사용한 것은 기존에 가지고 있던 다른 값은 유지하면서 원하는 값을 새로 저장하기 위함.
  하지만 전개 연산자와 배열 내장 함수를 자주 사용하는 것은 꽤나 번거로운 작업이고, 가독성 또한 좋지 않음.

  이럴 때 immer이라는 라이브러리를 사용하면, 구조가 복잡한 객체도
  매우 쉽고 짧은 코드를 사용하여 불변성을 유지하면서 업데이트해 줄 수 있음.

==========Chapter 12.1==========
  immer를 설치하고 사용법 알아보기

  $ yarn add immer
  명령어를 통해 immer 라이브러리를 설치함.

==========Chapter 12.1.3==========
  immer 사용법

  import produce from 'immer';
  const nextState = produce(originalState, draft => {
    // 바꾸고 싶은 값 바꾸기
    draft.somewhere.deep.inside = 5;
  });

  produce라는 함수는 두 가지 파라미터를 받음.
  첫 번째 파라미터는 수정하고 싶은 상태,
  두 번째 파라미터는 상태를 어떻게 업데이트할지 정의하는 함수.

  두 번째 파라미터로 전달되는 함수 내부에서 원하는 값을 변경하면, produce 함수가 불변성 유지를 대신해 주면서 새로운 상태를 생성.
  
  이 라이브러리의 핵심은 '불변성에 신경 쓰지 않는 것처럼 코드를 작성하되 불변성 관리는 제대로 해주는 것.'
  단순히 깊은 곳이 위치하는 값을 바꾸는 것 외에 배열을 처리할 때도 매우 쉽고 편함.
  Example)
    import produce from 'immer';

    const originalState = [
      {
        id: 1,
        todo: '전개 연산자와 배열 내장 함수로 불변성 유지하기',
        checked: true
      },
      {
        id: 2,
        todo: 'immer로 불변성 유지하기',
        checked: false
      }
    ];

    const nextState = produce(originalState, draft => {
      // id가 2인 항목의 checked 값을 true로 설정
      const todo = draft.find(t => t.id === 2); // id로 항목 찾기
      todo.checked = true;
      // 혹은 draft[1].checked = true;

      // 배열에 새로운 데이터 추가
      draft.push({
        id: 3,
        todo: '일정 관리 앱에 immer 적용하기',
        checked: false
      });

      // id = 1인 항목을 제거하기
      draft.splice(draft.findIndex(t => t.id === 1), 1);
    });
*/

const App = () => {
  const nextId = useRef(1);
  const [form, setForm] = useState({ name: '', username: '' });
  const [data, setData] = useState({
    array: [],
    uselessValue: null
  });

  /* 
  ==========Chapter 12.1.4==========
    App 컴포넌트에 immer 적용하기

    immer를 사용하여 컴포넌트 상태를 작성할 때는 객체 안에 있는 값을 직접 수정하거나,
    배열에 직접적인 변화를 일으키는 push, splice 등의 함수를 사용해도 무방.
    => 불변성 유지에 익숙하지 않아도 자바스크립트에 익숙하다면 컴포넌트 상태에 원하는 변화를 쉽게 반영시킬 수 있음.

    immer를 사용한다고 해서 무조건 코드가 간결해지지는 않음.
    onRemove의 경우 배열 내장 함수 filter를 사용하는 것이 코드가 더 깔끔하므로, 굳이 immer를 사용할 필요가 없음.

    immer는 불변성을 유지하는 코드가 복잡할 때만 사용해도 충분함!
  */
  // input 수정을 위한 함수
  const onChange = useCallback(
    e => {
      const { name, value } = e.target;
      setForm(
        // { ...form, [name]: [value] } // not used immer
        
        // produce(form, draft => { draft[name] = value }) // not function update
        produce(draft => {
          draft[name] = value
        })
      );
    },
    // [form]
    []
  );
  // form 등록을 위한 함수
  const onSubmit = useCallback(
    e => {
      e.preventDefault();
      const info = {
        id: nextId.current,
        name: form.name,
        username: form.username
      };

      // array에 새 항목 등록
      setData(
        // { ...data, array: data.array.concat(info) } // not used immer
        
        // produce(data, draft => { draft.array.push(info); }) // not function update
        produce(draft => {
          draft.array.push(info);
        })
      );

      // form 초기화
      setForm({
        name: '',
        username: ''
      });
      nextId.current += 1;
    },
    // [data, form.name, form.username]
    [form.name, form.username]
  );
  // 항목을 삭제하는 함수
  const onRemove = useCallback(
    id => {
      setData(
        // { ...data, array: data.array.filter(info => info.id !== id) } // not used immer

        // produce(data, draft => { draft.array.splice(draft.array.findIndex(info => info.id === id), 1) }) // not function update
        produce(draft => {
          draft.array.splice(draft.array.findIndex(info => info.id === id));
        })
      );
    },
    // [data]
    []
  );

  /*
  ==========Chapter 12.1.5==========
    useState의 함수형 업데이트와 immer 함께 쓰기

    함수형 업데이트 Example)
      const [number, setNumber] = useState(0);
      // prevNumbers는 현재 number 값을 가리킵니다.
      const onIncrease = useCallback(
        () => setNumber(prevNumber => prevNumber + 1),
        []
      );

    immer에서 제공하는 produce 함수를 호출할 때, 첫 번째 파라미터가 함수 형태라면 업데이트 함수를 반환.
    Example)
      const update = (draft => {
        draft.value = 2;
      });
      const originalState = {
        value = 1,
        foo: 'bar'
      };
      const nextState = update(originalState);
      console.log(nextState); // { value: 2, foo: 'bar' }
    
    이러한 immer의 속성과 useState의 함수형 업데이트를 함께 활용하면 코드를 더욱 깔끔하게 만들 수 있음.
  */

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          name="username"
          placeholder="아이디"
          value={form.username}
          onChange={onChange}
        />
        <input
          name="name"
          placeholder="이름"
          value={form.name}
          onChange={onChange}
        />
        <button type="submit">등록</button>
      </form>
      <div>
        <ul>
          {data.array.map(info => (
            <li key={info.id} onClick={() => onRemove(info.id)}>
              {info.username} ({info.name})
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;

/*
==========Chapter 12.2==========
  정리

  이 라이브러리는 컴포넌트의 상태 업데이트가 조금 까다로울 때 사용하면 매우 좋음.
  추후 상태 관리 라이브러리인 리덕스를 배워서 사용할 때도 immer를 쓰면 코드를 매우 쉽게 작성 가능.
  
  이러한 라이브러리는 편의를 위한 것이므로 꼭 필요하지는 않지만, 사용한다면 생산성을 크게 높일 수 있음.
  만약 immer를 사용하는 것이 오히려 불편하게 느껴진다면 사용하지 않아도 좋음.
*/