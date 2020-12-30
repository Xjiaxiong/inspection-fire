import React from 'react'
import styled from 'styled-components'

export const Container = styled.div`
    padding-top: 50px;
`

function DemoList(props) {
    return (
        <Container>
        </Container>    
    )
}

export default React.memo(DemoList)