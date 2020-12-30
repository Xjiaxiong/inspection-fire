import React, { useEffect, useState } from 'react'
import {
    Container,
    Title,
    ListInfo,
    WhitePanel,
    StepImg,
    DescBox
} from './style'

import { Steps, Toast, WhiteSpace } from 'antd-mobile'
import manIcon from './img/man.png'
import ImgAgree from './img/chapter_agree.png'
import ImgCancel from './img/chapter_cancel.png'
import ImgModify from './img/chapter_modify.png'
import ImgRefuse from './img/chapter_refuse.png'
import ImgReview from './img/chapter_review.png'
import { getWrapParams, GetQuery } from '../../api/utils'
import { getHiddenFixDetailRequest } from '../../api/request'
import { formatDate } from '../../api/constant'
import previewImage from 'gdt-jsapi/previewImage'


const Step = Steps.Step;

const getManIcon = () => (
    <StepImg src={manIcon} alt="finish"/>
)

function FixDetail(props) {

    const Querys = GetQuery(props.location.search)
    console.log(Querys)
    const [pageData, setPageData] = useState(null);
    const [stepsData, setStepsData] = useState([]);
    
    useEffect(()=> {
        initPage()
        // eslint-disable-next-line
    },[])

    const initPage = async () => {
        Toast.loading('数据请求中...')
        let res = await getHiddenFixDetailRequest(getWrapParams({
            behavior_type: '03',
            fdevice_maint_uuid: Querys.fdevice_maint_uuid
        })).catch(e => {
            console.log('请求错误')
        })
        Toast.hide();
        if(res.code === '1') {
            setPageData(res.data[0])
            setStepsData(res.data[0].course_list)
        }
        console.log('getHiddenFixDetailRequest',res)
    }
    const renderDesc = (props) => {
        return (
            <DescBox>
                <div className='desc'>[{props.state_name}]</div>
                {
                    props.fdesc === '' ? null : (
                        <div className='row'>
                            <div className='label'>备注</div>
                            <div className='text'>{props.fdesc}</div>
                        </div>
                    )
                }
                {
                    props.picture_list.length === 0 ? null : (
                        <div className='row'>
                            <div className='label'>过程图片</div>
                            <div className='text'>
                            {
                                props.picture_list.map((img,index) => <img key={index} src={img.flink_name} alt="图片" onClick={() => viewPic(img.flink_name)}/>)
                            }      
                            </div>
                        </div>
                    )
                }
                <WhiteSpace size='l'/>
                <div className='date'>{formatDate(props.foperate_time,'MM-DD hh:mm')}</div>
            </DescBox>    
        )
    }
    const renderSteps = () => {
        if(stepsData.length === 0) {
            return null
        }
        return (
            <Steps>
                {
                    stepsData.map(item => (
                        <Step
                        key={item.fnode_puuid}
                        title={item.fnode_pname}
                        icon={getManIcon()}  
                        description={renderDesc(item)} />
                    ))
                }
            </Steps>
        )
    }
    const renderStateImg = (state) => {
        switch (state) {
            case '01':
                return ImgAgree
            case '02':
                return ImgRefuse
            case '03':
                return ImgCancel
            case '04':
                return ImgReview
            case '05':
                return ImgAgree
            case '08':
                return ImgModify
            default:
                break;
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
            <ListInfo>
                <div className='row'>
                    <div className='label'>隐患描述</div>
                    <div className='text'>{pageData?pageData.fdesc:'无数据'}</div>
                </div>
                <div className='row'>
                    <div className='label'>预计开始</div>
                    <div className='text'>{pageData?formatDate(pageData.fpre_start_time,'YYYY-MM-DD'):''}</div>
                </div>
                <div className='row'>
                    <div className='label'>预计结束</div>
                    <div className='text'>{pageData?formatDate(pageData.fpre_end_time,'YYYY-MM-DD'):''}</div>
                </div>
                <img className='state-img' src={renderStateImg(pageData?pageData.fopt_type:'')} alt=""/>
            </ListInfo>
            <Title>处理进度</Title>
            <WhitePanel>{renderSteps()}</WhitePanel>    
        </Container>
    )
}

export default React.memo(FixDetail)