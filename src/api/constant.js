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
//数据请求地址
export const MOCK_TEST = '/test/getmock'