import { createContext } from 'react';

/*
==========Chapter 15.2==========
    Context API 사용법 익히기

==========Chapter 15.2.1==========
    새 Context 만들기

    새 Context를 만들 때는 createContext 함수를 사용하며,
    파라미터에는 해당 Context의 기본 상태를 지정함.
*/

const ColorContext = createContext({ color: 'black' });

export default ColorContext;