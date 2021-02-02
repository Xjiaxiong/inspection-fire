import React, {useEffect, useState} from 'react'
import {
    Title,
    SubBox,
    ScrollContainer
} from './style'
import { 
    List,
    Picker,
    DatePicker
 } from 'antd-mobile'
import Scroll from '../../baseUI/scroll/index'
import { 
    getSysPatrolDayRequest,
    getPatrolTypeRequest
} from '../../api/request.js'
import { getWrapParams, GetQuery } from '../../api/utils'
import { formatDate, formatDateTomm } from '../../api/constant'
import NoDataTip from '../../components/NoDataTip/index'
import showLoading from 'gdt-jsapi/showLoading'
import hideLoading from 'gdt-jsapi/hideLoading'
import alert from 'gdt-jsapi/alert'

const Item = List.Item
const Brief = Item.Brief;

const PAGE_SIZE = 10;

const PartPatrolRecrod = (props) => {
    const { fproject_uuid } = GetQuery(props.location.search)
    const [dateStart, setDateStart] = useState(new Date())
    const [dateEnd, setDateEnd] = useState(new Date())
    const [fireList, setFireList] = useState([])
    const [pageNum, setPageNum] = useState(0)
    const [patrolTypes, setPatrolTypes] = useState([])
    const [patrolType, setPatrolType] = useState('01')

    useEffect(() => {
        if(fireList.length === 0) {
            getList()
        }
        if(patrolTypes.length === 0) {
            getPatrolType()
        }
        // eslint-disable-next-line
    },[])


    useEffect(() => {
        if(patrolType) {
            getList()
        }
        // eslint-disable-next-line
    },[patrolType,dateStart,dateEnd])

    useEffect(() => {
        if(pageNum>0) {
            getMoreList()
        }
        // eslint-disable-next-line
    },[pageNum])


    const getPatrolType = async () => {
        let res = await getPatrolTypeRequest(getWrapParams())
        if(res && res.code === '1') {
            let arr = res.data.map(item => {
                return {
                    label: item.fdic_name,
                    value: item.fdic_code
                }
            })
            setPatrolTypes(arr)
        }
    }

    const getList = async () => {
        if(!validateDate()) return 
        
        showLoading({text:"数据加载中..."})
        let res = await getSysPatrolDayRequest(getWrapParams({
            pagesize: PAGE_SIZE,
            pagenow: 0, 
            reqtype:"01",  //后端没用，又必传，写死
            filter_time:"202101280000", //后端没用，又必传，写死
            start_time: formatDate(dateStart, 'YYYYMMDD'),
            end_time: formatDate(dateEnd, 'YYYYMMDD'),
            fproject_uuid,
            filter_type: patrolType
        }))
        hideLoading()

        if(res && res.code  === '1') {
            setFireList(res.data)
        }
    }
    const getMoreList = async () => {
        let res = await getSysPatrolDayRequest(getWrapParams({
            pagesize: PAGE_SIZE,
            pagenow: pageNum, 
            reqtype:"01",  //后端没用，又必传，写死
            filter_time:"202101280000", //后端没用，又必传，写死
            start_time: formatDate(dateStart, 'YYYYMMDD'),
            end_time: formatDate(dateEnd, 'YYYYMMDD'),
            fproject_uuid,
            filter_type: patrolType
        }))

        if(res && res.code  === '1') {
            let tmpList = res.data
            setFireList([...fireList, ...tmpList])
        }
    }
    const renderSubBox = (item) => {
        return (
            <SubBox>
                <div>
                    <span>单位:</span>
                    <p>{item.fproject_name}</p>
                </div>
                <div>
                    <span>巡查人:</span>
                    <p>{item.fpratorl_person}</p>
                </div>
                <div>
                    <span>计划巡查时间:</span>
                    <p>{`${formatDateTomm(item.plan_start_time)}至${formatDateTomm(item.plan_end_time)}`}</p>
                </div>
                <div>
                    <span>应巡查:</span>
                    <p>{item.fpratorl_number}</p>
                </div>
                <div>
                    <span>已巡查:</span>
                    <p>{item.fpratorl_finishnumber}</p>
                </div>
                <div>
                    <span>实际巡查时间:</span>
                    <p>{`${formatDateTomm(item.fbegindatetime)}至${formatDateTomm(item.fenddatetime)}`}</p>
                </div>
            </SubBox> 
        )
    }
    const toDetail = fpratorl_code => {
        props.history.push(`/SysPatrolDayDetail?fpratorl_code=${fpratorl_code}`)
    }
    const onPickChange = (val) => {
        setPatrolType(val[0])
    }
    const getParolValue = type => {
        let value = ''
        patrolTypes.map(item => {
            if(item.value === type) {
                value = item.label
            }
            return 1
        })
        return value
    }
    const validateDate = () => {
        let tmpStart = dateStart.getTime();
        let tmpEnd = dateEnd.getTime();
        let gap = tmpEnd - tmpStart
        if( gap < 0 ) {
            alert({
                title:"提示",
                message:"开始时间必须小于结束时间!"
            })
            console.log("开始时间必须小于结束时间!")
            //setDateEnd(new Date())
            return false
        }
        return true 
    }
    return (
        <>
            <Title>筛选条件</Title>
            <List>
                <DatePicker
                    mode="date"
                    format="YYYY-MM-DD"
                    title="开始日期"
                    value={dateStart}
                    onChange={v => setDateStart(v)}>
                    <List.Item arrow="horizontal">开始日期</List.Item>
                </DatePicker>
                <DatePicker                                 
                    mode="date"
                    format="YYYY-MM-DD"
                    title="结束日期"
                    value={dateEnd}
                    onChange={v => setDateEnd(v)}>
                    <List.Item arrow="horizontal">结束日期</List.Item>
                </DatePicker>
                <Picker
                    onChange={(val) => onPickChange(val)} 
                    data={patrolTypes} 
                    cols={1}
                    extra={ getParolValue(patrolType) }>
                    <Item arrow="horizontal" >巡查类型</Item>
                </Picker>
            </List>
            <ScrollContainer> 
                <Scroll 
                    refresh
                    pullUp={() => setPageNum(pageNum+1)}>
                    <List>
                        {
                            fireList.map(item => (
                                <Item
                                    key={item.fpratorl_code}
                                    onClick={() => toDetail(item.fpratorl_code)}
                                    arrow='horizontal'>
                                        {item.fpratorl_name}
                                    <Brief>
                                        {renderSubBox(item)}   
                                    </Brief>
                                </Item>
                            ))
                        }
                    </List>
                    { fireList.length === 0 ? <NoDataTip></NoDataTip> : null }
                </Scroll>   
            </ScrollContainer>       
        </>
    )
}

export default React.memo(PartPatrolRecrod) 