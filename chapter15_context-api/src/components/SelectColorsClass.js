import React, { Component } from 'react';
import ColorContext from '../contexts/dynamicColor';

/*
==========Chapter 15.4.2==========
    static contextType 사용하기

    클래스형 컴포넌트에서 Context를 좀 더 쉽게 사용하는 "static contextType"을 정의하는 방법이 있음.

    아래 코드처럼 static contextType 값을 지정해주면
    this.context를 조회했을 때 현재 Context의 value를 가리키게 됨.
    => setColor를 호출하고 싶다면 this.context.actions.setColor를 호출하면 됨.

    static contextType을 정의하면 클래스형 컴포넌트에서도 Context에 넣어 둔 함수를 호출할 수 있다는 장점.
    하지만 한 클래스에서 하나의 Context 밖에 사용하지 못한다는 단점이 있음.(치명적)

    그러나 앞으로 새로운 컴포넌트를 작성할 때 클래스형으로 작성하는 일은 많지 않기 때문에 useContext를 사용할 것.
*/

const colors = ['red', 'orange', 'yellow', 'green', 'blue', 'indigo', 'violet'];

class SelectColorsClass extends Component {
    static contextType = ColorContext;

    handleSetColor = color => {
        this.context.actions.setColor(color);
    }
    handleSetSubcolor = color => {
        this.context.actions.setSubcolor(color);
    }

    render() {
        return (
            <div>
                <h2>색상을 선택하세요.</h2>
                    <div style={{display: 'flex'}}>
                    {colors.map(color =>
                        <div
                            key={color}
                            style={{
                                background: color,
                                width: '24px',
                                height: 24,
                                cursor: 'pointer'
                            }}
                            onClick={() => this.handleSetColor(color)}
                            onContextMenu={e => {
                                e.preventDefault(); // 마우스 오른쪽 버튼 클릭 시 메뉴가 뜨는 것을 무시함.
                                this.handleSetSubcolor(color);
                            }}
                        >
                        </div>
                    )}
                    </div>
                <hr />
            </div>
        )
    }
}

export default SelectColorsClass;