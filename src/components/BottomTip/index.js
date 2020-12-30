import React from 'react'
import styled from 'styled-components'
import globalStyle from '../../assets/global-style'

const Bottom = styled.div`
    display: flex;
    align-items: center;
    > p {
        font-size: 14px;
        line-height: 32px;
        color: #101010;
        text-align: center;
        padding: 0 8px;
    }
    .line {
        border-top: 1px solid ${globalStyle['border-color0']};
        flex: 1;
    }
`


const BottomTip = (props) => {
    return (
        <Bottom>
            <div className='line'></div>
            <p>{props.children ? props.children : '已经是最底部了！'}</p>
            <div className='line'></div>
        </Bottom>
    )
}

export default React.memo(BottomTip)