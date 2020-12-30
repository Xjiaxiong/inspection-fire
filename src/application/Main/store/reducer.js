// 存放 initialState 和 reducer 函数
import * as actionTypes from './constants'
import { fromJS } from 'immutable'  // 这里用到 fromJS 把 JS 数据结构转化成 immutable 数据结构

const defaultState = fromJS ({
    rankInfo: {},
    mainInfo: [],
});

export default (state = defaultState, action) => {  
    switch(action.type) {
        case actionTypes.CHANGE_MAIN:
            return state.set('mainInfo', action.data);
        case actionTypes.CHANGE_RANK:
            return state.set('rankInfo', action.data);
        default:
            return state
    }
}