import React from 'react'
import styled from 'styled-components'

const NoData = styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    text-align: center;
    >i {
        font-size: 60px;
        color: #101010;
    }
    > p {
        font-size: 15px;
        line-height: 32px;
        color: #101010;
        
    }
`


const NoDataTip = (props) => {
    return (
        <NoData>
            <i className='iconfont'>&#xe604;</i>
            <p>{props.children ? props.children : '无数据'}</p>
        </NoData>
    )
}

export default React.memo(NoDataTip)