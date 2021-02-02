import React, { useEffect, useState } from  'react'
import { Container, BaseInfo } from './style'
import Scroll from '../../baseUI/scroll/index'
import { getWrapParams, GetQuery } from '../../api/utils'
import { _OSS } from '../../api/constant'
import {
    getMiniStationRequest,
    getChargingPileRequest,
    getOutDydrantRequest,
    getCamerasRequest
} from '../../api/request'
import NoDataTip from '../../components/NoDataTip/index'
import alert from 'gdt-jsapi/alert'

const EntityDetail = props => {
    const mType = localStorage.getItem('mType')
    const { fuuid } = GetQuery(props.location.search)
    const [pageData, setPageData] = useState(null)
    useEffect( () => {
        if(!pageData){
            getData()
        }
    },[])
    const getData = async () => {
        let res = null;
        let params = getWrapParams({fuuid})
        if(mType === 'M30') {
            res = await getMiniStationRequest(params)
        }
        if(mType === 'M31') {
            res = await getOutDydrantRequest(params)
        }
        if(mType === 'M32' || mType === 'M36') {
            alert({
                message: "移动端不支持7700视频查看",
                title: "查看失败",
                button:"确定"
            })
            //res = await getCamerasRequest(params)
            // res = {
            //     code:”1”,
            //     "desc":"",
            //     "ret_code":"1",
            //     data:[{
            //     fcameraname:””,//视频名称
            //     fchannelnumber:””,//通道号
            //     fstreamingmediaversion:”VH7700”,//视频流媒体版本号
            //     fcameradeviceId:””,//视频编号
            //     fstreamingmediaport:””,//端口
            //     fstreamingmediaurl:””,//服务地址
            //     fstreamingmediaIp:””,//IP
            //     fusername:””,//用户名
            //     fpassword:””,//密码
            //     }]
            //     }
        }
        if(mType === 'M33') {
            res = await getChargingPileRequest(params)
        }

        if(res && res.code === '1') {
            setPageData(res.data[0])
        }
    }
    const renderDetail = () => {
        if(mType === 'M30') {
            return (<BaseInfo>
                <h1>{pageData.fname}</h1>
                <div className="row">
                    <div className="label">负责人</div>
                    <div className="value">
                        <p>{pageData.fleader}</p>
                    </div>
                </div>
                <div className="row">
                    <div className="label">联系电话</div>
                    <div className="value">
                        <p>{pageData.fphone}</p>
                    </div>
                </div>
                <div className="row">
                    <div className="label">人员</div>
                    <div className="value">
                        <p>{pageData.fperson_list}</p>
                    </div>
                </div>
                <div className="row">
                    <div className="label">地址</div>
                    <div className="value">
                        <p>{pageData.faddress}</p>
                    </div>
                </div>
                <div className="row">
                    <div className="label">装备</div>
                    <div className="value">
                        <p>{pageData.fequipment}</p>
                    </div>
                </div>
            </BaseInfo>)
        }
        if(mType === 'M33') {
            return (
                <BaseInfo>
                    <h1>{pageData.fname}</h1>
                    <div className="row">
                        <div className="label">编码</div>
                        <div className="value">
                            <p>{pageData.fchargpile_code}</p>
                        </div>
                    </div>
                    <div className="row">
                        <div className="label">负责人</div>
                        <div className="value">
                            <p>{pageData.fleader}</p>
                        </div>
                    </div>
                    <div className="row">
                        <div className="label">联系电话</div>
                        <div className="value">
                            <p>{pageData.fphone}</p>
                        </div>
                    </div>
                    <div className="row">
                        <div className="label">地址</div>
                        <div className="value">
                            <p>{pageData.faddress}</p>
                        </div>
                    </div>
                    {
                        pageData.fattach_Link ? (
                            <div className="row">
                                <div className="label">图片</div>
                                <div className="value">
                                    <img src={`${_OSS}${pageData.fattach_Link}`} alt=""/>
                                </div>
                            </div>
                        ) : null
                    }
                </BaseInfo>
            )
        }
        if(mType === 'M31') {
            return (
                <BaseInfo>
                    <h1>{pageData.fname}</h1>
                    <div className="row">
                        <div className="label">编码</div>
                        <div className="value">
                            <p>{pageData.fouthydrant_code}</p>
                        </div>
                    </div>
                    <div className="row">
                        <div className="label">负责人</div>
                        <div className="value">
                            <p>{pageData.fleader}</p>
                        </div>
                    </div>
                    <div className="row">
                        <div className="label">联系电话</div>
                        <div className="value">
                            <p>{pageData.fphone}</p>
                        </div>
                    </div>
                    <div className="row">
                        <div className="label">地址</div>
                        <div className="value">
                            <p>{pageData.faddress}</p>
                        </div>
                    </div>
                    <div className="row">
                        <div className="label">电压</div>
                        <div className="value">
                            <p>{pageData.fflow_cumu}</p>
                        </div>
                    </div>
                    {/* <div className="row">
                        <div className="label">累计流量</div>
                        <div className="value">
                            <p>{pageData.faddress}</p>
                        </div>
                    </div> */}
                    <div className="row">
                        <div className="label">反向累计流量</div>
                        <div className="value">
                            <p>{pageData.fflow_recumu}</p>
                        </div>
                    </div>
                    <div className="row">
                        <div className="label">瞬时流量</div>
                        <div className="value">
                            <p>{pageData.flow_instant}</p>
                        </div>
                    </div>
                    <div className="row">
                        <div className="label">压力</div>
                        <div className="value">
                            <p>{pageData.fpressure}</p>
                        </div>
                    </div>
                    {
                        pageData.fattach_Link ? (
                            <div className="row">
                                <div className="label">图片</div>
                                <div className="value">
                                    <img src={`${_OSS}${pageData.fattach_Link}`} alt=""/>
                                </div>
                            </div>
                        ) : null
                    }
                </BaseInfo>
            )
        }
    }
    return(
        <Container>
            <Scroll>
                <div>
                    { pageData ? renderDetail() : <NoDataTip></NoDataTip>}
                </div>
            </Scroll>    
        </Container>
    )
}

export default React.memo(EntityDetail)