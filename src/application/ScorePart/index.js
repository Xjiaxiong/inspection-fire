import React, { useState, useEffect } from 'react'
import {
    Top,
    ScrollContainer,
    List
} from './style'
import Scroll from '../../baseUI/scroll/index'
import { getProjectRank } from '../../api/request'
import { getWrapParams, GetQuery } from '../../api/utils'
import showLoading from 'gdt-jsapi/showLoading'
import hideLoading from 'gdt-jsapi/hideLoading'
const formateDate = date => {
    return `${date.substring(4,6)}-${date.substring(6,8)} ${date.substring(8,10)}:${date.substring(10,12)}:${date.substring(12,14)}`
}
const PAGE_SIZE = 10;
const ScorePart = (props) => {
    const { fsocial_uuid, score } = GetQuery(props.location.search)
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
            flag: '3',
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
            flag: '3',
            page_size:  PAGE_SIZE,
            page_num: pageNow,
            fsocial_id: fsocial_uuid
        }))
        if(res && res.code === '1') {
            let arr = res.data;
            setList([...list,...arr])
        }
    } 
    return (
        <>
            <Top>
                <p>{score}</p>
                <p>当前得分</p>
            </Top>
            <ScrollContainer>
                <Scroll
                    pullUp = {() => setPageNow(pageNow+1)} 
                    refresh>
                    <List>
                        {
                            list.map(item => (
                                <li>
                                    <section>
                                        <div className="title">{item.fdescription}</div>
                                        <div className="desc">
                                            <i className="iconfont">&#xe696;</i>
                                            {formateDate(item.fscore_time)}
                                        </div>
                                    </section>
                                    {
                                        item.fis_deduction === '1' ? <div className="score red">{`-${item.fscore}`}</div> : <div className="score green">{`+${item.fscore}`}</div>
                                    }
                                </li>
                            ))
                        }

                    </List>
                </Scroll>    
            </ScrollContainer>    
        </>
    )
}

export default React.memo(ScorePart)