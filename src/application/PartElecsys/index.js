import React, { useEffect, useState } from 'react'
import {
    Container,
    Content
} from './style'
import Scroll from '../../baseUI/scroll/index'
import { getElecStaRequest } from '../../api/request'
import { getWrapParams, GetQuery } from '../../api/utils'

const PartElecsys = props => {
    const { fproject_uuid } = GetQuery(props.location.search)
    const [pageData, setPageData] = useState(null)

    useEffect(() => {
        if(!pageData) {
            getPageData()
        }
        // eslint-disable-next-line
    },[pageData])

    const getPageData = async () => {
        let res = await getElecStaRequest(getWrapParams({
            fproject_uuid,
            stype:'1'
        }))

        if(res && res.code === '1') {
            setPageData(res.data[0])
        }
    }
    const viewList = (dev_type,fstatus) => {
        props.history.push(`/ElecStatusList?dev_type=${dev_type}&fstatus=${fstatus}`)
    }
    if(!pageData) {
        return(
            <div>
                null
            </div>
        )
    }
    return (
        <Container>
            <Scroll refresh>
                <Content>
                    <div className="top-content">
                        <div className="left-item">
                            <div>
                                <p className="big-font" onClick={() => viewList('0','0')}>{pageData.devicenum}</p>
                                <p className="label">设备总数</p>
                            </div>
                            <div className="lb-item">
                                <div className="count-box">
                                    <p onClick={() => viewList('0','1')}>{pageData.device_online_num}</p>
                                    <p className="label">在线数</p>
                                </div>
                                <div className="count-box">
                                    <p onClick={() => viewList('0','2')}>{pageData.device_offline_num}</p>
                                    <p className="label">离线数</p>
                                </div>
                            </div>
                        </div>
                        <div className="right-item">
                            <div className="circle">
                                <span>{pageData.function_num}</span>
                            </div>
                            <p className="label">系统累计运行天数</p>
                        </div>
                    </div>
                    <div className="devices">
                        <div className="device-wrap">
                            <section>
                                <p onClick={() => viewList('1','0')}>{pageData.miehu_num}</p>
                                <p className="label">灭弧设备数</p>
                            </section>
                            <section >
                                <p onClick={() => viewList('1','3')}>{pageData.miehu_normal_num}</p>
                                <p className="label">正常数</p>
                            </section>
                            <section >
                                <p onClick={() => viewList('1','4')}>{pageData.miehu_err_num}</p>
                                <p className="label red">报警数</p>
                            </section>
                        </div>
                        <div className="device-wrap">
                            <section >
                                <p onClick={() => viewList('2','0')}>{pageData.detection_num}</p>
                                <p className="label">监测设备数</p>
                            </section>
                            <section >
                                <p onClick={() => viewList('2','3')}>{pageData.detection_normal_num}</p>
                                <p className="label">正常数</p>
                            </section>
                            <section >
                                <p onClick={() => viewList('2','4')}>{pageData.detection_err_num}</p>
                                <p className="label red">报警数</p>
                            </section>
                        </div>
                    </div>
                </Content>
            </Scroll>    
        </Container>
    )
}

export default React.memo(PartElecsys)