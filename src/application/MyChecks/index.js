import React, { useEffect, useState } from 'react'
import { 
    Container,
    MyListContainer,
    Extra,
} from './style'
import { 
    WhiteSpace,
    List,
    Toast
 } from 'antd-mobile';
import Scroll from '../../baseUI/scroll/index'
import { getPatrolDataListSelfRequest } from '../../api/request'
import { getWrapParams,GetQuery } from '../../api/utils'
import showLoading from 'gdt-jsapi/showLoading'
import hideLoading from 'gdt-jsapi/hideLoading'

function PatrolRecord(props) {
    const { params } = GetQuery(props.location.search)
    const [recordCounts, setRecordCounts] = useState([]); 
    useEffect(() => {
        getRecordCount();
        // eslint-disable-next-line
    },[])

    const getRecordCount = async () => {
        showLoading({text:'数据查询中...'})
        let myParams = JSON.parse(params)
        let res = await getPatrolDataListSelfRequest(getWrapParams(myParams)).catch((e) => {
            Toast.fail('查询失败')
            console.log('获取巡查记录失败', e)
        })
        hideLoading()
        if(res.code === "1") {
            setRecordCounts(res.data)
        } 

    }
    const renderExtra = props => (
        <Extra>
            <span>{props}</span>次
        </Extra>    
    )
    const doLink = (fsocialtype) => {
        props.history.push(`/PatrolDetailSelf?params=${params}&fsocialtype=${fsocialtype}`)
    }
    const renderList = () => {
        if(recordCounts.length === 0) {
            return null
        }
        return (
            <List>
                {
                    recordCounts.map( item => (
                        <List.Item
                            key={item.fsocialtype} 
                            arrow="horizontal"
                            onClick={() => doLink(item.fsocialtype)}
                            extra={renderExtra(item.count_num)}>
                            {item.fmodename}
                        </List.Item>  
                    ))
                }
            </List>
        )
    }
    return (
        <Container>
            <WhiteSpace/>
            <MyListContainer height={'20px'}>
                <Scroll
                    pullUp={ () => {} }
                    pullDown = { () => {} }
                    pullUpLoading = {false}
                    pullDownLoading = {false}
                    onScroll={ () => {}}
                    refresh>
                    { renderList() }
                </Scroll>
            </MyListContainer> 
        </Container>
    )
}

export default React.memo(PatrolRecord)