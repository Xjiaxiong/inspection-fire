import React from 'react'
import styled from 'styled-components'
import navTitle from './navigation' 

const Top = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 50px;
    line-height: 50px;
    text-align: center;
    color: #1f1f1f;
    background: #fff;
    align-items: center;
    z-index: 999;
    & > span {
        margin-left: 8px;
        font-size: 18px;
        line-height: 26px;
        font-weight: 700;
        align-content: center;
    }
    & > i {
        position: absolute;
        left: 8px;
        font-size: 24px;
    }
`


function NavigationBar(props) {
    const { pathname } = props
    const goback = () => {
        props.back();
    }
    if(!navTitle[pathname]){
        return null;
    }
    const title = navTitle[pathname];
    return (
        <Top>
            <i className="iconfont" onClick={() => goback()}>&#xe601;</i>
            <span>{title}</span>
        </Top>
    )
}

export default React.memo(NavigationBar)