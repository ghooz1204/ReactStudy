import React from 'react';
import { ColorConsumer } from '../contexts/dynamicColor';

/*
==========Chapter 15.3.3==========
    색상 선택 컴포넌트 만들기

    해당 SelectColors에서 마우스 왼쪽 버튼을 클릭하면 큰 정사각형의 색상을 변경하고,
    마우스 오른쪽 버튼을 클릭하면 작은 정사각형의 색상을 변경하도록 구현.

    마우스 오른쪽 버튼 클릭 이벤트는 "onContextMenu"를 사용하면 됨.
    이때, 오른쪽 클릭 시 원래 브라우저 메뉴가 나타나지만, e.preventDefault()를 호출하면 메뉴가 뜨지 않음.
*/

const colors = ['red', 'orange', 'yellow', 'green', 'blue', 'indigo', 'violet'];

const SelectColors = () => {
    return (
        <div>
            <h2>색상을 선택하세요.</h2>
            <ColorConsumer>
                {({ actions }) => (
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
                            onClick={() => actions.setColor(color)}
                            onContextMenu={e => {
                                e.preventDefault(); // 마우스 오른쪽 버튼 클릭 시 메뉴가 뜨는 것을 무시함.
                                actions.setSubcolor(color);
                            }}
                        >
                        </div>
                    )}
                    </div>
                )}                
            </ColorConsumer>
            <hr />
        </div>
    );
}

export default SelectColors;