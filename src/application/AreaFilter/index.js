import React, { useEffect, useState } from 'react'
import { List, WhiteSpace } from 'antd-mobile'
import Scroll from  '../../baseUI/scroll/index'
import { getAreaFilterStatistic, getEntityListRequest } from '../../api/request'
import NoDataTip from '../../components/NoDataTip/index'
import { getWrapParams } from '../../api/utils'
import styled from 'styled-components'
import showLoading from 'gdt-jsapi/showLoading'
import hideLoading from 'gdt-jsapi/hideLoading'

export const ScrollContainer = styled.div`
    position: fixed;
    top: 0;
    bottom: 0;
    width: 100%;
`

const Item = List.Item;
const PAGE_SIZE = 20;


const AreaFilter = props => {
    const type = localStorage.getItem('mType')
    console.log("mType---",type)
    const [list, setList] = useState([])
    const [listLast, setListLast] = useState([])
    const [pageNow, setPageNow] = useState(0)
    const [pageNow2, setPageNow2] = useState(0)
    const [areaCode, setAreaCode] = useState('')
    const [areaLevel, setAreaLevel] = useState('')
    const [isNext, setIsNext] = useState(true)
    useEffect(() => {
        if(list.length === 0) {
            getList()
        }
    },[])
    useEffect(() => {
        if(pageNow > 0) {
            getMoreList()
        }
        // eslint-disable-next-line
    },[pageNow])
    useEffect(() => {
        if(pageNow2 > 0) {
            getMoreEntityList()
        }
        // eslint-disable-next-line
    },[pageNow2])
    const getList = async (farea_code,farea_level,qTag) => {
        showLoading({text: "数据加载中..."})
        let q_tag = '01'
        if(qTag) {
            q_tag = '02'
        }
        setPageNow(0)
        setAreaCode(farea_code)
        setAreaLevel(farea_level)
        let res = await getAreaFilterStatistic(getWrapParams({
            farea_code: farea_code || localStorage.getItem('province_code'),
            farea_level: farea_level || '2',
            q_tag: q_tag,
            mtype: type,
            pagenow: 0,
            pagesize: PAGE_SIZE
        }))
        hideLoading()
        if(res && res.code === '1') {
            setList(res.data)
        }
    }
    const getMoreList = async () => {
        let res = await getAreaFilterStatistic(getWrapParams({
            farea_code: areaCode,
            farea_level: areaLevel,
            mtype: type,
            pagenow: pageNow,
            pagesize: PAGE_SIZE
        }))

        if(res && res.code === '1') {
            let arr = res.data;
            setList([...list, ...arr])
        }
    }
    const getEntityList = async () => {
        showLoading({text: "数据加载中..."})
        setPageNow2(0)
        let res = await getEntityListRequest(getWrapParams({
            farea_code: areaCode,
            farea_level: areaLevel || '5',
            mtype: type,
            pagenow: 0,
            pagesize: PAGE_SIZE
        }))
        hideLoading()
        if(res && res.code === '1') {
            setListLast(res.data)
        }
    }
    const getMoreEntityList = async () => {
        let res = await getEntityListRequest(getWrapParams({
            farea_code: areaCode,
            farea_level: areaLevel,
            mtype: type,
            pagenow: pageNow2,
            pagesize: PAGE_SIZE
        }))

        if(res && res.code === '1') {
            let arr = res.data;
            setListLast([...listLast, ...arr])
        }
    }
    const doNext = (fhas_next,farea_level,area_code) => {
        if(fhas_next === '1') {
            getList(area_code,farea_level,'02')
        } else {
            setIsNext(false)
            getEntityList()
        }
    }
    const pullUpFunc = () => {
        if(isNext) {
            setPageNow(pageNow + 1)
        } else {
            setPageNow2(pageNow2 + 1)
        }
    }
    const renderList = () => {
        if(isNext) {
            if(list.length === 0) {
                return (
                    <NoDataTip></NoDataTip>
                )
            }
            return(
                <List>
                    {
                        list.map(i => (
                            <Item
                                key={i.area_code} 
                                arrow="horizontal"
                                extra={i.item_num} 
                                onClick={() => doNext(i.fhas_next,i.farea_level,i.area_code)}>{i.area_name}</Item>
                        ))
                    }
                </List>
            )


        } else {
            if(listLast.length === 0) {
                return (
                    <NoDataTip></NoDataTip>
                )
            }
            return(
                <List>
                    {
                        listLast.map(item => (
                            <Item 
                                arrow="horizontal"
                                onClick={() => viewDetail(item.i)}>{item.n}</Item>
                        ))
                    }
                </List>
            )
        }
    }
    const viewDetail = uuid => {
        let partsArr = ['M11','M12','M13','M14','M15']
        if(partsArr.includes(type)) {
            //单位详情页
            props.history.push(`/ProjectDetail?fproject_uuid=${uuid}`)
        } else {
            //实体详情页
            props.history.push(`/EntityDetail?fuuid=${uuid}`)
        }
    }
    return (
        <ScrollContainer>
            <Scroll
                pullUp={() => pullUpFunc()} 
                refresh>
                <div>
                    <WhiteSpace />
                    { renderList() }
                </div>   
            </Scroll>
        </ScrollContainer>    
    )
}

export default React.memo(AreaFilter)