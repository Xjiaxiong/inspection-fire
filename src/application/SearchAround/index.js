import React, { useEffect, useState } from 'react';
import {
    Container,
    Desc,
    SearchBox,
    Around
} from './style'


import Scroll from "../../baseUI/scroll/index"
import { getWrapParams, GetQuery } from "../../api/utils";
import { getSurroundingProjectDtl } from '../../api/request'
import getGeolocation from 'gdt-jsapi/getGeolocation'
import showLoading from 'gdt-jsapi/showLoading'
import hideLoading from 'gdt-jsapi/hideLoading'
import alert from 'gdt-jsapi/alert' 

function SearchAround(props) {
    const querys = GetQuery(props.location.search)
    const [list, setList] = useState([])
    useEffect(() => {
        getPos()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])
    const getSurroundings = async (lng, lat) => {
        showLoading({text:'数据查询中...'})
        let res = await getSurroundingProjectDtl(getWrapParams({
                "flongitude": lng, 
                "flatitude": lat, 
                "fsocialtype":querys.fsocialtype,  
                "fgridmodelmain_uuid":querys.fgridmodelmain_uuid,
                "lnglat_type": 'AMAP' 
                })).catch(e => {
                    console.log('请求周围失败了',e)
                })
        hideLoading()
        if(res.code === '1') {
            setList(res.data)
        }
    }
    const getPos = async () => {
        let res = await getGeolocation({
            targetAccuracy : 200,
            coordinate : 1,
            withReGeocode : false,
            useCache: false, //默认是true，如果需要频繁获取地理位置，请设置false
        }).catch(err => {
            alert({
                message: JSON.stringify(err)
            })
        })
        const { longitude, latitude } = res
        getSurroundings(longitude, latitude)
    }
    const doLink = path => {
        props.history.push(`${path}?fgridmodelmain_uuid=${querys.fgridmodelmain_uuid}&fsocialtype=${querys.fsocialtype}`)
    }
    const goCheck = uuid => {
        let path = '/UnitCheck'
        props.history.push(`${path}?fgridmodelmain_uuid=${querys.fgridmodelmain_uuid}&fsocial_id=${uuid}`)
    }
    const renderList = () => {
        if(list.length === 0) {
            return null
        }
        return (
            <ul className="list">
                {
                    list.map(item => (
                        <li key={item.fsocial_id} onClick={() => goCheck(item.fsocial_id)}>
                            <div className='row'>
                                <span className='title'>{item.fsocial_name}</span>
                                <span className='type'>{item.funit_name}</span>
                            </div>
                            <div className='row'>
                                <span className='address'>{item.faddress}</span>
                                <span className='distance'>{item.distance}</span>
                            </div>
                        </li>
                    ))
                }
        </ul>
        )
    }
    return (
        <div>
            <Container>
                <Desc>
                    <div className='img'></div>
                    <p>请输入您要检查的单位名称开始检查</p>
                </Desc>
                <SearchBox onClick={() => doLink('/SearchPanel')}>
                    <p>请输入单位名称</p>
                    <i className='iconfont color-yellow'>&#xe602;</i>
                </SearchBox>
                <header>周边单位</header>
                <Around>
                    <Scroll refresh>
                        { renderList() }
                    </Scroll>
                </Around>
            </Container>
        </div>
    )
}

export default React.memo(SearchAround)