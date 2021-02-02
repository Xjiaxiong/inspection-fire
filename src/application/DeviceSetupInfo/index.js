import React, { useState, useEffect } from 'react'
import {
    ScrollContainer,
    Title,
    DisplayRow,
    List,
    DeviceTypes
} from './style'
import Scroll from '../../baseUI/scroll/index'
import NoDataTip from '../../components/NoDataTip/index'
import { getWrapParams, GetQuery } from '../../api/utils'

import { getInstallInformation } from '../../api/request'
import showLoading from 'gdt-jsapi/showLoading'
import hideLoading from 'gdt-jsapi/hideLoading'

const DeviceSetupInfo = (props) => {
    const querys = GetQuery(props.location.search)
    const [pageData, setPageData] = useState(null)
    const [monitors, setMonitors] = useState([])
    const [deviceList, setDeviceList] = useState([])
    useEffect(() => {
        if(!pageData) {
            getPageInfo()
        }
        // eslint-disable-next-line
    },[])
    const getPageInfo = async () => {
        showLoading({text: '加载中...'})
        let res = await getInstallInformation(getWrapParams({
            fproject_uuid: querys.fproject_uuid
        }))
        hideLoading()
        if(res && res.code === '1') {
            let data = res.data;
            setPageData(data)
            setMonitors(data.monitor_list)
            setDeviceList(data.device_list)
        }
    }
    const toDetails = deviceuuid => {
        props.history.push(`/DeviceDetail?deviceuuid=${deviceuuid}&fproject_uuid=${querys.fproject_uuid}`)
    }
    return (
        <ScrollContainer>
            <Scroll>
                <div>
                    <Title>项目信息</Title>
                    <DisplayRow>
                        <div className="item-row">
                            <div className="label">项目名称</div>
                            <div className="value">{pageData && pageData.fproject_name}</div>
                        </div>
                        <div className="item-row">
                            <div className="label">地址</div>
                            <div className="value">{pageData && pageData.faddress}</div>
                        </div>
                        <div className="item-row">
                            <div className="label">经纬度</div>
                            <div className="value">{pageData && `${pageData.flongitude},${pageData.flatitude}`}</div>
                        </div>
                    </DisplayRow>
                    <Title>主机信息</Title>
                    <List>
                        {
                            monitors.length > 0 && monitors.map(item => (
                                <li>
                                    <div className="title">{item.monitor_name}</div>
                                    <div className="desc">
                                        <p>
                                            <div className="label">编号:</div>
                                            <div className="value">
                                                <span>{item.monitor_code}</span>
                                            </div>
                                        </p>
                                        <p>
                                            <div className="label">SIM卡编号:</div>
                                            <div className="value">
                                                <span>{item.mobile_tel}</span>
                                            </div>
                                        </p>
                                    </div>
                                </li>
                            ))
                        }
                    </List>
                    <Title>设备安装信息</Title>
                    <DeviceTypes>
                        {
                            deviceList.map(item => (
                                <li onClick={() => toDetails(item.device_uuid)} key={item.device_uuid}>
                                    <div className="title">{item.device_name}</div>
                                    <div className="right">
                                        <span>{item.device_count}</span>
                                        <i className="iconfont">&#xe600;</i>
                                    </div>
                                </li>
                            ))
                        }
                    </DeviceTypes>    
                </div>
            </Scroll>    
        </ScrollContainer>    
    )
}

export default React.memo(DeviceSetupInfo)