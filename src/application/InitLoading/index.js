import React from 'react'
import LoadingV2 from '../../baseUI/loading-v2'
import styled from 'styled-components';
const Page = styled.div`
    width: 100vw;
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`

const InitLoading = (props) => {
    return (
        <Page>
            <LoadingV2>初始化...</LoadingV2>
        </Page>
    )
}

export default React.memo(InitLoading)