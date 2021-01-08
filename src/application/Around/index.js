import React, { useEffect, useState } from 'react'
import {
    ContainerBottom,
    Map,
    MapContent,
    SelectPanel
} from './style'
import { Button, Toast }from 'antd-mobile'
import fireImg from './fire.png'
import faultImg from './fault.png'
import Scroll from '../../baseUI/scroll/index'
import { get3Count, getWrapParams } from '../../api/utils'
import { getMapStatisticRequest, getAreaListRequest} from '../../api/request'
import dd from 'gdt-jsapi';

const itemData = [{
    id:'1',
    text: '联网单位',
    value: 0
},{
    id:'2',
    text: '出租私房',
    value: 0
},{
    id:'3',
    text: '高层建筑',
    value: 0
},{
    id:'4',
    text: '九小场所',
    value: 0
},{
    id:'5',
    text: '人密场所',
    value: 0
},{
    id:'6',
    text: '生产企业',
    value: 0
},{
    id:'7',
    text: '远程联网',
    value: 0
},{
    id:'8',
    text: '微型消防站',
    value: 0
},{
    id:'9',
    text: '充电桩',
    value: 0
},{
    id:'10',
    text: '公共视频',
    value: 0
},{
    id:'11',
    text: '高空瞭望',
    value: 0
},{
    id:'12',
    text: '室外消火栓',
    value: 0
},{
    id:'13',
    text: '火警告警',
    value: 0
},{
    id:'14',
    text: '电力告警',
    value: 0
},{
    id:'15',
    text: '故障消息',
    value: 0
}]
const BMap = window.BMap;
function Around(props) {
    const [itemCounts, setItemCounts] = useState(itemData)
    const [areaTop, setAreaTop] = useState(false)
    const [areaIndex, setAreaIndex] = useState('');
    const [areaList, setAreaList] = useState([])
    const [areaCode, setAreaCode] = useState('')
    const [areaFlag, setAreaFlag] = useState('01')
    const [curNameSelector,setCurNameSelector] = useState('')
    const [curName, setCurName] = useState('')
    const [curLev, setCurLev] = useState('')
    const [maxLev, setMaxLev] = useState('')
    const [maxName, setMaxName] = useState('')
    const [selectLev, setSelectLev] = useState('')
    //const [map, setMap] = useState(null);
    useEffect(() => {
        let map = new BMap.Map("map-container");
        let point = new BMap.Point(116.404, 39.915);
        map.centerAndZoom(point, 10);
        let geolocation = new BMap.Geolocation()
        geolocation.enableSDKLocation() // 允许SDK辅助
        geolocation.getCurrentPosition(function (r) {
            if (this.getStatus() === 0) {
                var point = new BMap.Point(r.longitude,r.latitude);
                map.centerAndZoom(new BMap.Point(r.longitude, r.latitude), 16);
                map.addOverlay(new BMap.Marker(point))
            }
        })
        // eslint-disable-next-line
    },[])
    useEffect(() => {
        getStatistic()
        // eslint-disable-next-line
    },[])
    useEffect(() => {
        getAreaList()
        // eslint-disable-next-line
    },[areaFlag])
    const switchArea = () => {
        setAreaTop(true)
        setAreaFlag('01')
    }
    const hidePanel = () => {
        setAreaTop(false)
    }
    const doComfirm = () => {
        setCurNameSelector(curName)
        getStatistic()
    }
    const doLink = path => {
        if(path) props.history.push(path)
    }
    const getAreaList = async () => {
        let params = {}
        if(areaFlag === '01') {
            params = {
                flag: areaFlag
            }
        } else {
            params = {
                farea_code: areaCode,
                farea_level: selectLev,
                flag: areaFlag
            }
        }
        let areaObj = await getAreaListRequest(getWrapParams(params)).catch(e => {
            Toast.fail('请求失败了',e)
        })
        if(areaObj && areaObj.code === '1') {
            let res = areaObj.data[0]
            setAreaList(res.area_list)
            setCurLev(res.farea_level)
            setCurName(res.farea_name)
            setAreaCode(res.farea_code)
            if(areaFlag === '01') {
                setMaxLev(res.farea_level)
                setMaxName(res.farea_name)
                if(!curNameSelector) {
                    setCurNameSelector(res.farea_name)
                }
            }
        }
        setAreaIndex('')
    }
    const getStatistic = async () => {
        let params = {
            farea_code: areaCode,
            farea_level: selectLev
        }
        dd.showLoading({text: "数据加载中"})
        let res = await getMapStatisticRequest(getWrapParams(params)).catch(e => {
            Toast.fail('请求失败了')
        })
        dd.hideLoading()
        if(res && res.code === '1') {
            let list = res.data.map(item => {
                return {
                    id: item.menucode,
                    text: item.menuname,
                    value: item.item_num
                }
            })
            setItemCounts(list)
        }
        setAreaTop(false)

    }
    const chooseOne = (index,areaid,level,name) => {
        setAreaIndex(index)
        setCurName(name)
        setAreaCode(areaid)
        setSelectLev(level)
    }
    const changeAreaList = (level) => {
        if(maxLev === level) {
            setAreaFlag('01')
            return
        }
        if(selectLev === level) {
            setCurLev(level)
            setAreaFlag('02')
        } else {
            Toast.info('请先选择上一行政等级')
        }
    }
    return (
        <ContainerBottom>
            <Map id='map-container'></Map>
            <MapContent>
                <div className='top'>
                    <div className='label' onClick={() => switchArea()}>{curNameSelector}</div>
                    <div className='search' onClick={() => doLink('/SearchPage')}>
                        <span>搜索项目</span>
                        <i className='iconfont'>&#xe602;</i>
                    </div>
                </div>
                <ul className='item-group'>
                    {
                        // eslint-disable-next-line
                        itemCounts.map((item, index) => {
                            if(index <= 11 ) {
                                return (
                                    <li key={item.id}>
                                        <p>{item.value}</p>
                                        <div>{item.text}</div>
                                    </li>
                                )
                            }
                        })
                        
                    }
                </ul>
                <ul className='alarm-panel'>
                    <li>
                        <img src={fireImg} alt=""/>
                        <p>火警告警</p>
                        {itemCounts.length === 0 ? null : <span>{get3Count(itemCounts[12].value)}</span>}
                    </li>
                    <li>
                        <img src={fireImg} alt=""/>
                        <p>电力告警</p>
                        {itemCounts.length === 0 ? null : <span>{get3Count(itemCounts[13].value)}</span>}
                    </li>
                    <li>
                        <img src={faultImg} alt=""/>
                        <p>故障消息</p>
                        {itemCounts.length === 0 ? null : <span>{get3Count(itemCounts[14].value)}</span>}
                    </li>
                </ul>
            </MapContent>
            <SelectPanel top={areaTop?'50px':'100%'}>
                <div className='top'>
                    您当前选择的是: {curName}
                </div>
                <div className='condition-row'>
                    <div className='area-type' onClick={() => changeAreaList(maxLev)} style={curLev === maxLev ? {color:'#3296FA'}:{}}>
                        {maxName}
                        <i className='caret'></i>
                    </div>
                    {
                        maxLev === "2" ? (
                            <div className='area-type' onClick={() => changeAreaList('3')} style={curLev === '3' ? {color:'#3296FA'}:{}}>
                                乡镇选择
                                <i className='caret'></i>
                            </div>
                        ) : null
                    }
                    <div className='area-type' onClick={() => changeAreaList('4')} style={curLev === '4' ? {color:'#3296FA'}:{}}>
                        街道选择
                        <i className='caret'></i>
                    </div>
                </div>
                <ul className='area-list-body'>
                    <Scroll refresh>
                        <div>
                            { areaList.map((item, index) => (
                                <li 
                                key={item.farea_code} 
                                onClick={() => chooseOne(index, item.farea_code, item.farea_level,item.farea_name)}>
                                    {item.farea_name}
                                    {areaIndex === index ? <i className='iconfont right'>&#xe6cf;</i> : null}
                                </li>
                            )) }
                        </div>
                    </Scroll>
                </ul>
                <div className='btns'>
                    <div className='btn'>
                        <Button type='primary' onClick={() => hidePanel()}>取消</Button>
                    </div>
                    <div className='btn'>
                        <Button type='primary' onClick={() => doComfirm()}>确定</Button>
                    </div>
                </div>
            </SelectPanel>     
        </ContainerBottom>
    )
}

export default React.memo(Around) 