import React, { useEffect } from 'react'
import styled from 'styled-components'
import { getUserByAuthMock } from '../../api/request'

export const Container = styled.div`
    padding-top: 50px;
`

function DemoList(props) {
    useEffect(() => {
        test()
    },[])
    const test = async () => {
        let res = await getUserByAuthMock();
        console.log(res);
    }
    return (
        <Container>
            测试页面
        </Container>    
    )
}

export default React.memo(DemoList)