import React, { useEffect, useState } from 'react'
import {
    ScrollContainer,
    List
} from './style'
import Scroll from '../../baseUI/scroll/index'
import NoDataTip from '../../components/NoDataTip/index'
import { getGridSocialPatrolHistory } from '../../api/request'
import { getWrapParams, GetQuery } from '../../api/utils'
import { formatDateTomm } from '../../api/constant'
import showLoading from 'gdt-jsapi/showLoading'
import hideLoading from 'gdt-jsapi/hideLoading'

const pageSize = 20;

const GridManPatrols = (props) => {
    const { fsocial_uuid } = GetQuery(props.location.search)
    const [pageNow, setPageNow] = useState(0)
    const [list, setList] = useState([])

    const toDetail = (fgridrecordmain_uuid) => {
        //查看网格巡查详情
        props.history.push(`/ChecksDetail?fgridrecordmain_uuid=${fgridrecordmain_uuid}`)
    }

    useEffect(() => {
        if(!list.length) {
            getList()
        }
        // eslint-disable-next-line
    },[])
    useEffect(() => {
        if(pageNow > 0) {
            getMoreList()
        }
        // eslint-disable-next-line
    },[pageNow])
    const getList = async () => {
        showLoading({text: "加载中..."})
        let res = await getGridSocialPatrolHistory(getWrapParams({
            fsocial_uuid,
            pagesize: pageSize,
            pagenow: 0
        }))
        hideLoading()
        if(res && res.code === '1') {
            setList(res.data)
        }
    }
    const getMoreList = async () => {
        showLoading({text: "加载中..."})
        let res = await getGridSocialPatrolHistory(getWrapParams({
            fsocial_uuid,
            pagesize: pageSize,
            pagenow: pageNow
        }))
        hideLoading()
        if(res && res.code === '1') {
            let resList = res.data
            setList([...list,...resList])
        }
    }  

    return (
        <ScrollContainer>
            <Scroll
                pullUp={() => setPageNow(pageNow+1)} 
                refresh>
                <List>
                    {
                        list.map(item => (
                            <li onClick={() => toDetail(item.fgridrecordmain_uuid)}>
                                <div className="title">{item.fgridrecord_name}</div>
                                <div className="desc">
                                    <p>
                                        <span className="label">评分:</span>
                                        <span>{item.fscore}</span>
                                    </p>
                                    <p>
                                        <span className="label">检查人:</span>
                                        <span>{item.fcheck_person}</span>
                                    </p>
                                    <p>
                                        <span className="label">检查时间:</span>
                                        <span>{formatDateTomm(item.fcheck_time)}</span>
                                    </p>
                                </div>
                            </li>
                        ))
                    }
                </List>
                {list.length === 0 ? <NoDataTip></NoDataTip> : null}
            </Scroll>    
        </ScrollContainer>    
    )
}

export default React.memo(GridManPatrols)