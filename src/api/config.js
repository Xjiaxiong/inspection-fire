import axios from 'axios'
import authConfig from 'gdt-jsapi/authConfig'
import { getTicket } from './request'
// import setStorageItem from 'gdt-jsapi/setStorageItem'

export const baseUrl = '/api' 
//export const baseUrl = 'https://czw.menhey.cn'

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
      jsApiList:["getGeolocation","previewImage","getUUID"]
    }).then(res =>{
    }).catch(err =>{})
}
const storeUserInfo = (curUser) => {
    // setStorageItem({
    //     name:'person_uuid',
    //     key: curUser.fperson_uuid
    // })
    // setStorageItem({
    //     name:'person_name',
    //     key: curUser.fperson_name
    // })
    // setStorageItem({
    //     name:'depart_uuid',
    //     key: curUser.fpermaint_uuid
    // })
    // setStorageItem({
    //     name:'depart_name',
    //     key: curUser.fpermaint_name
    // })
    // setStorageItem({
    //     name:'role_uuid',
    //     key: curUser.frole_uuid
    // })
    // setStorageItem({
    //     name:'user_uuid',
    //     key: curUser.fuser_uuid
    // })
    // setStorageItem({
    //     name:'ftoken',
    //     key: curUser.ftoken
    // })
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