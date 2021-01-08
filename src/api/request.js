import { axiosInstance } from './config'
import * as API from './constant'
//测试
export const getUserByAuthMock = () => {
    return axiosInstance.get(`${API.MOCK_TEST}`)
}

//登陆,JSAPI鉴权相关
export const getUserByAuthCode = auth_code => {
    return axiosInstance.get(`/zwDing/getUserInfo?auth_code=${auth_code}`)
}
export const getTicket = () => {
    return axiosInstance.get(`/zwDing/getTicket`)   
}
export const getEmployeeByCode = (employeeCode, tenantId) => {
    return axiosInstance.get(`/zwDing/getEmployeeByCode?employeeCode=${employeeCode}&tenantId=${tenantId}`)  
}
export const getAvatar = media_id => {
    return axiosInstance.get(`/zwDing/getAvatar?media_id=${media_id}`)
}
export const getUserListByOpenId = params => {
    return axiosInstance.post(`/wdk?action=obj.dingaction&method=getUserList`, params, {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    })
}
export const LoginRequest = params => {
    return axiosInstance.post(`/wdk?action=obj.dingaction&method=bingUserDing`,params,{
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    })
}

//首页
export const getMainInfoRequest = params => {
    return axiosInstance.post(`/wdk?action=obj.smarteyeaction&method=getMapStatistic`,params)
}

//日常巡查录入相关
export const getCheckTypesRequest = params => {
    return axiosInstance.post(`/wdk?action=obj.mhareanewaction&method=getTargetClassify`,params)
}
export const submitGridRecordDtl = params => {
    return axiosInstance.post(`/wdk?action=obj.smarteyenewaction&method=uploadGridRecordDtl`, params)
}
export const getSurroundingProjectDtl = params => {
    return axiosInstance.post(`/wdk?action=obj.smarteyenewaction&method=surroundingProject`, params)
}
export const getProjectBySearchKey = params => {
    return axiosInstance.post(`/wdk?action=obj.smarteyenewaction&method=demandProject`, params)
}

//获取单位信息，以及其检查模板信息
export const getCheckTempRequest = params => {
    return axiosInstance.post(`/wdk?action=obj.smarteyenewaction&method=getRecordDtl`,params)
}

//根据关键字查询社会单位简要信息
export const getPartbriefByKeyRequest = params => {
    return axiosInstance.post(`/wdk?action=obj.smarteyenewaction&method=demandProjectZZD`,params)
}
export const getPartChecksRela = params => {
    return axiosInstance.post(`/wdk?action=obj.mhareaaction&method=getSocialInfo`,params)
}

//隐患统计相关
export const getHiddenStationsRequest = params => {
    return axiosInstance.post(`/wdk?action=obj.hdcorrect&method=hiddenTroubleStations`,params)
}
export const getHiddenStaRequest = params => {
    return axiosInstance.post(`/wdk?action=obj.hdcorrect&method=hiddenRectifyStatistics`,params)
}
export const getHiddenFixDetailRequest = params => {
    return axiosInstance.post(`/wdk?action=obj.socialaloneexamine&method=getHiddenInfo`,params)
}
export const superviseOnceRequest = params => {
    return axiosInstance.post(`/wdk?action=obj.hdcorrect&method=atOnceSupervises`,params)
}
 

//图片上传
export const upImgRequest = params => {
    return axiosInstance.post(`/wdk?action=wdk.public&method=multiattachmentupload`,params,{
            headers: {
            'Content-Type': 'multipart/form-data'
        }
    })
}

//巡查记录功能业务
export const getPatrolRecordRequest = params => {
    return axiosInstance.post(`/wdk?action=obj.smarteyeaction&method=patrolRecord`,params)
}
export const getPatrolRecordDetailRequest = params => {
    return axiosInstance.post(`/wdk?action=obj.mhareaactionyuhuan&method=patrolRecordInfo`,params)
}
export const getPatrolDetailsRequest = params => {
    return axiosInstance.post(`/wdk?action=obj.smarteyeaction&method=GridSocialPatrolHistoryDetail`,params)
}

//地图页面相关
export const getAreaListRequest = params => {
    return axiosInstance.post(`/wdk?action=obj.smarteyeaction&method=queryAreaAuthorityData`,params)
}
export const getMapStatisticRequest = params => {
    return axiosInstance.post(`/wdk?action=obj.smarteyeaction&method=getMapStatistic`,params)
}
export const getMapDataRequest = params => {
    return axiosInstance.post(`/wdk?action=obj.smarteyeaction&method=queryMapData`,params)
}
//修改密码  
export const changePasswordRequest = params => {
    //login_pwd
    return axiosInstance.post(`/wdk?action=obj.mhaction&method=changePassword`,params)
}
export const changeNewPasswordRequest = params => {
    //login_old_pwd
    //login_pwd
    return axiosInstance.post(`/wdk?action=obj.mhaction&method=changeNewPassword`,params)
}

//检查人审核接口
export const RestartRectsRequest = params => {
    return axiosInstance.post(`/wdk?action=obj.hdcorrect&method=restartRects`,params)
}
export const PassRectsRequest = params => {
    return axiosInstance.post(`/wdk?action=obj.hdcorrect&method=passRects`,params)
}

//获取用户积分排名 
export const getUserRankRequest = params => {
    return axiosInstance.post(`/wdk?action=obj.mhareanewaction&method=getRankingAndIntegral`,params)
}


