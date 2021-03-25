import React, { useEffect, useState } from 'react'
import { 
    Container,
    MyList,
    MyListItem,
} from './style'

import Scroll from '../../baseUI/scroll/index'
import BottomTip from '../../components/BottomTip'
import NoDataTip from '../../components/NoDataTip'

import { getHiddenListSelfRequest } from "../../api/request";
import { getWrapParams, GetQuery } from '../../api/utils'
import showLoading from 'gdt-jsapi/showLoading'
import hideLoading from 'gdt-jsapi/hideLoading';

const PAGE_SIZE = 10;
function MyHiddenTroubles(props) {
    const { params } = GetQuery(props.location.search)
    const [list, setList] = useState([])
    const [curPage, setCurPage] = useState(0)
    const [isMore, setIsMore] = useState(true)
    useEffect(() => {
        if(curPage === 0) {
            getList()
        }
        // eslint-disable-next-line
    },[])
    useEffect(() => {
        if(curPage > 0 && isMore) {
            getMoreList()
        }
        // eslint-disable-next-line
    },[curPage,isMore])

    const getList = async () => {
        let myParams = JSON.parse(params)
        showLoading({text:'数据加载中...'})
        const res = await getHiddenListSelfRequest(getWrapParams({
            ...myParams,
            page_size: PAGE_SIZE,
            page_num: 0
        }))
        hideLoading()
        const {code, data} = res
        if(code === '1') {
            setList(data)
        }
    }
    const getMoreList = async () => {
        showLoading({text:'加载更多中...'})
        let myParams = JSON.parse(params)
        const res = await getHiddenListSelfRequest(getWrapParams({
            ...myParams,
            page_size: curPage,
            page_num: PAGE_SIZE*curPage
        }))
        hideLoading()
        const {code, data} = res
        if(code === '1') {
            
            if(data.length > 0) {
                let tempList = [...list,...data]
                setList(tempList)
            } else {
                setIsMore(false)
                // toast({
                //     text:"没有更多数据了!"
                // })
            }
        }
    }
    const renderList = () => {
        if(list.length === 0) {
            return null
        }   
        let myParams = JSON.parse(params)
        let troubelState = myParams.fstate
        const stateTxt = troubelState === "1" ? '未整改' : troubelState === "2" ? '已整改待审批' : '已完成'
        return (
            <MyList>
                {
                    list.map(item => (
                        <MyListItem key={item.fhdcorrectmain_uuid} onClick={() => goDetail(item.fhdcorrectmain_uuid)}>
                            <header>{item.content}</header>
                            <div className='bottom'>
                                <span>{item.fcreate_time}</span>
                                <span className='state'>{stateTxt}</span>
                            </div>
                        </MyListItem>  
                    ))
                } 
            </MyList> 
        )
    }
    const goDetail = (uuid) => {
        props.history.push(`/FixInfo?fhdcorrectmain_uuid=${uuid}`)
    }
    const getSta = () => {
        setCurPage(0)
        getList()
    }
    const getMoreData = () => {
        setCurPage(curPage+1)
    }
    return (
        <Container>
            <Scroll
                pullDown = {() => getSta()}
                pullUp={() => getMoreData()}
                pullUpLoading = { false }
                pullDownLoading = { false }
                refresh>
                <div>
                    { renderList() }
                    { isMore === true ? null :<BottomTip>已经全部数据了!</BottomTip> }
                </div>
            </Scroll>
            { list.length === 0 ? <NoDataTip></NoDataTip> : null }
        </Container>
    )
}
export default React.memo(MyHiddenTroubles)