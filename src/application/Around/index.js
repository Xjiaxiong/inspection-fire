import React, { useEffect, useState } from 'react'
import {
    ContainerBottom,
    Map,
    MapContent,
    SelectPanel
} from './style'
import { Button, Toast }from 'antd-mobile'
import fireImg from '../../assets/imgs/fire.png'
import faultImg from '../../assets/imgs/fault.png'
import Scroll from '../../baseUI/scroll/index'
import { get3Count, getWrapParams } from '../../api/utils'
import elecImg from '../../assets/imgs/elec.png'
import { getMapStatisticRequest, getAreaListRequest, getMapDataRequest} from '../../api/request'
import PopList from '../../baseUI/popList/index'
import dd from 'gdt-jsapi';
import { itemData, getImgByType, sytlesCluster } from './constant'
import showLoading from 'gdt-jsapi/showLoading'
import hideLoading from 'gdt-jsapi/hideLoading'
import alert from 'gdt-jsapi/alert'
// import MarkerClusterManager from './MarkerClusterManager'
// const BMap = window.BMap;
// const BMapLib = window.BMapLib;
const AMap = window.AMap;
let map = null;
let markerClusterer = null;

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
    const [alarmShow, setAlarmShow] = useState(false)
    const [mType, setMType] = useState('M20');
    useEffect(() => {
        map = new AMap.Map("map-container",{
            zoom: 10,
            viewMode: '2D',
            center: [116.397428, 39.90923] 
        });
        AMap.plugin('AMap.Geolocation', function() {
            let geolocation = new AMap.Geolocation({
              // 是否使用高精度定位，默认：true
              enableHighAccuracy: true,
              // 设置定位超时时间，默认：无穷大
              timeout: 10000,
              // 定位按钮的停靠位置的偏移量，默认：Pixel(10, 20)
              buttonOffset: new AMap.Pixel(10, 20),
              //  定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
              zoomToAccuracy: true,     
              //  定位按钮的排放位置,  RB表示右下
              buttonPosition: 'LB',
              showMarker: true,        //定位成功后在定位到的位置显示点标记，默认：true
              showCircle: true,        //定位成功后用圆圈表示定位精度范围，默认：true
            })
            map.addControl(geolocation);
            geolocation.getCurrentPosition(function(status,result){
                  if(status === 'complete'){
                      onComplete(result)
                  }else{
                      onError(result)
                  }
            });
          
            function onComplete (data) {
              // data是具体的定位信息
              console.log("onComplete---",data)
            }
          
            function onError (data) {
              // 定位出错
                console.log("onError---",data)
                alert({
                    message: "定位fail"
                })
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
    const showList = (flag) => {
        setMType(flag)
        setAlarmShow(true)
    }
    const hidePop = () => {
        setAlarmShow(false)
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
        console.log('res---',res)
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
    const myRenderMarker = (context) => {
        const type = context.data[0].type;
        const IconType = getImgByType(type)
        let imgIcon = new AMap.Icon({
            size: new AMap.Size(32, 32),
            image: require(`./imgs/${IconType}`).default,
            imageSize: new AMap.Size(32, 32),
            // imageOffset: new AMap.Pixel(-95, -3)
        });
        let offset = new AMap.Pixel(-9, -9);
        context.marker.setOffset(offset)
        context.marker.setIcon(imgIcon)
        context.marker.on('click',function() {
            console.log("context---", context.data[0].type)
            console.log("context---", context.data[0].uuid)
            viewDetail(context.data[0].uuid,type)
        })
    }
    const upDataMap = async (type) => {
        //根据type在地图上显示数据, 聚合, 打点, 能点击
        showLoading({text:"数据请求中..."});
        let res = await getMapDataRequest(getWrapParams({
            mtype: type,
            farea_level: curLev,
            farea_code: areaCode,
            isAMap: 'amap'
        }))
        hideLoading();
        if(res && res.code === '1') {
            map.plugin(["AMap.MarkerClusterer"], function () {
                let re = res.data;
                let item = null;
                let MAX = re.length;
                let points = [];
                let pt = null;
                let i = 0;
                for (; i < MAX; i++) {
                    item = re[i]
                    pt = {
                        lnglat:[item.o,item.a],
                        uuid: item.i,
                        type,
                    }
    
                    points.push(pt);
                }
                if(markerClusterer) {
                    markerClusterer.setMap(null);
                }
                markerClusterer = new AMap.MarkerCluster(map, points, {
                    styles: sytlesCluster,
                    gridSize: 60,
                    renderMarker: myRenderMarker, // 自定义非聚合点样式 
                });
            });

        }

    }
    const viewDetail = (uuid, mType) => {
        //涉及到视频特殊处理
        //根据不同的类型展示不同的界面
        const partTypes = ['M10','M11','M12','M13','M14','M15']
        let url = ''
        localStorage.setItem("mType", mType)
        if(partTypes.includes(mType)) {
            url = `/ProjectDetail?fproject_uuid=${uuid}`
        } else {
            url = `/EntityDetail?fuuid=${uuid}`
        }
        props.history.push(url)
    }
    const toProject = (fproject_uuid) => {
        //跳转到项目详情页
        props.history.push(`/ProjectDetail?fproject_uuid=${fproject_uuid}`)
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
                                    <li key={item.id} onClick={() => upDataMap(item.id)}>
                                        <p>{item.value}</p>
                                        <div>{item.text}</div>
                                    </li>
                                )
                            }
                        })
                        
                    }
                </ul>
                <ul className='alarm-panel'>
                    <li onClick={() => showList('M20')}>
                        <img src={fireImg} alt=""/>
                        <p>火警告警</p>
                        {!itemCounts[13] ? null : <span>{get3Count(itemCounts[13].value)}</span>}
                    </li>
                    <li onClick={() => showList('M21')}>
                        <img src={elecImg} alt=""/>
                        <p>电力告警</p>
                        {!itemCounts[14] ? null : <span>{get3Count(itemCounts[14].value)}</span>}
                    </li>
                    <li onClick={() => showList('M22')}>
                        <img src={faultImg} alt=""/>
                        <p>故障消息</p>
                        {!itemCounts[15] ? null : <span>{get3Count(itemCounts[15].value)}</span>}
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
            <PopList mtype={mType} show={alarmShow} hidePop={hidePop} toProject={toProject}></PopList>     
        </ContainerBottom>
    )
}

export default React.memo(Around) 