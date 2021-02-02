import React, { useEffect, useState } from 'react'
import styled from 'styled-components'

import { List } from 'antd-mobile'
import { getPowerStatusListRequest } from '../../api/request'
import { getWrapParams, GetQuery } from '../../api/utils'
import Scroll from  '../../baseUI/scroll/index'
import NoDataTip from '../../components/NoDataTip/index'
import iconNormal from '../../assets/imgs/normal.png'
import iconAbnormal from '../../assets/imgs/abnormal.png'
import showLoading from 'gdt-jsapi/showLoading'
import hideLoading from 'gdt-jsapi/hideLoading'

const ScrollContainer = styled.div`
    position: fixed;
    top: 0;
    bottom: 0;
    width: 100%;
    .offline {
        color: #ccc
    }
    .online {
        color: #15BC83
    }
`
const ListItem = List.Item;
const Brief = ListItem.Brief;
const PAGE_SIZE = 10;
const CheckTypes = (props)=> {
//   "dev_type":0:设备, 1: 灭弧, 2：检测
//   "fstatus":0:总数, 1:在线, 2:离线, 3：正常, 4：异常
    const {dev_type, fstatus } = GetQuery(props.location.search)
    const [list, setList] = useState([])
    const [pageNow,setPageNow] = useState(0)
    useEffect(() => {
        if(list.length === 0) {
            getlist()
        }
        // eslint-disable-next-line
    },[list])
    useEffect(() => {
        if(pageNow >  0) {
            getMorelist()
        }
        // eslint-disable-next-line
    },[pageNow])

    const getlist = async () => {
        showLoading({text: "数据加载中..."})
        let res = await getPowerStatusListRequest(getWrapParams({
            dev_type,
            fstatus,
            pagesize: PAGE_SIZE,
            pagenow:"0",
            stype:"01",
        }))
        hideLoading()
        if(res && res.code === '1') {
            setList(res.data)
        }
    }
    const getMorelist = async () => {
        let res = await getPowerStatusListRequest(getWrapParams({
            dev_type,
            fstatus,
            pagesize: PAGE_SIZE,
            pagenow:pageNow,
            stype:"01",
        }))
        if(res && res.code === '1') {
            let arr = res.data;
            setList(...list,...arr)
        }
    }
    const handleClick = (fpowerdev_uuid,fmonitor_id) => {
        //下探业务
    }
    return (
        <ScrollContainer>
            <Scroll
            pullDown={()=> {console.log('下拉')}} 
            pullUp={() => setPageNow(pageNow+1)} 
            refresh>
                <div>
                    <List>
                        {
                            list.map(item => (
                                <ListItem
                                    key={item.fpowerdev_uuid}
                                    thumb={<img src={item.fstatus==='01'?iconNormal:iconAbnormal} alt="" width='32' height='32'/>}
                                    multipleLine
                                    wrap 
                                    arrow='horizontal'
                                    extra={item.fon_line === '1' ? <span className="online">{'在线'}</span> : <span className="offline">{'在线'}</span>} 
                                    onClick={() => handleClick(item.fpowerdev_uuid,item.fmonitor_id)}>
                                        {item.fpowerdev_name ? item.fpowerdev_name : '无'}
                                        <Brief>{`${item.fbuild}幢${item.ffloor}层${item.fpostion}`}</Brief>
                                </ListItem>
                            ))
                        }
                    </List>
                    {list.length ===0 ? <NoDataTip></NoDataTip> : null }   
                </div>
            </Scroll>    
        </ScrollContainer>
    )
}

export default React.memo(CheckTypes)