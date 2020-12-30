// 存放 initialState 和 reducer 函数
import * as actionTypes from './constants'
// 这里用到 fromJS 把 JS 数据结构转化成 immutable 数据结构
import { fromJS } from 'immutable'  

const defaultState = fromJS ({
    checkTypeList: [],
    enterLoading: true
});

export default (state = defaultState, action) => {  
    switch(action.type) {
        case actionTypes.CHANGE_LIST:
            return state.set('checkTypeList', action.data);
        case actionTypes.CHANGE_ENTER_LOADING:
            return state.set('enterLoading',action.data)
        default:
            return state
    }
}