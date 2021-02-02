import { axiosInstance } from './config'
import { _API } from './constant'
//测试
export const getUserByAuthMock = () => {
    return axiosInstance.get(`${_API.MOCK_TEST}`)
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
export const getSysPatrolDayRequest = params => {
    return axiosInstance.post(`/wdk?action=obj.monitoraction&method=getSysPatrolDaylist`,params)
}
export const getPatrolTypeRequest = params => {
    return axiosInstance.post(`/wdk?action=obj.isaappaction&method=getPatrolType`,params)
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
    return axiosInstance.post(_API.COMFIRM_PWD,params)
}
export const changeNewPasswordRequest = params => {
    //login_old_pwd
    //login_pwd
    return axiosInstance.post(_API.UPDATE_PWD,params)
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


export const getExceptionMsg = params => {
    return axiosInstance.post(_API.GET_EXCEPTION_MSG ,params)
}
export const getProjectInfor = params => {
    return axiosInstance.post(_API.GET_PROJECT_INFO ,params)
}
export const getProjectRank = params => {
    return axiosInstance.post(_API.GET_PART_RANK ,params)
}
export const getProjectMessageList = params => {
    return axiosInstance.post(_API.GET_PROJECT_MSG ,params)
}
export const getWirelessHost = params => {
    return axiosInstance.post(_API.GET_WIRELESS_HOST ,params)
}
export const getInstallInformation = params => {
    return axiosInstance.post(_API.GET_SET_INFO ,params)
}
export const getEquipmentInfo = params => {
    return axiosInstance.post(_API.GET_EQUIPMENT_INFO ,params)
}
export const getGridSocialPatrolHistory = params => {
    return axiosInstance.post(_API.GET_PATROL_HISTORY ,params)
}
export const getParts = params => {
    return axiosInstance.post(_API.GET_PARTS ,params)
}
export const DelPartbyId = params => {
    return axiosInstance.post(_API.DEL_PART ,params)
}
export const getPartUnitTypes = params => {
    return axiosInstance.post(_API.GET_PART_UNIT_TYPE ,params)
}
export const addPartRequest = params => {
    return axiosInstance.post(_API.ADD_PART ,params)
}
export const getPartInfoRequest = params => {
    return axiosInstance.post(_API.GET_PART_INFO ,params)
}
export const updatePartInfoRequest = params => {
    return axiosInstance.post(_API.UPDATE_PART_INFO ,params)
}
export const getAppTypeRequest = params => {
    return axiosInstance.post(_API.GET_APP_TYPE ,params)
}

export const getFireList = params => {
    return axiosInstance.post(_API.GET_FIRE_LIST ,params)
}
export const getFireRecordInfo = params => {
    return axiosInstance.post(_API.GET_FIRE_RECORDINFO ,params)
}
export const getWbTypes = params => {
    return axiosInstance.post(_API.GET_WB_TYPE ,params)
}
export const getComfirmTypes = params => {
    return axiosInstance.post(_API.GET_COMFIRM_TYPE ,params)
}
export const dealFireRequest = params => {
    return axiosInstance.post(_API.DEAL_FIRE ,params)
}
export const rescueRecordTypeInRequest = params => {
    return axiosInstance.post(_API.TYPEIN_RESCUE ,params)
}
export const getAreaFilterStatistic = params => {
    return axiosInstance.post(_API.GET_AREA_FILTER ,params)
}
export const getEntityListRequest = params => {
    return axiosInstance.post(_API.GET_ENTITY_LIST ,params)
}
export const getMiniStationRequest = params => {
    return axiosInstance.post(_API.GET_MINI_STATION ,params)
}
export const getChargingPileRequest = params => {
    return axiosInstance.post(_API.GET_CHARGING_PILE ,params)
}
export const getOutDydrantRequest = params => {
    return axiosInstance.post(_API.GET_OUT_DYDRANT ,params)
}
export const getCamerasRequest = params => {
    return axiosInstance.post(_API.GET_CAMERAS, params)
}
export const getElecStaRequest = params => {
    return axiosInstance.post(`/wdk?action=obj.powersystemaction&method=getPowerSystemData`, params)
}
export const getPowerStatusListRequest = params => {
    return axiosInstance.post(`/wdk?action=obj.powersystemaction&method=getPowerDevList`, params)
}
export const getSysPatrolDayDetailRequest = params => {
    return axiosInstance.post(`/wdk?action=obj.isaappaction&method=getSysPatrolDayDetail`, params)
}



