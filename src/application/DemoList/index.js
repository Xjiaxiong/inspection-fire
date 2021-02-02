
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import PopList from '../../baseUI/popList/index'

export const Container = styled.div`
    padding-top: 50px;
`
const mtype = 'M20'
function DemoList(props) {
    const [alarmShow, setAlarmShow] = useState(false)
    const showList = () => {
        setAlarmShow(true)
    }
    const hidePop = () => {
        setAlarmShow(false)
    }
    return (
        <>
            <button onClick={() => showList()}>click me !</button>
            <PopList 
            mtype={mtype} 
            show={alarmShow}
            hidePop={hidePop}
            ></PopList>    
        </>
    )
}

export default React.memo(DemoList)