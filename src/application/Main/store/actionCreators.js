// 放不同 action 的地方
// 编写不同的 action 逻辑

import * as actionTypes from './constants';
import { fromJS } from 'immutable';// 将 JS 对象转换成 immutable 对象
import { getMainInfoRequest, getUserRankRequest } from '../../../api/request';
import showLoading from 'gdt-jsapi/showLoading';
import hideLoading from 'gdt-jsapi/hideLoading';

export const changeMainInfo = data => ({
  type: actionTypes.CHANGE_MAIN,
  data: fromJS(data)
})
export const changeRankInfo = data => ({
  type: actionTypes.CHANGE_RANK,
  data: fromJS(data)
})

//异步获取数据
export const getMainInfo= (params) => {
  return (dispatch) => {
      showLoading({text: "数据加载中"})
      getMainInfoRequest(params).then(data => {
          hideLoading()
          if(data.code === '1') {
            dispatch(changeMainInfo(data.data));
          } else {
            console.log("首页请求失败,",data.desc)
          }
      }).catch(() => {
          console.log ("首页数据传输错误");
      }) 
  }
}
export const getRankInfo= (params) => {
  return (dispatch) => {
      getUserRankRequest(params).then(data => {
          if(data.code === '1') {
            dispatch(changeRankInfo(data.data[0]));
          } else {
            console.log("请求失败,",data.desc)
          }
      }).catch(() => {
          console.log ("数据传输错误");
      }) 
  }
}

