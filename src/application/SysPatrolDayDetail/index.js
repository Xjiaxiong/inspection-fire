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
import Scroll from '../../baseUI/scroll/index'
import { getSysPatrolDayDetailRequest } from '../../api/request'
import { getWrapParams, GetQuery } from '../../api/utils'
import { formatDate } from '../../api/constant';
import showLoading from 'gdt-jsapi/showLoading'
import hideLoading from 'gdt-jsapi/hideLoading'

const Step = Steps.Step; 
const PatrolDetail = (props) => {
        
    const [list, setList] = useState([])
    const { fpratorl_code } = GetQuery(props.location.search)

        useEffect(() => {
            if(list.length === 0) {
                getRecordCount()
            }
            // eslint-disable-next-line
        },[])

    const getRecordCount = async () => {
        showLoading({text:'数据查询中...'})
        let res = await getSysPatrolDayDetailRequest(getWrapParams({
            fpratorl_code:fpratorl_code,
            sys_code:1,
            imei:1,
            fapptype:1
        })).catch((e) => {
            Toast.fail('查询失败')
            console.log('获取巡查记录详情失败', e)
        })
        hideLoading()
        console.log("getSysPatrolDayDetailRequest---",res)
        if(res && res.code === "1") {
            setList(res.data)
        } 
    }
    const viewMore = fpatrolbusdtl_uuid => {
       //props.history.push(`/ChecksDetail?fpatrolbusdtl_uuid=${fpatrolbusdtl_uuid}`)
    }
    const renderIcon = fstatus => {
        if(fstatus === "01") {
            return <Dot><div className='green'></div></Dot>
        } else {
            return <Dot><div className='grey'></div></Dot>
        }
    }
    const renderDesc = (props)=> {
        if(props.fstatus === '00') {
            return null
        }
        let score = props.isexce === '0' ? <div className='text color-green'>正常</div> : <div className='text color-red'>异常</div>
        return (
            <DescBox>
                <div className='row'>
                    <div className='label'>时间</div>
                    <div className='text'>{formatDate(props.fpatrol_datetime,'YYYY-MM-DD hh:mm')}</div>
                </div>
                <div className='row'>
                    <div className='label'>巡查人</div>
                    <div className='text'>{props.fpatrolperson_name}</div>
                </div>
                <div className='row'>
                    <div className='label'>结果</div>
                    {score}
                </div>
                {
                    props.faudit_name ? (
                        <div className='row'>
                            <div className='label'>备注</div>
                            <div className='text'>{props.fpatrol_desc}</div>
                        </div>
                    ) : null
                }
                {
                    props.faudit_name ? (
                        <div className='row'>
                            <div className='label'>确认人</div>
                            <div className='text'>{props.faudit_name}</div>
                        </div>
                    ) : null
                }
                {
                    props.faudit_time ? (
                        <div className='row'>
                            <div className='label'>确认时间</div>
                            <div className='text'>{formatDate(props.faudit_name,'YYYY-MM-DD hh:mm')}</div>
                            <div className='text'>{props.faudit_time}</div>
                        </div>
                    ) : null
                }
                {
                    props.faudit_name ? (
                        <div className='row'>
                            <div className='label'>备注(消控室)</div>
                            <div className='text'>{props.fremark}</div>
                        </div>
                    ) : null
                }
                <WhiteSpace size='l'/>
                <div className='more-link'onClick={() => viewMore(props.fpatrolbusdtl_uuid)}>
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
                        key={item.fobject_uuid}
                        title={item.object_name}
                        icon={renderIcon(item.fstatus)}
                        description={renderDesc(item)} />
                    ))
                }
                
            </Steps>
        )
    }
    const renderPatroledCount = () => {
        let count = 0;
        list.forEach(item => {
            if(item.fstatus === '01') {
                count++
            }
        })
        return count
    }
    return (
         <Container>
             <Scroll 
                refresh>
                 <div>
                    <BaseInfo>
                        <div className='content'>
                            <section>
                                <div className='count color-green'>{ renderPatroledCount()}</div>
                                <div className='label color-green'>已巡查</div>
                            </section>
                            <div className='bar'></div>
                            <section>
                                <div className='count'>{ list.length }</div>
                                <div className='label'>应该巡查</div>
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