import React, { useEffect, useState } from 'react'
import { 
    Container,
    TabsBox,
    TopInfo,
    MyList,
    MyListItem,
    DeteScope
} from './style'
import { 
    WhiteSpace,
    Tabs,
    Picker,
    List,
    Button,
    DatePicker} from 'antd-mobile';
import Scroll from '../../baseUI/scroll/index'
import BottomTip from '../../components/BottomTip'
import {
    curMonth, 
    curDay, 
    months,
    formatDate,
} from '../../api/constant'
import '../../api/config'
import { getHiddenStaRequest } from "../../api/request";
import { getWrapParams } from '../../api/utils'
import showLoading from 'gdt-jsapi/showLoading'
import hideLoading from 'gdt-jsapi/hideLoading';

const myStateMap = ['02','03','04']
const PAGE_SIZE = 8;
function TroubleFix(props) {
    const [contentIndex, setContentIndex] = useState(global.constans.tabStateHidden)
    const [troubelState, setTroubelState] = useState(0)
    const [selectMonth, setSelectMonth] = useState([curMonth])
    const [dateStart, setDateStart] = useState('')
    const [dateEnd, setDateEnd] = useState('')
    const [list, setList] = useState([])
    const [baseSta,setBaseSta] = useState(null)
    const [getMoreLoading, setGetMoreLoading] = useState(false)
    const [isMore, setIsMore] = useState(false)
    const [curPage, setCurPage] = useState(0)

    let pageSize = PAGE_SIZE;

    useEffect(() => {
        getSta()
        // eslint-disable-next-line
    },[selectMonth,troubelState,contentIndex])

    useEffect(() => {
        if(curPage > 0) {
            getStaMore()
        }
        // eslint-disable-next-line
    },[curPage])

    const getSta = async () => {
        pageSize = PAGE_SIZE;
        setCurPage(0)
        setIsMore(false)
        let commomParams = {
            page_num: 0,
            page_size: pageSize,
            fstate: myStateMap[troubelState]
        }
        let parmas = {
                 flag: "2",
                 ...commomParams
            }
        if(contentIndex === 1) {
            parmas = {
                "flag":"3",
                "month": selectMonth[0],
                ...commomParams
            }
        }
        if(contentIndex === 2) {
            parmas = {
                 "begin_time": dateStart ? formatDate(dateStart,'YYYYMMDD') : curDay.replace(/-/g,''),
                 "end_time": dateEnd ? formatDate(dateEnd,'YYYYMMDD') : curDay.replace(/-/g,''),
                  ...commomParams
            }
        }
        showLoading({text:"数据查询中..."})
        let res = await getHiddenStaRequest(getWrapParams(parmas)).catch((e) => {
            console.log('请求隐患数据报错了', e)
        })
        hideLoading()
        if(res.code === '1') {
            setList(res.data[0].list)
            setBaseSta(res.data[0])
        }
        console.log('getHiddenStaRequest',res)
       
    }
    const getStaMore = async () => {
        console.log('上拉加载更多')
        let maxCount = troubelState === 0 ? baseSta.undeal : troubelState === 1 ? baseSta.unapproval : baseSta.alreadydeal
        if(list.length === parseInt(maxCount) ) {
            setIsMore(true)
            return
        }
        let parmas = {
                 flag: "2",
                 page_num: curPage,
                 page_size: pageSize,
                 fstate: myStateMap[troubelState]
        }
        if(contentIndex === 1) {
            parmas = {
                "flag":"3",
                "moth": selectMonth[0]
            }
        }
        if(contentIndex === 2) {
            parmas = {
                 "begin_time": dateStart ? formatDate(dateStart,'YYYYMMDD') : curDay.replace(/-/g,''),
                 "end_time": dateEnd ? formatDate(dateEnd,'YYYYMMDD') : curDay.replace(/-/g,''),
            }
        }

        setGetMoreLoading(true)
        let res = await getHiddenStaRequest(getWrapParams(parmas)).catch((e) => {
            console.log('请求隐患数据报错了', e)
        })
        setGetMoreLoading(false)
        if(res.code === '1') {
            let tmpList = res.data[0].list
            setList([...list, ...tmpList])
        }
        console.log('getHiddenStaRequest',res)
    }
    const tabs = [
        { title: '最近两周' },
        { title: '按月份' },
        { title: '自定义' },
    ];
    const handleChange = (data,index) => {
        global.constans.tabStateHidden = index
        setContentIndex(index)
    }
    const onChangeState = index => {
        setTroubelState(index)
    }
    const onChangeMonth = v => {
        setSelectMonth(v)
    }
    const CustomChildren = ({ extra, onClick, children }) => (
        <div>
            <p className='label'>{children}</p>
            <div onClick={onClick} className='date'>
                {extra}
            </div>
        </div>
    );
    const getMoreData = ()=> {
        setCurPage(curPage+1)
    }
    const doSearch = () => {
        getSta()
    }
    const goDetail = (uuid) => {
        props.history.push(`/FixInfo?fhdcorrectmain_uuid=${uuid}`)
    }
    const renderList = () => {
        if(list.length === 0) {
            return null
        }
        const stateTxt = troubelState === 0 ? '未整改' : troubelState === 1 ? '已整改待审批' : '已完成'
        return (
            <MyList>
                {
                    list.map(item => (
                        <MyListItem key={item.fhdcorrectmain_uuid} onClick={() => goDetail(item.fhdcorrectmain_uuid)}>
                            <header>{item.content}</header>
                            <div className='bottom'>
                                <span>{formatDate(item.fcreate_time,'YYYY-MM-DD hh:mm')}</span>
                                <span className='state'>{stateTxt}</span>
                            </div>
                        </MyListItem>  
                    ))
                } 
            </MyList> 
        )
    }
    const renderTab = ()=> {
        const stateTabs = [
            {count: baseSta?baseSta.undeal:0, label: '未整改'},
            {count: baseSta?baseSta.unapproval:0, label: '已整改待审批'},
            {count: baseSta?baseSta.alreadydeal:0, label: '已完成'}
        ]
        let tabOther = '';
        if(contentIndex === 1){
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
                <TopInfo>
                    {
                        stateTabs.map((item,index) => (
                            <div className='item' onClick={() => onChangeState(index)} key={index}>
                                <p className='count'>{item.count}</p>
                                <p className='label'>{item.label}</p>
                                {
                                    troubelState === index ?  <div className='bottom-bar'></div> : null
                                }
                            </div>
                        ))
                    }
                </TopInfo> 
            </div>
        )
    }
    return (
        <Container>
            <Scroll
                pullDown = {() => getSta()}
                pullUp={() => getMoreData()}
                pullUpLoading = { getMoreLoading }
                pullDownLoading = { false }
                refresh>
                <div>
                    <Tabs 
                        tabs={tabs} 
                        initialPage={contentIndex} 
                        useOnPan={false}
                        swipeable={false}
                        onChange={(tab,index) => handleChange(tab,index)}>
                        <TabsBox>{renderTab()}</TabsBox>
                        <TabsBox>{renderTab()}</TabsBox>
                        <TabsBox>{renderTab()}</TabsBox>
                    </Tabs>
                    { renderList() }
                    { isMore ? <BottomTip></BottomTip>: null}
                </div>
            </Scroll>
        </Container>
    )
}

export default React.memo(TroubleFix)