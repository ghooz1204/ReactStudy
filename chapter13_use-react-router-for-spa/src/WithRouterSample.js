import React from 'react';
import { withRouter } from 'react-router-dom';

/*
==========Chapter 13.6.2==========
    withRouter

    withRouter 함수는 'HoC(Higher-order Component)'라고 함.
    라우트로 사용된 컴포넌트가 아니어도 match, location, history 객체를 접근할 수 있게 해줌.

    아래 코드처럼 withRouter를 사용하려면 컴포넌트를 내보내 줄 때 함수로 감싸 줌.
    JSON.stringify의 두 번째 파라미터와 세 번째 파라미터를 위와 같이 null, 2로 설정해 주면
    JSON에 들여쓰기가 적용된 상태로 문자열이 만들어 짐.

    **
        Textarea 크기 조절
        
        브라우저에서 Textarea의 우측 하단 모서리를 드래그하면 Textarea의 크기 조절 가능.
    **

    여기서 나온 match 객체의 결과를 보면 params가 비어있음.
    withRouter를 사용하면 현재 자신을 보여 주고 있는 라우트 컴포넌트(Profiles)를 기준으로 match가 전달 됨.
    Profiles를 위한 라우트를 설정할 때는 path="/profiles" 라고만
    입력했으므로 username 파라미터를 읽어 오지 못 하는 상태.
*/

const WithRouterSample = ({ location, match, history }) => {
    console.log(location, match, history);
    return (
        <div>
            <h4>location</h4>
            <textarea
                value={JSON.stringify(location, null, 2)}
                rows={7}
                readOnly
            />
            <h4>match</h4>
            <textarea
                value={JSON.stringify(match, null, 2)}
                rows={7}
                readOnly
            />
            <h4>history</h4>
            <textarea
                value={JSON.stringify(history, null, 2)}
                rows={7}
                readOnly
            />
        </div>
    );
}

export default withRouter(WithRouterSample);