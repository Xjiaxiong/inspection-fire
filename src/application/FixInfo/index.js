import React, { useEffect, useState } from 'react'
import {
    Container,
    Title,
    Top,
    WhitePanel,
    StepImg,
    DescBox,
    BottomBtn
} from './style'
import Scroll from '../../baseUI/scroll/index'
import { Steps, WhiteSpace,Toast,Button } from 'antd-mobile'
import finishIcon from './img/finishIcon.png'
import waitIcon from './img/waitIcon.png'
import { getHiddenStationsRequest, superviseOnceRequest } from '../../api/request'
import { getWrapParams, GetQuery } from '../../api/utils'
import { formatDate } from '../../api/constant'
import alert from 'gdt-jsapi/alert'
import showLoading from 'gdt-jsapi/showLoading'
import hideLoading from 'gdt-jsapi/hideLoading'
import previewImage from 'gdt-jsapi/previewImage'


const Step = Steps.Step;

const getFinishIcon = () => (
    <StepImg src={finishIcon} alt="finish"/>
)
const getWaitIcon = () => (
    <StepImg src={waitIcon} alt="waiting"/>
)
const stateMap = {
    '02': '待整改',
    '03': '待审核',
    '04': '已同意'
}
const stateokSchedule = ['N01','N02','N03','N05','N06','N07','N11','N13','N15','N17']

function FixInfo(props) {
    const [baseSta, setBaseSta] = useState(null)
    const [schedule, setSchedule] = useState([])
    const [menu, setMenu] = useState([])
    const Querys = GetQuery(props.location.search)
    useEffect(()=>{
        initPage()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])
    const initPage = async () => {
        showLoading({text:'数据加载中...'})
        let res = await getHiddenStationsRequest(getWrapParams({
            "fhdcorrectmain_uuid": Querys.fhdcorrectmain_uuid,
        })).catch(e => {
            Toast.fail('数据加载失败')
        })
        hideLoading()
        console.log('getHiddenStationsRequest',res)
        if(res.code === '1') {
            let data = res.data[0];
            setBaseSta(data.station[0])
            setSchedule(data.schedule)
            data.menu && setMenu(data.menu)
            
        }
    }
    const goDetail = (uuid) => {
        if(!uuid) return 
        props.history.push(`/ChecksDetail?fgridrecordmain_uuid=${uuid}`)
    }
    const goScheduleDetail = (uuid) => {
        props.history.push(`/FixDetail?fdevice_maint_uuid=${uuid}`)
    }
    const renderDesc = (props)=> {
        let personLabel = '责任人'
        let node_state = props.fnode_state;
        let isFixState = false;
        if( node_state === 'N13' ) {
            personLabel = '检查人'
        }
        if(node_state === 'N14' ||  node_state === 'N15') {
            isFixState = true;
            personLabel = '整改人'
        }
        if(node_state === 'N08' || node_state === 'N11' || node_state === 'N16'|| node_state === 'N17') {
            personLabel = '审核人'
        }
        if(node_state === 'N14') {
            return (
                <DescBox>
                    <div className='date'>{formatDate(props.fcreate_time,'YYYY-MM-DD hh:mm')}</div>
                    <div className='row'>
                        <div className='label'>整改单位</div>
                        <div className='text'>{props.fsocial_name}</div>
                    </div>
                    <div className='row'>
                        <div className='label'>责任人</div>
                        <div className='text'>{props.fchecker_name}</div>
                    </div>
                    <div className='row'>
                        <div className='label'>联系电话</div>
                        <div className='text'>{props.fchecker_tel}</div>
                    </div>
                </DescBox>    
            )            
        }
        return (
            <DescBox>
                <div className='date'>{formatDate(props.fcreate_time,'YYYY-MM-DD hh:mm')}</div>
                {
                    !isFixState ? null : (
                        <div className='row'>
                            <div className='label'>整改单位</div>
                            <div className='text'>{props.fsocial_name}</div>
                        </div>
                    )
                }
                <div className='row'>
                    <div className='label'>{personLabel}</div>
                    <div className='text'>{props.fnode_name}</div>
                </div>
                {
                    props.fmobile_tel === '' ? null : (
                        <div className='row'>
                            <div className='label'>联系电话</div>
                            <div className='text'>{props.fmobile_tel}</div>
                        </div>
                    )
                }
                {
                    props.fdesc === '' ? null : (
                        <div className='row'>
                            <div className='label'>过程描述</div>
                            <div className='text'>{props.fdesc}</div>
                        </div>
                    )
                }
                {
                    props.fattach.length === 0 ? null : (
                        <div className='row'>
                            <div className='label'>过程图片</div>
                            <div className='text'>
                                {
                                    props.fattach.map(img => <img key={img.f_index} src={img.fattach_link} alt="1" onClick={() => viewPic(img.fattach_link)} />)
                                }
                            </div>
                        </div>
                    ) 
                }
                <WhiteSpace size='l'/>
                {
                    props.fnode_state === 'N15' ? (
                        <div className='more-link' onClick={() => goScheduleDetail(props.fdevice_maint_uuid)}>
                            <span>查看详情</span>
                            <i className='iconfont'>&#xe600;</i>
                        </div>
                    ) : null
                }
            </DescBox>    
        )
    }
    const renderSteps = () => {
        if(schedule.length === 0) {
            return null
        }
        return (
            <Steps>
                {
                    schedule.map(item => (
                        <Step
                        key={item.fnode_state}
                        title={item.fnode_state_name}
                        icon={stateokSchedule.includes(item.fnode_state) ? getFinishIcon() : getWaitIcon() }  
                        description={renderDesc(item)} />
                    ))
                }
            </Steps>
        )
    }
    const renderMenu = () => {
        if(menu.length === 0) {
            return null
        }
        if(menu.length === 1) {
            return (
                <BottomBtn>
                    <div className='btn-full'>
                        <Button type='primary' onClick={() => doSupervision()}>{menu[0].menu_name}</Button>
                    </div>
                </BottomBtn> 
            )
        }
        if(menu.length === 2) {
            return (
                <BottomBtn>
                    <div className='btn'>
                        <Button type='warning' onClick={() => doReFix()}>{menu[0].menu_name}</Button>
                    </div>
                    <div className='btn'>
                        <Button type='primary' onClick={() => doPassFix()}>{menu[1].menu_name}</Button>
                    </div>
                </BottomBtn> 
            )
        }
    }
    const doReFix = () => {
        props.history.push(`/ReFix?fhdcorrectmain_uuid=${Querys.fhdcorrectmain_uuid}`)
    }
    const doPassFix = () => {
        props.history.push(`/PassFix?fhdcorrectmain_uuid=${Querys.fhdcorrectmain_uuid}`)
    }
    const doSupervision = async () => {
        showLoading({text:'请求中...'})
        let res = await superviseOnceRequest(getWrapParams({fhdcorrectmain_uuid:Querys.fhdcorrectmain_uuid}))
        hideLoading()
        if(res.code === '1') {
            alert({
                title: '温馨提示',
                message: res.desc,
                button: '确定'
            })
        } else {
            alert({
                message: '监督失败',
                button: '确定'
            })
        }
    }
    const viewPic = url => {
        previewImage({
            current: url,
            urls: [url],
        }).then(res => {
            console.log('查看图片成功')
        }).catch(err => {
            alert({message:err})
        })
    }
    return (
        <Container>
            <Scroll refresh>
                <div>
                    <Title>隐患情况</Title>
                    <Top>
                        <div className='row first'>
                            <div className='left desc'>
                                <i className='iconfont'>&#xe6ee;</i>
                                <span>{baseSta?baseSta.fsocial_name:'无数据'}</span>    
                            </div>
                            <div className='right state'>
                                {baseSta?stateMap[baseSta.fopt_type]:'无数据'}
                            </div>
                        </div>
                        <div className='row'>
                            <div className='left'>
                                <span className='label'>所扣分数</span>
                                <span className='color-red'>{baseSta?baseSta.fd_score:'0'}分</span>
                            </div>
                        </div>
                        <div className='row more-row-text-row'>
                            <div className='label'>
                                问题描述
                            </div>
                            <div className='more-row-text'>
                                {baseSta?baseSta.f_desc:'无数据'}
                            </div>
                        </div>
                        <div className='more-link' onClick={() => goDetail(baseSta?baseSta.fgridrecordmain_uuid:'')}>
                            <span>查看详情</span>
                            <i className='iconfont'>&#xe600;</i>
                        </div>
                    </Top>
                    <Title>检查进度</Title>
                    <WhitePanel>
                        { renderSteps() }
                    </WhitePanel>
                </div>
            </Scroll>
            {
                renderMenu()
            }         
        </Container>
    )
}

export default React.memo(FixInfo)