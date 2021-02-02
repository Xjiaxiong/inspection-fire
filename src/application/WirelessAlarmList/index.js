import React, { useState, useEffect } from 'react'
import {
    ScrollContainer,
    List
} from './style'
import Scroll from '../../baseUI/scroll/index'
import NoDataTip from '../../components/NoDataTip/index'
import { getWirelessHost } from '../../api/request'
import { getWrapParams, GetQuery } from '../../api/utils'
import { formatDateTomm } from '../../api/constant'
import showLoading from 'gdt-jsapi/showLoading'
import hideLoading from 'gdt-jsapi/hideLoading'

const pageSize = 20;
const wireStatus = {
    "01": "在线",
    "02": "离线",
}
const HistoryInfo = (props) => {
    const { fproject_uuid } = GetQuery(props.location.search)
    const [list, setList] = useState([])
    const [pageNow, setPageNow] = useState(0)

    useEffect(() => {
        if(list.length === 0) {
            getList()
        }
        // eslint-disable-next-line
    },[])
    useEffect(() => {
        if( pageNow > 0 ) {
            getMoreList()
        }
        // eslint-disable-next-line
    },[pageNow])

    const getList = async () => {
        showLoading({text: "加载中..."})
        let res = await getWirelessHost(getWrapParams({
            fproject_uuid,
            pagenow: 0,
            pagesize: pageSize
        }))
        hideLoading()
        if(res && res.code === '1') {
            setList(res.data)
        }
    }
    const getMoreList = async () => {
        showLoading({text: "加载中..."})
        let res = await getWirelessHost(getWrapParams({
            fproject_uuid,
            pagenow: pageNow,
            pagesize: pageSize
        }))
        hideLoading()
        if(res && res.code === '1') {
            let resList = res.data
            setList([...list, ...resList])
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
                                <div className={item.fstatus === '01' ? 'state normal' : 'state abnormal'}>{wireStatus[item.fstatus]}</div>
                                <div className="title">{item.monitorpositon_name}</div>
                                <div className="desc">
                                    <i className="iconfont icon">&#xe623;</i>
                                    <p className="value">
                                        <span>{item.ftransmission_id}</span>
                                    </p>
                                </div>
                                <div className="desc">
                                    <i className="iconfont icon">&#xe638;</i>
                                    <p className="value">
                                        <span>{item.fdeviceclass_uuid}</span>
                                    </p>
                                </div>
                                <div className="desc">
                                    <i className="iconfont icon">&#xe696;</i>
                                    <p className="value">
                                        <span>{formatDateTomm(item.fcome_time)}</span>
                                    </p>
                                </div>
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