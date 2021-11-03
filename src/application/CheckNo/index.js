import React, { useState, useEffect } from 'react'
import {
    Container,
    WBlock,
} from './style'
import { Toast } from "antd-mobile";
import Scroll from '../../baseUI/scroll/index'
import { getNoGridRecordDtlRequest } from '../../api/request'
import { getWrapParams, GetQuery } from '../../api/utils'
import { formatDate } from '../../api/constant'
import showLoading from 'gdt-jsapi/showLoading'
import hideLoading from 'gdt-jsapi/hideLoading'
import previewImage from 'gdt-jsapi/previewImage'
import alert from 'gdt-jsapi/alert'

function CheckNo(props) {
    const [base, setBase] = useState(null)
    const Querys = GetQuery(props.location.search)
    useEffect(()=>{
        initPage()
        // eslint-disable-next-line
    },[])

    const initPage = async () => {
        showLoading({text:'数据查询中...'})
        try {   
            let res = await getNoGridRecordDtlRequest(getWrapParams({
                "fgridrecordmain_uuid": Querys.fgridrecordmain_uuid,
                flag: '2'
            }))
            hideLoading()
            if(res.code === '1') {
                let data  = res.data;
                let obj = data[0]

                let imgs = obj.fattach_link.split(',')
                let tmpBase = {
                    fsocial_name: obj.fsocial_name,
                    fpatrolperson_name: obj.fpatrolperson_name,
                    fcreat_time: formatDate(obj.fcreat_time),
                    f_no_check_reason: obj.f_no_check_reason,
                    imgs,
                }
                setBase(tmpBase)

            }
        } catch (e) {
            Toast.fail('数据加载失败')
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
                    <WBlock>
                        <div className="f-row">
                            <div className="label-5">被检查单位</div>
                            <div className="list-value">{base?base.fsocial_name:'无数据'}</div>
                        </div>
                        <div className="f-row">
                            <div className="label-5">检查人员</div>
                            <div className="list-value">{base?base.fpatrolperson_name:'无数据'}</div>
                        </div>
                        <div className="f-row">
                            <div className="label-5">检查时间</div>
                            <div className="list-value">{base?base.fcreat_time:'无数据'}</div>
                        </div>
                        <div className="f-row">
                            <div className="label-5">未检查原因</div>
                            <div className="list-value color-red">{base?base.f_no_check_reason:'无数据'}</div>
                        </div>
                    </WBlock>
                    <WBlock>
                        <div className="f-row">
                            <div className="label-5">照片</div>
                        </div>
                        <div className="f-row">
                            {
                                base ? base.imgs.map((imgUrl,index) => <img src={imgUrl} alt="index" onClick={() => viewPic({imgUrl})} />) : null 
                            }
                        </div>
                    </WBlock>
                </div>
            </Scroll>   
        </Container>
    )
}

export default React.memo(CheckNo)