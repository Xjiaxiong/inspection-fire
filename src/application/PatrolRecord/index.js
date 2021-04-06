import React, { useEffect, useState } from 'react'
import { 
    Container,
    TabsBox,
    MyListContainer,
    Extra,
    DeteScope
} from './style'
import { 
    WhiteSpace,
    Tabs,
    Picker,
    List,
    Button,
    DatePicker,
    Toast
 } from 'antd-mobile';
import Scroll from '../../baseUI/scroll/index'
import {
    curMonth, 
    curDay, 
    months,
    formatQueryDate
} from '../../api/constant'
import '../../api/config'
import { getPatrolRecordRequest } from '../../api/request'
import { getWrapParams } from '../../api/utils'
import showLoading from 'gdt-jsapi/showLoading'
import hideLoading from 'gdt-jsapi/hideLoading'

function PatrolRecord(props) {
    const [contentIndex, setContentIndex] = useState(global.constans.tabStatePatrol)
    const [selectMonth, setSelectMonth] = useState([curMonth])
    const [dateStart, setDateStart] = useState('')
    const [dateEnd, setDateEnd] = useState('')
    const [recordCounts, setRecordCounts] = useState([]); 
    const tabs = [
        { title: '最近两周' },
        { title: '按月份' },
        { title: '自定义' },
    ];
    const handleChange = (data,index) => {
        global.constans.tabStatePatrol = index
        setContentIndex(index)
    }
    const onChangeMonth = v => {
        setSelectMonth(v)
    }
    useEffect(() => {
        getRecordCount();
        // eslint-disable-next-line
    },[contentIndex,selectMonth])

    const getRecordCount = async () => {
        let parmas = {
             "flag":"1",
        }
        if(contentIndex === 1) {
            parmas = {
                "flag":"2",
                "moth": selectMonth[0]
            }
        }
        if(contentIndex === 2) {
            parmas = {
                 "begin_time": dateStart ? formatQueryDate(dateStart) : curDay.replace(/-/g,''),
                 "end_time": dateEnd ? formatQueryDate(dateEnd) : curDay.replace(/-/g,''),
            }
        }
        showLoading({text:'数据查询中...'})
        let res = await getPatrolRecordRequest(getWrapParams(parmas)).catch((e) => {
            Toast.fail('查询失败')
            console.log('获取巡查记录失败', e)
        })
        hideLoading()
        if(res.code === "1") {
            setRecordCounts(res.data)
        } 

    }
    const CustomChildren = ({ extra, onClick, children }) => (
        <div>
            <p className='label'>{children}</p>
            <div onClick={onClick} className='date'>
                {extra}
            </div>
        </div>
    );
    const doSearch = () => {
        getRecordCount()
    }
    const renderExtra = props => (
        <Extra>
            <span>{props}</span>次
        </Extra>    
    )
    const doLink = (fgridmodelmain_uuid, fsocialtype) => {
        props.history.push(`/PatrolDetail?fgridmodelmain_uuid=${fgridmodelmain_uuid}&fsocialtype=${fsocialtype}`)
    }
    const renderList = () => {
        if(recordCounts.length === 0) {
            return null
        }
        return (
            <List>
                {
                    recordCounts.map( item => (
                        <List.Item
                            key={item.fsocialtype} 
                            arrow="horizontal"
                            onClick={() => doLink(item.fgridmodelmain_uuid,item.fsocialtype)}
                            extra={renderExtra(item.count_num)}>
                            {item.fmodename}
                        </List.Item>  
                    ))
                }
            </List>
        )
    }
    const renderTab = ()=> {
        let tabOther = null;
        let height = '9px'
        if(contentIndex === 1){
            height = '62px';
            tabOther = (
                <List style={{marginBottom:'9px'}}>
                    <Picker 
                        data={months}
                        cols={1}
                        value={selectMonth} 
                        onChange={v => onChangeMonth(v)}>
                        <List.Item arrow="horizontal">请选择</List.Item>
                    </Picker>
                </List>
            )
        }
        if(contentIndex === 2){
            height = '68px';
            tabOther = (
                <DeteScope>
                    <div className='date-box'>
                        <DatePicker
                            mode="date"
                            format="YYYY-MM-DD"
                            title="开始日期"
                            value={dateStart}
                            onChange={v => setDateStart(v)}
                            extra={curDay}
                            >
                            <CustomChildren>开始日期</CustomChildren>
                        </DatePicker>
                    </div>
                    <div className='line'></div>
                    <div className='date-box'>
                        <DatePicker
                            mode="date"
                            format="YYYY-MM-DD"
                            title="结束日期"
                            value={dateEnd}
                            onChange={v => setDateEnd(v)}
                            extra={curDay}
                            >
                            <CustomChildren>结束日期</CustomChildren>
                        </DatePicker>
                    </div>
                    <div className='btn'>
                        <Button type="ghost" size="small" inline onClick={() => doSearch()}>搜索</Button>
                    </div>
                </DeteScope>
            )
        }
        return (
            <div>
                <WhiteSpace/>
                {tabOther}
                <MyListContainer height={height}>
                    <Scroll
                        pullUp={ () => {} }
                        pullDown = { () => {} }
                        pullUpLoading = {false}
                        pullDownLoading = {false}
                        onScroll={ () => {}}
                        refresh>
                        { renderList() }
                    </Scroll>
                </MyListContainer> 
            </div>
        )
    }
    return (
        <Container>
            <Tabs 
                tabs={tabs} 
                initialPage={contentIndex} 
                useOnPan={false}
                onChange={(tab,index) => handleChange(tab,index)}>
                <TabsBox>{renderTab()}</TabsBox>
                <TabsBox>{renderTab()}</TabsBox>
                <TabsBox>{renderTab()}</TabsBox>
            </Tabs>
        </Container>
    )
}

export default React.memo(PatrolRecord)