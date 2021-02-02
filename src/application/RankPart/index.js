import React, { useEffect, useState } from 'react'
import {
    ScrollContainer,
    List
} from './style'
import Scroll from '../../baseUI/scroll/index'
import NoDataTip from '../../components/NoDataTip/index'
import { getProjectRank } from '../../api/request'
import { getWrapParams, GetQuery } from '../../api/utils'
import showLoading from 'gdt-jsapi/showLoading'
import hideLoading from 'gdt-jsapi/hideLoading'
const PAGE_SIZE = 10;
const ScorePart = (props) => {
    const { fsocial_uuid } = GetQuery(props.location.search)
    const [list, setList] = useState([])
    const [pageNow, setPageNow] = useState(0)
    useEffect(() => {
        if(list.length === 0) {
            getList()
        }
        // eslint-disable-next-line
    },[])
    useEffect(() => {
        if(pageNow > 0) {
            getMoreList()
        }
        // eslint-disable-next-line
    },[pageNow])
    const getList = async () => {
        showLoading({text:"数据加载中..."})
        let res = await getProjectRank(getWrapParams({
            flag: '2',
            page_size: PAGE_SIZE,
            page_num: 0,
            fsocial_id: fsocial_uuid
        }))
        hideLoading()
        if(res && res.code === '1') {
            setList(res.data)
        }
    } 
    const getMoreList = async () => {
        let res = await getProjectRank(getWrapParams({
            flag: '2',
            page_size: PAGE_SIZE,
            page_num: pageNow,
            fsocial_id: fsocial_uuid
        }))
        if(res && res.code === '1') {
            let arr = res.data;
            setList([...list,...arr])
        }
    }   
    return (
        <ScrollContainer>
            <Scroll pullUp = {() => setPageNow(pageNow+1)} 
                    refresh>
                <List>
                    {
                        list.map(item => (
                            <li>
                                <div className="index">{item.rank}</div>
                                <div className="title">{item.fsocial_name}</div>
                                <div className="score">{item.fcurrent_score}</div>
                            </li>
                        ))
                    }
                </List>
                {list.length === 0 ? <NoDataTip></NoDataTip> : null}
            </Scroll>    
        </ScrollContainer>    
    )
}

export default React.memo(ScorePart)