import React, { useState } from 'react'
import styled from 'styled-components'
import { Button} from 'antd-mobile'
import { inAction, deAction} from './store'

//连接器的引用
import { connect } from 'react-redux'

const Header = styled.div`
    color: red;
    font-size: 24px;
`
const NumCount = styled.div`
    color: red;
    font-size: 18px;
    padding: 10px;
    
`

const Demo = (props) => {
    const { count }  = props
    const { inActionDispatch, deActionDispatch}  = props
    return (
        <>
            <Header>redux的计数器例子</Header>
            <NumCount>{count}</NumCount>
            <Button onClick={() => inActionDispatch()}>增加</Button>
            <Button onClick={() => deActionDispatch()}>减少</Button>
        </>
    )
}

// 映射 Redux 全局的 state 到组件的 props 上
const mapStateToProps = state => ({
    count: state.getIn (['demo', 'count'])
});

// 映射 dispatch 到 props 上
const mapDispatchToProps = dispatch => {
    return {
      inActionDispatch() {
        dispatch(inAction());
      },
      deActionDispatch() {
        dispatch(deAction());
      }
    }
};

export default connect(mapStateToProps,mapDispatchToProps)(React.memo(Demo))

