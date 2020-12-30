import React, { useState, useEffect } from 'react'
import {
    Container,
    Title,
    Top,
    WBlock,
    CheckList
} from './style'
import { Toast } from "antd-mobile";
import Scroll from '../../baseUI/scroll/index'
import echarts from 'echarts';
import { getPatrolDetailsRequest } from '../../api/request'
import { getWrapParams, GetQuery } from '../../api/utils'
import { _OSS } from '../../api/constant'
import showLoading from 'gdt-jsapi/showLoading'
import hideLoading from 'gdt-jsapi/hideLoading'
import previewImage from 'gdt-jsapi/previewImage'
import alert from 'gdt-jsapi/alert'

function ChecksDetail(props) {
    const [base, setBase] = useState(null)
    const [records, setRecords] = useState([])
    const Querys = GetQuery(props.location.search)
    useEffect(()=>{
        initPage()
        // eslint-disable-next-line
    },[])
    useEffect(() => {
        if(base) {
            initPie()
        }
        // eslint-disable-next-line
    },[base])
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
    const initPie = ()=> { 
        let myChart = echarts.init(document.getElementById('mountNode'));
        const option = {
            textStyle: {
                color: '#fff'
            },
            series: [
                {
                    name: '得分',
                    type: 'pie',
                    radius: ['70%', '90%'],
                    avoidLabelOverlap: true,
                    label: {
                        show: true,
                        position: 'center',
                        formatter: '{c}{b}',
                        fontSize: '32',
                        fontWeight: 'bold'
                    },
                    labelLine: {
                        show: false
                    },
                    data: [
                        {
                            value: base ? parseInt(base.fcurrent_score): 0,
                            name: '分',
                            itemStyle: {
                                color: '#538fef'
                            }
                        },
                        {
                            value: base ? parseInt(base.deduct_score): 0,
                            name: '扣分',
                            label: {
                                show: false
                            }
                        },
                    ]
                }
            ]
        };
        myChart.setOption(option)
    }

    const initPage = async () => {
        showLoading({text:'数据查询中...'})
        try {   
            let res = await getPatrolDetailsRequest(getWrapParams({
                "fgridrecordmain_uuid": Querys.fgridrecordmain_uuid,
            }))
            hideLoading()
            if(res.code === '1') {
                setBase(res.data)
                setRecords(res.data.standard_list)
            }
        } catch (e) {
            Toast.fail('数据加载失败')
        }
    }
    const renderRecords = () => {
        if(records.length === 0) {
            return null
        }
        return (
            <CheckList>
                {
                    records.map(item => (
                        <div 
                        className='check-item' 
                        key={item.fstandard_uuid}>
                            <i className={item.fis_exception === "0" ? 'state-bar normal': 'state-bar abnormal'}></i>
                            <div className='text'>{item.fstandard_name}</div>
                            <div className='desc'>{item.fcheck_standard}</div>
                            {
                                item.fis_exception === "0" ? null :(
                                    <ul className='list-info'>
                                        <li>
                                            <div className='title'>所扣分数</div>
                                            <div className='value'>-{item.fdeduct_score}分</div>
                                        </li>
                                        <li>
                                            <div className='title'>检查部位</div>
                                            <div className='value'>{item.fcheck_location}</div>
                                        </li>
                                        <li className='col'>
                                            <div className='title'>图片</div>
                                            <div className='imgs'>
                                                {
                                                    item.fattach_list.map(img => (
                                                        <img 
                                                        key={img.fattach_index}
                                                        onClick={() => viewPic(`${_OSS+img.fattach_name}`)} 
                                                        src={`${_OSS+img.fattach_name}`} alt=""/>
                                                    ))
                                                }
                                            </div>
                                        </li>
                                    </ul>
                                )
                            }
                        </div>
                    ))
                }
            </CheckList> 
        )
    }
    return (
        <Container>
            <Scroll refresh>
                <div>
                    <Top>
                        <div className='count-box'>
                            <p className='number'>{base?base.ftotal_score:100}</p>
                            <p className='label'>总分</p>
                        </div>
                        <div id="mountNode"></div>
                        <div className='count-box'>
                            <p className='number color-red'>{base?base.deduct_score:0}</p>
                            <p className='label'>扣分</p>
                        </div>
                    </Top>
                    <WBlock>
                        <p className='text'>{base?base.fsocial_name:'暂无数据'}</p>
                        <p className='desc'>
                            <i className='iconfont'>&#xe603;</i>
                            {base?base.faddress:'暂无数据'}
                        </p>
                    </WBlock>
                    <Title>评分项列表</Title>
                    { renderRecords() }
                </div>
            </Scroll>   
        </Container>
    )
}

export default React.memo(ChecksDetail)