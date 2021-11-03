import React, { useEffect, useState } from 'react'
import { 
    Container,
    TabsBox,
    MyListContainer,
    Extra,
    DeteScope,
    Title
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
import { getPatrolDataSelfRequest } from '../../api/request'
import { getWrapParams } from '../../api/utils'
import showLoading from 'gdt-jsapi/showLoading'
import hideLoading from 'gdt-jsapi/hideLoading'

function MyWork(props) {
    const [contentIndex, setContentIndex] = useState(global.constans.tabStateSelf)
    const [selectMonth, setSelectMonth] = useState([curMonth])
    const [dateStart, setDateStart] = useState('')
    const [dateEnd, setDateEnd] = useState('')
    const [recordCounts, setRecordCounts] = useState(null); 
    const tabs = [
        { title: '最近一周' },
        { title: '按月份' },
        { title: '自定义' },
    ];
    const handleChange = (data,index) => {
        global.constans.tabStateSelf = index
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
             "tag":"1",
        }
        if(contentIndex === 1) {
            parmas = {
                "tag":"2",
                "month": selectMonth[0]
            }
        }
        if(contentIndex === 2) {
            parmas = {
                 "tag":"3",
                 "begin_time": dateStart ? formatQueryDate(dateStart) : curDay.replace(/-/g,''),
                 "end_time": dateEnd ? formatQueryDate(dateEnd) : curDay.replace(/-/g,''),
            }
        }
        showLoading({text:'数据查询中...'})
        let res = await getPatrolDataSelfRequest(getWrapParams(parmas)).catch((e) => {
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
    const toViewHiddenList = (fstate) => {
        let params = {
                "tag":"1",
                fstate
        }
        if(contentIndex === 1) {
            params = {
                fstate,
                "tag":"2",
                "month": selectMonth[0]
            }
        }
        if(contentIndex === 2) {
            params = {
                 fstate,
                 "tag":"3",
                 "begin_time": dateStart ? formatQueryDate(dateStart) : curDay.replace(/-/g,''),
                 "end_time": dateEnd ? formatQueryDate(dateEnd) : curDay.replace(/-/g,''),
            }
        }
        params = JSON.stringify(params)
        props.history.push(`/MyHiddenTroubles?params=${params}`)
    }
    const toViewCheckSta = (flag) => {
        var apptype = ''
        if(flag) {
            apptype = 1
        }
        let params = {
                 "tag":"1",
                 apptype,
        }
        if(contentIndex === 1) {
            params = {
                "tag":"2",
                "month": selectMonth[0],
                apptype,
            }
        }
        if(contentIndex === 2) {
            params = {
                 "tag":"3",
                 "begin_time": dateStart ? formatQueryDate(dateStart) : curDay.replace(/-/g,''),
                 "end_time": dateEnd ? formatQueryDate(dateEnd) : curDay.replace(/-/g,''),
                  apptype,
            }
        }
        params = JSON.stringify(params)
        props.history.push(`/MyChecks?params=${params}`)
    }
    const renderList = () => {
        let myRecordCounts = recordCounts
        if(!recordCounts) {
            myRecordCounts = {
                totalnum: 0,
                zzdtotalnum: 0,
                wzgnum: 0,
                dspnum: 0,
                zgwcnum: 0
            }
        }
        return (
            <div>
                <Title>我的巡查统计</Title>
                <List>
                    <List.Item 
                        key={1}
                        onClick={() => toViewCheckSta()}
                        arrow="horizontal"
                        extra={renderExtra(myRecordCounts.totalnum)}>
                        检查数
                    </List.Item>
                    <List.Item 
                        key={5}
                        onClick={() => toViewCheckSta('zzdupload')}
                        arrow="horizontal"
                        extra={renderExtra(myRecordCounts.zzdtotalnum)}>
                        浙政钉检查数
                    </List.Item>
                </List>
                <Title>我的隐患整改</Title>
                <List>
                    <List.Item 
                        key={2}
                        onClick={() => toViewHiddenList('1')}
                        arrow="horizontal"
                        extra={renderExtra(myRecordCounts.wzgnum)}>
                        未整改
                    </List.Item>
                    <List.Item 
                        key={3}
                        onClick={() => toViewHiddenList('2')}
                        arrow="horizontal"
                        extra={renderExtra(myRecordCounts.dspnum)}>
                        已整改待审批
                    </List.Item>
                    <List.Item 
                        key={4}
                        onClick={() => toViewHiddenList('3')}
                        arrow="horizontal"
                        extra={renderExtra(myRecordCounts.zgwcnum)}>
                        已经完成
                    </List.Item>
                </List>
            </div>    
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

export default React.memo(MyWork)