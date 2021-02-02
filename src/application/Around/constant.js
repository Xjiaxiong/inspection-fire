const AMap = window.AMap;
export const getImgByType = type => {
    switch(type) {
        case 'M10':
            return 'lwdw.png'
        case 'M11':
            return 'scqy.png'
        case 'M12':
            return 'czw.png'
        case 'M13':
            return 'jxcs.png'
        case 'M14':
            return 'gcjz.png'
        case 'M15':
            return 'rmcs.png'
        case 'M30':
            return 'ico_xfz.png'
        case 'M31':
            return 'ico_xhs.png'
        case 'M32':
            return 'ico_jk.png'
        case 'M33':
            return 'marker_charging_pile.png'
        case 'M34':
            return 'marker_charging_pile.png'
        case 'M36':
            return 'ico_jk.png'
        default:
            return 'gcjz.png'
    }
}

export const itemData = [{
    id:'0',
    text: '联网单位',
    value: 0
},{
    id:'1',
    text: '出租私房',
    value: 0
},{
    id:'2',
    text: '高层建筑',
    value: 0
},{
    id:'3',
    text: '九小场所',
    value: 0
},{
    id:'4',
    text: '人密场所',
    value: 0
},{
    id:'5',
    text: '生产企业',
    value: 0
},{
    id:'6',
    text: '远程联网',
    value: 0
},{
    id:'7',
    text: '微型消防站',
    value: 0
},{
    id:'8',
    text: '充电桩',
    value: 0
},{
    id:'9',
    text: '公共视频',
    value: 0
},{
    id:'10',
    text: '高空瞭望',
    value: 0
},{
    id:'11',
    text: '室外消火栓',
    value: 0
},{
    id:'12',
    text: '火警告警',
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
export const sytlesCluster = [{
    url: "https://a.amap.com/jsapi_demos/static/images/blue.png",
    size: new AMap.Size(32, 32),
    offset: new AMap.Pixel(-16, -16)
}, {
    url: "https://a.amap.com/jsapi_demos/static/images/green.png",
    size: new AMap.Size(32, 32),
    offset: new AMap.Pixel(-16, -16)
}, {
    url: "https://a.amap.com/jsapi_demos/static/images/orange.png",
    size: new AMap.Size(36, 36),
    offset: new AMap.Pixel(-18, -18)
}, {
    url: "https://a.amap.com/jsapi_demos/static/images/red.png",
    size: new AMap.Size(48, 48),
    offset: new AMap.Pixel(-24, -24)
}, {
    url: "https://a.amap.com/jsapi_demos/static/images/darkRed.png",
    size: new AMap.Size(48, 48),
    offset: new AMap.Pixel(-24, -24)
}];