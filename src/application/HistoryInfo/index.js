import React, { useState, useEffect } from 'react'
import {
    ScrollContainer,
    List
} from './style'
import Scroll from '../../baseUI/scroll/index'
import NoDataTip from '../../components/NoDataTip/index'
import { getProjectMessageList } from '../../api/request'
import { getWrapParams } from '../../api/utils'
import showLoading from 'gdt-jsapi/showLoading'
import hideLoading from 'gdt-jsapi/hideLoading'

const formateDate = date => {
    return `${date.substring(4,6)}-${date.substring(6,8)} ${date.substring(8,10)}:${date.substring(10,12)}`
}
const pageSize = 20;
const HistoryInfo = () => {
    const [list, setList] = useState([])
    const [pageNow, setPageNow] = useState(0);
    useEffect(() => {
        if(!list.length) {
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
        showLoading({text:"加载中..."})
        let res = await getProjectMessageList(getWrapParams({
            pagenow: 0,
            pagesize: pageSize
        }))
        hideLoading()
        if(res && res.code === '1') {
            setList(res.data)
        }
    }
    const getMoreList = async () => {
        let res = await getProjectMessageList(getWrapParams({
            pagenow: pageNow,
            pagesize: pageSize
        }))
        if(res && res.code === '1') {
            setList([...list,...res.data])
        }
    } 
    return (
        <ScrollContainer>
            <Scroll 
            pullUp={() => setPageNow(pageNow+1)}
            refresh>
                <List>
                    {
                        list.map(item => (
                            <li>
                                <div className="icon">
                                    <i className="iconfont">&#xe607;</i>
                                </div>
                                <section>
                                    <div className="title">{item.fmsg_content}</div>
                                    <div className="date">{formateDate(item.date)}</div>
                                </section>
                            </li>
                        ))
                    }
                </List>
                {list.length === 0 ? <NoDataTip></NoDataTip> : null}
            </Scroll>    
        </ScrollContainer>    
    )
}

export default React.memo(HistoryInfo)