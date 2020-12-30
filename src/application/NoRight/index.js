import React from 'react'
import styled from 'styled-components';
import mainImg from './no-right.png'
const Page = styled.div`
    width: 100vw;
    height: 80vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    &>img {
        width: 200px;
        height: 200px;
        margin-bottom:30px;
    }
    .first {
        font-size: 26px;
        color: #3296FA;
        margin-bottom: 30px;
    }
    .second {
        font-size: 14px;
        color: rgba(31, 31, 31, 0.65);
    }
`

const NoRight = (props) => {
    return (
        <Page>
            <img src={mainImg} alt=""/>
            <p className="first">对不起,您暂无权限访问</p>
            <p className="second">请联系管理员分配权限</p>
        </Page>
    )
}

export default React.memo(NoRight)