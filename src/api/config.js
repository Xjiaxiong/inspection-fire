import axios from 'axios'
import authConfig from 'gdt-jsapi/authConfig'
import { getTicket } from './request'
import getGeolocation from 'gdt-jsapi/getGeolocation'

export const baseUrl = '/api' 
//export const baseUrl = 'https://czw.menhey.cn'
global.constans = {
    tabStateSelf: 0,
    tabStatePatrol: 0,
    tabStateHidden: 0
}
const _config = {
    corpId: '53441', //企业ID
}
//axios 的实例及拦截器配置
const axiosInstance = axios.create({
    baseURL: baseUrl,
    timeout: 60*1000,
})

axiosInstance.interceptors.response.use(
    res => res.data,
    err => {
        console.log(err,'网络错误')
    }
)
//gdt-api 授权
const doAuthConfig = async () => {
    let resTicket = await getTicket()
    const { accessToken } = resTicket.data;
    authConfig({
      ticket: accessToken,
      jsApiList:["getGeolocation","previewImage","getUUID","locateOnMap","searchOnMap"]
    }).then(res =>{
        getPos()
    }).catch(err =>{})
}
const getPos = async () => {
    let res = await getGeolocation({
        targetAccuracy : 200,
        coordinate : 1,
        withReGeocode : false,
        useCache: false, //默认是true，如果需要频繁获取地理位置，请设置false
    }).catch(err => {})
    const { longitude, latitude } = res;
    localStorage.setItem('longitude', longitude);
    localStorage.setItem('latitude', latitude);
}
const storeUserInfo = (curUser) => {
    localStorage.setItem('person_uuid', curUser.fperson_uuid);
    localStorage.setItem('person_name', curUser.fperson_name);
    localStorage.setItem('depart_uuid', curUser.fpermaint_uuid);
    localStorage.setItem('depart_name', curUser.fpermaint_name);
    localStorage.setItem('role_uuid', curUser.frole_uuid);
    localStorage.setItem('user_uuid', curUser.fuser_uuid);
    localStorage.setItem('ftoken', curUser.ftoken);
    localStorage.setItem('province_code', curUser.fprovince_id);
    doAuthConfig()
}
export {
    doAuthConfig,
    storeUserInfo,
    axiosInstance,
    _config
}