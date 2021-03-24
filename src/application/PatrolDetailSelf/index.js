import React, { useEffect, useState } from 'react'
import {
    Container,
    BaseInfo,
    LineBox,
    DescBox,
    Dot
} from './style'
import { 
    Steps,
    WhiteSpace,
    Toast
} from 'antd-mobile'
import BottomTip from '../../components/BottomTip'
import Scroll from '../../baseUI/scroll/index'
import { getPatrolDataListBySocTypeSelfRequest } from '../../api/request'
import { getWrapParams, GetQuery } from '../../api/utils'
import { UnitTypeMapCode, formatDate} from '../../api/constant';
import showLoading from 'gdt-jsapi/showLoading'
import hideLoading from 'gdt-jsapi/hideLoading'

const Step = Steps.Step; 
const PAGE_SIZE = 20;
const PatrolDetailSelf = (props) => {
    const { params, fsocialtype } = GetQuery(props.location.search)
    const [totalCount, setTotalCount] = useState(null)
    const [list, setList] = useState([])
    const [pageNow, setPageNow] = useState(0)
    const [isMore, setIsMore] = useState(true)

    useEffect(() => {
        if(!totalCount) {
            getRecordCount()
        }
        // eslint-disable-next-line
    },[])
    useEffect(() => {
        if(pageNow > 0 && isMore) {
            getMore()
        }
        // eslint-disable-next-line
    },[pageNow,isMore])
    
    const getRecordCount = async () => {
        let myParams = JSON.parse(params)
        showLoading({text:'数据查询中...'})
        let res = await getPatrolDataListBySocTypeSelfRequest(getWrapParams({
            ...myParams,
            "social_type": fsocialtype,
            page_size: PAGE_SIZE,
            page_num: 0
        })).catch((e) => {
            Toast.fail('查询失败')
            console.log('获取巡查记录详情失败', e)
        })
        hideLoading()
        if(res.code === "1") {
            if(res.data.count_num === "0") {
                Toast.fail('未查询有关数据')
            } else {
                setTotalCount(res.data)
                setList(res.data.list)
            }

        } 
    }
    const getMore = async () => {
        let myParams = JSON.parse(params)
        let res = await getPatrolDataListBySocTypeSelfRequest(getWrapParams({
            ...myParams,
            "social_type": fsocialtype,
            page_size: PAGE_SIZE,
            page_num: pageNow*PAGE_SIZE
        })).catch((e) => {
            Toast.fail('查询失败')
            console.log('获取巡查记录详情失败', e)
        })
        if(res.code === "1") {
            if(res.data.count_num === "0") {
                Toast.fail('未查询有关数据')
            } else {
                let arr = res.data.list
                if(arr.length === 0) {
                    setIsMore(false)
                } else {
                    setList([...list,...arr])
                }

            }
        } 
    }
    const viewMore = uuid => {
       props.history.push(`/ChecksDetail?fgridrecordmain_uuid=${uuid}`)
    }
    const renderIcon = isabnormal => {
        if(isabnormal === "1") {
            return <Dot><div className='yellow'></div></Dot>
        } else {
            return <Dot><div className='green'></div></Dot>
        }
    }
    const renderDesc = (props)=> {
        let myScore = parseFloat(props.score_info)
        let score = props.isabnormal !== '1' ? <div className='text color-green'>正常</div> : <div className='text'>扣<span className='color-red'>{myScore}分</span></div>
        return (
            <DescBox>
                <div className='row'>
                    <div className='label'>检查人</div>
                    <div className='text'>{props.fpatrolperson_name}</div>
                </div>
                <div className='row'>
                    <div className='label'>检查结果</div>
                    {score}
                </div>
                <WhiteSpace size='l'/>
                <div className='date-box'>{formatDate(props.fenddatetime,'YYYY-MM-DD hh:mm')}</div>
                <div className='more-link'onClick={() => viewMore(props.fgridrecordmain_uuid)}>
                    <span>查看详情</span>
                    <i className='iconfont'>&#xe600;</i>
                </div>
            </DescBox>    
        )
    }
    const renderSteps = () => {
        if(list.length === 0) {
            return null
        }
        return (
            <Steps>
                {
                    list.map(item => (
                    <Step
                        key={item.fgridrecordmain_uuid}
                        title={item.fsocial_name}
                        icon={renderIcon(item.isabnormal)}
                        description={renderDesc(item)} />
                    ))
                }
                
            </Steps>
        )
    }

    return (
         <Container>
             <Scroll
                pullUp={() => setPageNow(pageNow+1)} 
                refresh>
                 <div>
                    <WhiteSpace/>
                    <BaseInfo>
                        <header>{UnitTypeMapCode[fsocialtype]}</header>
                        <div className='content'>
                            <section>
                                <div className='count'>{totalCount?totalCount.count_num:0}</div>
                                <div className='label'>总数</div>
                            </section>
                            <div className='bar'></div>
                            <section>
                                <div className='count'>{totalCount?totalCount.abnormal_num:0}</div>
                                <div className='label abnormal'>异常数</div>
                            </section>
                        </div>
                    </BaseInfo>
                    <LineBox>{renderSteps()}</LineBox>
                    {isMore === true ? null : <BottomTip></BottomTip>}
                    <WhiteSpace/>
                </div>    
             </Scroll>
         </Container>
    )
}

export default React.memo(PatrolDetailSelf)