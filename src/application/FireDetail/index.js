import React, { useEffect, useState } from 'react'
import {
    Title,
    Top,
    ScrollContainer,
    ListInfo,
    Modal,
    ScrollBody,
    Footer
} from './style'
import {
    WhiteSpace,
    List,
    Radio,
    TextareaItem,
    Button
} from 'antd-mobile'
import Scroll from '../../baseUI/scroll/index'
import { 
    getFireRecordInfo,
    getWbTypes,
    getComfirmTypes,
    dealFireRequest
 } from '../../api/request'
import { getWrapParams, GetQuery } from '../../api/utils'
import { formatDateTomm } from '../../api/constant'
import showLoading from 'gdt-jsapi/showLoading'
import toast from 'gdt-jsapi/toast'
import hideLoading from 'gdt-jsapi/hideLoading'
import alert from 'gdt-jsapi/alert'

const RadioItem = Radio.RadioItem;
const fireMap = {
    "01": "未处理",
    "02": "误报",
    "03": "确认火警"
}
const FireDetail = (props) => {
    const { fexc_uuid } = GetQuery(props.location.search)
    const [reasonFire, setReasonFire] = useState([])
    const [fireData, setFireData] = useState(null);
    const [fireStatus, setFireStatus] = useState('')
    const [selectReason, setSelectReason] = useState('')
    const [textAareVal, setTextAareVal] = useState('')
    const [changeTextModal, setChangeTextModal] = useState({
        title: '请输入误报原因',
        textAreaTitle: '*误报原因',
        state: '02'
    })
    const [showModal, setShowModal] = useState(false)

    useEffect(() => {
        if(!fireData) {
            initFire()
        }
        // eslint-disable-next-line
    },[])

    const initFire = async () => {
        let res = await getFireRecordInfo(getWrapParams({
            fexc_uuid,
        }))
        console.log("getFireRecordInfo---",res)
        if(res && res.code === '1') {
            setFireData(res.data[0])
            setFireStatus(res.data[0].fstate)
            //以下是没有用到的参数
            //longitude
            //latitude
            //rescue_list:[{
            //    picture_path:”http://menheyoss.oss-cn-hangzhou.al”
            //}]

        }
    }
    const getReasonWB = async () => {
        let res = await getWbTypes(getWrapParams({
            sys_code: "G0708",
            imei:"2",
            fapptype: "3"
        }))
        if(res && res.code === '1') {
            let data = res.data;
            let arr = data.map(item => {
                return {
                    value: item.fdic_code,
                    label: item.fdic_name
                }
            })
            setReasonFire(arr)
        }
    }
    const getReasonComfirm = async () => {
        let res = await getComfirmTypes(getWrapParams({
            fire_uuid: fexc_uuid,
            sys_code: "G0708",
            imei:"2",
            fapptype: "3"
        }))
        if(res && res.code === '1') {
            let data = res.data[0].ffire_scenelist
            let arr = data.map(item => {
                return {
                    value: item.fdic_code,
                    label: item.fdic_name
                }
            })
            setReasonFire(arr)
        }
    }
    const renderFooter = () => {
        let nodes = null;
        if(fireStatus === '01') {
            nodes = (
                <div className="btn-group">
                    <div className="btn left" onClick={() => showRelaModal('02')}>误报</div>
                    <div className="btn right" onClick={() => showRelaModal('03')}>确认</div>
                </div>
            )
        }
        if(fireStatus === '02') {
            nodes = (
                <div className="full-btn" onClick={() => showRelaModal('03')}>重新确认</div>
            )
        }
        if(fireStatus === '03') {
            nodes = (
                <div className="full-btn" onClick={() => toRescueTypeIn()}>救援记录录入</div>
            )
        }
        return nodes
    }
    const showRelaModal = (flag) => {
        if(flag === '02') {
            setChangeTextModal({
                title: '请输入误报原因',
                textAreaTitle: '*误报原因',
                state: '02'
            })
            getReasonWB()
        }
        if(flag === '03') {
            setChangeTextModal({
                title: '请输入确认原因',
                textAreaTitle: '*确认备注',
                state: '03'
            })
            getReasonComfirm()
        }
        setShowModal(true)
    }
    const dealFire = async () => {
        showLoading({text:'处理中...'})
        let params = {
            fdic_code: selectReason,
            subtype: changeTextModal.state,
            uuid: fexc_uuid,
            faudit_desc: textAareVal,
            personname: localStorage.getItem("person_name"),
            latitude: localStorage.getItem("latitude") || "0.000000",
            longitude: localStorage.getItem("longitude") || "0.000000",
            sys_code: "G0708",
            imei:"2",
            fapptype: "3"
        }
        let res = await dealFireRequest(getWrapParams(params))
        hideLoading()
        if(res && res.code === '1') {
            let re = res.data;
            if(re.issuccess === '1') {
                toast({
                    icon:"success",
                    text: re.key,
                    duration: 1.5
                })
                props.history.goBack()
            } else {
                toast({
                    icon:"fail",
                    text: re.key,
                    duration: 1.5
                })
            }
        }
    }
    const toRescueTypeIn = () => {
        alert({
            title: "提示",
            message: "该功能暂时未开放",
            button: "收到"
        })
       // props.history.push(`/RescueIn?fexc_uuid=${fexc_uuid}`)
    }
    const renderFireContent = () => {
        if(fireData && fireData.fstate !== "01") {
            return (                                
                <div>
                    <Title>火警状态信息</Title>
                    <ListInfo>
                        <li>
                            <div className="label">火警状态</div>
                            <div className="value">{fireMap[fireData.fstate]}</div>
                        </li>
                        <li>
                            <div className="label">确认人员</div>
                            <div className="value">{fireData.faudit_name}</div>
                        </li>
                        <li>
                            <div className="label">确认时间</div>
                            <div className="value">{fireData && formatDateTomm(fireData.faudit_datetime)}</div>
                        </li>
                        <li>
                            <div className="label">确认原因</div>
                            <div className="value-long">
                                <p>{fireData && fireData.faduit_desc}</p>
                            </div>
                        </li>
                        <li>
                            <div className="label">位置</div>
                            <div className="map-list"></div>
                        </li>
                    </ListInfo>
                </div>
            )
        }
        return null
    }
    return (
        <>
            <ScrollContainer>
                <Scroll>
                    <div>
                        <WhiteSpace/>
                        <Top>
                            <h1>火警信息</h1>
                            <div className="sub">发生时间: {fireData ? formatDateTomm(fireData.fcome_time): `--`}</div>
                            <p className="desc">
                                {fireData ? fireData.fexc_name : '无告警内容'}
                            </p>
                        </Top>
                        {
                            renderFireContent()
                        }
                    </div>
                </Scroll>
            </ScrollContainer>
            <Footer>
                {
                    renderFooter()
                }
            </Footer>
            <Modal style={{ visibility: showModal ? 'visible' : 'hidden'}}>
                <div className="content" style={{ opacity: showModal ? '1' : '0'}}>
                    <h1>
                        <i className="iconfont" onClick={() => setShowModal(false)}>&#xe61d;</i>
                        <span>{changeTextModal.title}</span>
                    </h1>
                    <ScrollBody>
                        <Scroll refresh>
                            <List>
                                {
                                    reasonFire.map(i => (
                                        <RadioItem 
                                            key={i.value} 
                                            checked={selectReason === i.value} 
                                            onChange={() => setSelectReason(i.value)}>
                                                {i.label}
                                        </RadioItem>
                                    ))
                                }
                            </List> 
                        </Scroll>    
                    </ScrollBody>
                    <List>
                          <TextareaItem
                            title={changeTextModal.textAreaTitle}
                            placeholder="请输入..."
                            rows={5}
                            value={textAareVal}
                            onChange={(val) => setTextAareVal(val)}
                          />          
                    </List>
                    <footer>
                        <div className="btn">
                            <Button type="ghost" onClick={() => setShowModal(false)}>取消</Button>
                        </div>
                        <div className="btn ">
                            <Button type="primary" onClick={() => dealFire()}>确定</Button>
                        </div>
                    </footer>       
                </div>
            </Modal>            
        </>
    )
}

export default React.memo(FireDetail)