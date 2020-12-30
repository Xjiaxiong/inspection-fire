import axios from 'axios'
import authConfig from 'gdt-jsapi/authConfig'
import { getTicket } from './request'
//import alert from 'gdt-jsapi/alert'

export const baseUrl = '/api' 
//export const baseUrl = 'http://111.0.89.21:9010/'

const _config = {
    corpId: '53441', //企业ID
}
//axios 的实例及拦截器配置
const axiosInstance = axios.create({
    baseURL: baseUrl,
    timeout: 30*1000,
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
      jsApiList:["getGeolocation","previewImage","getUUID"]
    }).then(res =>{
    }).catch(err =>{})
}
const storeUserInfo = (curUser) => {
    localStorage.setItem('person_uuid', curUser.fperson_uuid);
    localStorage.setItem('person_name', curUser.fperson_name);
    localStorage.setItem('depart_uuid', curUser.fpermaint_uuid);
    localStorage.setItem('depart_name', curUser.fpermaint_name);
    localStorage.setItem('role_uuid', curUser.frole_uuid);
    localStorage.setItem('user_uuid', curUser.fuser_uuid);
    localStorage.setItem('ftoken', curUser.ftoken);
}
export {
    doAuthConfig,
    storeUserInfo,
    axiosInstance,
    _config
}