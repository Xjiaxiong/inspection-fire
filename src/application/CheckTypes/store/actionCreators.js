// 放不同 action 的地方
// 编写不同的 action 逻辑

import * as actionTypes from './constants';
import { fromJS } from 'immutable';// 将 JS 对象转换成 immutable 对象
import { getCheckTypesRequest } from '../../../api/request';
import dd from 'gdt-jsapi';

export const changeList = data => ({
  type: actionTypes.CHANGE_LIST,
  data: fromJS(data)
})

//异步获取数据
export const getCheckTypes= (params) => {
  return (dispatch) => {
    dd.showLoading({text: "数据加载中"})
    getCheckTypesRequest(params).then(data => {
          dd.hideLoading()
          if(data.code === "1") {
            dispatch(changeList(data.data));
          } else {
            console.log("检查类型查询失败,",data.desc)
          }
      }).catch(() => {
          console.log ("检查类型传输错误");
      }) 
  }
}


