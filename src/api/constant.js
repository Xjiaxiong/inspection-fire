import dayjs from 'dayjs'

export const _OSS = 'http://menheyoss.oss-cn-hangzhou.aliyuncs.com/'
export const formatQueryDate = date => {
    return dayjs(date).format('YYYYMMDD');
}
export const formatDate = (date, formatStr) => {
    if(!date) {
        return ''
    }
    if(date.length === 14) {
        return `${date.substring(0,4)}-${date.substring(4,6)}-${date.substring(6,8)} ${date.substring(8,10)}:${date.substring(10,12)}`
    }
    return dayjs(date).format(formatStr);
}
export const formatDateTomm = (date) => {
    if(!date) return `--`
    let mm = `${date.substring(0,4)}-${date.substring(4,6)}-${date.substring(6,8)} ${date.substring(8,10)}:${date.substring(10,12)}:${date.substring(12,14)}`
    return mm
}
export const curMonth = dayjs().month() + 1;
export const curDay = dayjs().format('YYYY-MM-DD');
export const months  = [{
    value: 1,
    label: '1月'
},{
    value: 2,
    label: '2月'
}
,{
    value: 3,
    label: '3月'
}
,{
    value: 4,
    label: '4月'
}
,{
    value: 5,
    label: '5月'
}
,{
    value: 6,
    label: '6月'
}
,{
    value: 7,
    label: '7月'
}
,{
    value: 8,
    label: '8月'
}
,{
    value: 9,
    label: '9月'
},{
    value: 10,
    label: '10月'
}
,{
    value: 11,
    label: '11月'
},{
    value: 12,
    label: '12月'
}]

export const UnitTypeMapCode = {
    "G7801": "居住出租屋",
    "G7802": "九小场所",
    "G7803": "生产企业",
    "G7804": "高层建筑",
    "G7806": "行政村",
    "G7807": "人密场所",
    "G7808": "国家机关事业单位",
    "G7809": "民宅"
}
export const zwTypeMap = {
    "M10":"联网单位",
    "M11":"生产企业",
    "M12":"出租私房",
    "M13":"九小场所",
    "M14":"高层建筑",
    "M15":"人密场所",

    "M30":"微型消防站",
    "M31":"室外消火栓",
    "M32":"公共视频",  //**重点关注 */
    "M33":"充电桩",
    "M34":"远程联网",
    "M36":"高空瞭望", //**重点关注 */
}
//数据请求地址
export const _API = {
    COMFIRM_PWD: '/wdk?action=obj.mhaction&method=changePassword',
    UPDATE_PWD: '/wdk?action=obj.mhaction&method=changeNewPassword',
    GET_EXCEPTION_MSG: '/wdk?action=obj.smarteyeaction&method=getExceptionMsg',
    GET_PROJECT_INFO: '/wdk?action=obj.mhareaaction&method=queryProjectInfor',
    GET_PART_RANK: '/wdk?action=obj.smarteyenewaction&method=getRecordDtl',
    GET_PROJECT_MSG: '/wdk?action=obj.smarteyeaction&method=getProjectMessageList',
    GET_WIRELESS_HOST: '/wdk?action=obj.mhshaction&method=getWirelessHost',
    GET_SET_INFO: '/wdk?action=obj.smarteyeaction&method=installInformation',
    GET_EQUIPMENT_INFO: '/wdk?action=obj.smarteyeaction&method=equipmentInfo',
    GET_PATROL_HISTORY: '/wdk?action=obj.smarteyeaction&method=GridSocialPatrolHistory',
    GET_PARTS: '/wdk?action=obj.mhareaactionyuhuan&method=getNotInternetSocial',
    ADD_PART: '/wdk?action=obj.mhareaactionyuhuan&method=saveNewSocial', 
    DEL_PART: '/wdk?action=obj.mhareaaction&method=stopSocial',
    UPDATE_PART_INFO: '/wdk?action=obj.mhareaaction&method=amendProjectInfo',
    GET_PART_INFO: '/wdk?action=obj.mhareaaction&method=getProjectInfo',
    GET_PART_UNIT_TYPE: '/wdk?action=obj.mhareaaction&method=getScreeningCondition',
    GET_APP_TYPE: '/wdk?action=obj.mhareaaction&method=getAppType',
    GET_FIRE_LIST: '/wdk?action=obj.smarteyeaction&method=fireRecord',
    GET_FIRE_RECORDINFO: '/wdk?action=obj.smarteyeaction&method=fireRecordInfo',
    GET_WB_TYPE: '/wdk?action=obj.isaappaction&method=getMisdeclarationType',
    GET_COMFIRM_TYPE: '/wdk?action=obj.isaappaction&method=alarmMessageHasConfirmd',
    DEAL_FIRE: '/wdk?action=obj.isaappaction&method=confirmFireAlarm',
    TYPEIN_RESCUE: '/wdk?action=obj.smarteyeaction&method=rescueRecordTypeIn',
    GET_AREA_FILTER: '/wdk?action=obj.smarteyeaction&method=getAreaFilterStatistic',
    GET_ENTITY_LIST: '/wdk?action=obj.smarteyeaction&method=getFilterProjectList',
    GET_MINI_STATION: '/wdk?action=obj.smarteyeaction&method=queryMicroStateMarkerDetail',
    GET_CHARGING_PILE: '/wdk?action=obj.smarteyeaction&method=queryChargingPileMarkerDetail',
    GET_OUT_DYDRANT: '/wdk?action=obj.smarteyeaction&method=queryFireDydrantMarkerDetail',
    GET_CAMERAS: '/wdk?action=obj.smarteyeaction&method=queryComCameraMarkerDetail',
    GET_MAP_DATA: '/wdk?action=obj.smarteyeaction&method=queryMapData'
}