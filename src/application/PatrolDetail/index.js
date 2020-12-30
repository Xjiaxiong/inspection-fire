import React, { useEffect, useState } from 'react'
import {
    Container,
    Top,
    BaseInfo,
    LineBox,
    DescBox,
    Dot
} from './style'
import { 
    Button,
    Steps,
    WhiteSpace,
    Toast
} from 'antd-mobile'
import Scroll from '../../baseUI/scroll/index'
import { getPatrolRecordDetailRequest } from '../../api/request'
import { getWrapParams, GetQuery } from '../../api/utils'
import { UnitTypeMapCode, formatDate} from '../../api/constant';
import showLoading from 'gdt-jsapi/showLoading'
import hideLoading from 'gdt-jsapi/hideLoading'

const Step = Steps.Step; 

const PatrolDetail = (props) => {
    const [searchVal, setSearchVal] = useState('')
    const [totalCount, setTotalCount] = useState(null)
    const [list, setList] = useState([])
    const Querys = GetQuery(props.location.search)

    useEffect(() => {
        getRecordCount()
        // eslint-disable-next-line
    },[])
    const getRecordCount = async () => {
        let parmas = {
             "flag":"1",
             "fgridmodelmain_uuid":Querys.fgridmodelmain_uuid,  
             "fsocialtype": Querys.fsocialtype,
              search_name: searchVal
        }
        showLoading({text:'数据查询中...'})
        let res = await getPatrolRecordDetailRequest(getWrapParams(parmas)).catch((e) => {
            Toast.fail('查询失败')
            console.log('获取巡查记录详情失败', e)
        })
        hideLoading()
        if(res.code === "1") {
            if(res.data[0].count_num === "0") {
                Toast.fail('未查询有关数据')
            } else {
                setTotalCount(res.data[0])
                setList(res.data[0].social_list)
            }
        } 
    }
    const doSearch = () => {
        getRecordCount()
    }
    const changeVal = (e) => {
        setSearchVal(e.target.value)
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
             <Scroll refresh>
                 <div>
                    <Top>
                        <div className='serch-bar'>
                            <i className='iconfont'>&#xe602;</i>
                            <input
                                value={searchVal}
                                onChange={e =>changeVal(e)} 
                                type="text" 
                                placeholder="输入监察人或者检查单位名称"/>
                        </div>
                        <Button type="primary" size="small" onClick={() => doSearch()}>搜索</Button>
                    </Top>
                    <BaseInfo>
                        <header>{UnitTypeMapCode[Querys.fsocialtype]}</header>
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
                </div>    
             </Scroll>
         </Container>
    )
}

export default React.memo(PatrolDetail)