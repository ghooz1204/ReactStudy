import React from 'react';
import styled from 'styled-components';

/*
==========Chapter 14.4==========
    뉴스 뷰어 UI 만들기

    styled-components를 사용하여 뉴스 정보를 보여 줄 컴포넌트 제작.

    $ yarn add styled-components
    명령어를 통해 styled-components 모듈을 다운로드.

==========Chapter 14.4.1==========
    NewsItem 만들기

    뉴스 데이터에는 source, author, title, description, url, urlToImage, publishedAt, content의 필드가 있고.
    그 중 title(제목), description(내용), url(링크), urlToImage(뉴스 이미지) 필드를 리액트 컴포넌트에 나타냄.

    NewsItem 컴포넌트는 article이라는 객체를 props로 통째로 받아 와서 사용.
*/

const NewsItemBlock = styled.div`
    display: flex;
    .thumnail {
        margin-right: 1rem;
        img {
            display: block;
            width: 160px; height: 100px;
            object-fit: cover;
        }
    }

    .contents {
        h2 {
            margin: 0;
            a {
                color: black;
            }
        }
        p {
            margin: 0;
            line-height: 1.5;
            margin-top: 0.5rem;
            white-space: normal;
        }
    }

    & + & {
        margin-top: 3rem;
    }
`;

const NewsItem = ({ article }) => {
    const { title, description, url, urlToImage } = article;
    return (
        <NewsItemBlock>
            {urlToImage && (
                <div className="thumnail">
                    <a href={url} target="_blank" rel="noopener noreferrer">
                        <img src={urlToImage} alt="thumnail" />
                    </a>
                </div>
            )}
            <div className="contents">
                <h2>
                    <a href={url} target="_blank" rel="noopener noreferrer">
                        {title}
                    </a>
                </h2>
                <p>{description}</p>
            </div>
        </NewsItemBlock>
    );
}

export default NewsItem;