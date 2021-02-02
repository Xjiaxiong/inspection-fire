import React, { useState, useEffect } from 'react'
import {
    ScrollContainer,
    List
} from './style'
import Scroll from '../../baseUI/scroll/index'
import NoDataTip from '../../components/NoDataTip/index'
import { getEquipmentInfo } from '../../api/request'
import { getWrapParams, GetQuery } from '../../api/utils'
import showLoading from 'gdt-jsapi/showLoading'
import hideLoading from 'gdt-jsapi/hideLoading'

const DeviceDetail = (props) => {
    const { deviceuuid, fproject_uuid} = GetQuery(props.location.search)
    const [list, setList] = useState([])
    useEffect(() => {
        if(!list.length) {
            getList()
        }
        // eslint-disable-next-line
    },[])
    const getList = async () => {
        showLoading({text:"加载中..."})
        let res = await getEquipmentInfo(getWrapParams({device_uuid: deviceuuid, fproject_uuid,}))
        hideLoading()
        if(res && res.code === '1') {
            setList(res.data)
        }
    } 
    return (
        <ScrollContainer>
            <Scroll refresh>
                <List>
                    {
                        list.map(item => (
                            <li key={item.uuid}>
                                <div className="title">{item.device_name}</div>
                                <div className="desc">
                                    <span>房客:</span>
                                    {item.link_name?item.link_name:'无'}
                                </div>
                                <div className="desc">
                                    <span>电话:</span>
                                    {item.tel_num?item.tel_num:'无'}
                                </div>
                                <div className="desc">
                                    <span>位置:</span>
                                    {item.user_positon?item.user_positon:'无'}
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

export default React.memo(DeviceDetail)