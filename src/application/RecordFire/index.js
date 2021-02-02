import React, {useEffect, useState} from 'react'
import {
    Title,
    DeteScope,
    SubBox,
    ScrollContainer
} from './style'
import { 
    DatePicker,
    List,
    Picker
 } from 'antd-mobile'
import {
    curDay, 
    formatDateTomm,
    formatDate
} from '../../api/constant'
import Scroll from '../../baseUI/scroll/index'
import { getFireList } from '../../api/request'
import { getWrapParams } from '../../api/utils'
import NoDataTip from '../../components/NoDataTip/index'
import showLoading from 'gdt-jsapi/showLoading'
import hideLoading from 'gdt-jsapi/hideLoading'
import alert from 'gdt-jsapi/alert'

const Item = List.Item
const Brief = Item.Brief;

const socialUnits = [
    {value: "9999", label: '全部'},
    {value: "01", label: '未处理'},
    {value: "02", label: '误报'},
    {value: "03", label: '确认火警'},
]
const fireMap = {
    "9999": "全部",
    "01": "未处理",
    "02": "误报",
    "03": "确认火警"
}

const PAGE_SIZE = 20;
const RecordFire = (props) => {
    const [dateStart, setDateStart] = useState(new Date())
    const [dateEnd, setDateEnd] = useState(new Date())
    const [fireList, setFireList] = useState([])
    const [pageData, setPageData] = useState(null)
    const [fstatus, setFstatus] = useState('9999')
    const [pageNum, setPageNum] = useState(0)

    useEffect(() => {
        if(!pageData) {
            getList()
        }
        // eslint-disable-next-line
    },[])

    useEffect(() => {
        if(dateStart === "" && dateEnd === "" && fstatus ==="99") {
            
        } else {
            getList()
        }
        // eslint-disable-next-line
    },[dateStart,dateEnd,fstatus])

    useEffect(() => {
        if(pageNum>0) {
            getMoreList()
        }
        // eslint-disable-next-line
    },[pageNum])

    


    const getList = async () => {
        if(!validateDate()) return
        showLoading({text:"数据加载中..."})
        let res = await getFireList(getWrapParams({
            begin_time: dateStart ? formatDate(dateStart,'YYYYMMDD') : curDay.replace(/-/g,''),
            end_time: dateEnd ? formatDate(dateEnd,'YYYYMMDD') : curDay.replace(/-/g,''),
            fstate: fstatus,
            page_size: 0,
            page_num: PAGE_SIZE,
        }))
        hideLoading()

        if(res && res.code  === '1') {
            setPageData(res.data[0])
            setFireList(res.data[0].list)
        }
    }
    const getMoreList = async () => {
        let res = await getFireList(getWrapParams({
            begin_time: dateStart ? formatDate(dateStart,'YYYYMMDD') : curDay.replace(/-/g,''),
            end_time: dateEnd ? formatDate(dateEnd,'YYYYMMDD') : curDay.replace(/-/g,''),
            fstate: fstatus,
            page_size: pageNum,
            page_num: PAGE_SIZE,
        }))

        if(res && res.code  === '1') {
            setPageData(res.data[0])
            let tmpList = res.data[0].list
            setFireList([...fireList, ...tmpList])
        }
    }
    const CustomChildren = ({ extra, onClick, children }) => (
        <div onClick={onClick} className='date'>
            {extra}
        </div>
    );
    const renderSubBox = (time, state) => {
        return (
            <SubBox>
                <div>
                    <span>报警时间:</span>
                    <p>{formatDateTomm(time)}</p>
                </div>
                <div>
                    <span>报警类型:</span>
                    <p>{fireMap[state]}</p>
                </div>
            </SubBox> 
        )
    }
    const toDetail = fexc_uuid => {
        props.history.push(`/FireDetail?fexc_uuid=${fexc_uuid}`)
    }
    const onPickChange = (val) => {
        //查询列表
        setFstatus(val[0])
    }
    const validateDate = () => {
        let tmpStart = dateStart.getTime();
        let tmpEnd = dateEnd.getTime();
        let gap = tmpEnd - tmpStart
        if( gap < 0 ) {
            alert({title:"提示",message:"开始时间必须小于结束时间!"})
            console.log("开始时间必须小于结束时间!")
            //setDateEnd(new Date())
            return false
        }
        return true 
    }
    return (
        <>
            <Title>根据时间状态进行筛选</Title>
            <DeteScope>
                    <div className="label">
                        起止日期
                    </div>
                    <div className="right-content">
                        <div className='date-box'>
                            <DatePicker
                                mode="date"
                                format="YYYY-MM-DD"
                                title="开始日期"
                                value={dateStart}
                                onChange={v => setDateStart(v)}
                                extra={curDay}
                                >
                                <CustomChildren></CustomChildren>
                            </DatePicker>
                        </div>
                        <div className='gap-text'>至</div>
                        <div className='date-box'>
                            <DatePicker
                                mode="date"
                                format="YYYY-MM-DD"
                                title="结束日期"
                                value={dateEnd}
                                onChange={v => setDateEnd(v)}
                                extra={curDay}
                                >
                                <CustomChildren></CustomChildren>
                            </DatePicker>
                        </div>
                    </div>
            </DeteScope>
            <List>
                <Picker
                    onChange={(val) => onPickChange(val)} 
                    data={socialUnits} 
                    cols={1}
                    extra={fireMap[fstatus]}>
                    <Item arrow="horizontal" >火警状况</Item>
                </Picker>
            </List>
            <Title>共{(pageData && pageData.fexc_num) || 0}项结果</Title>
            <ScrollContainer>
                <Scroll 
                    refresh
                    pullUp={() => setPageNum(pageNum+1)}>
                    <List>
                        {
                            fireList.map(item => (
                                <Item
                                    key={item.fexc_uuid}
                                    onClick={() => toDetail(item.fexc_uuid)}
                                    arrow='horizontal'>
                                        {item.fexc_name}
                                    <Brief>
                                        {renderSubBox(item.fcome_time,item.fstate)}   
                                    </Brief>
                                </Item>
                            ))
                        }
                    </List>
                    { fireList.length === 0 ? <NoDataTip>无火警数据</NoDataTip> : null }
                </Scroll>   
            </ScrollContainer>        
        </>
    )
}

export default React.memo(RecordFire)