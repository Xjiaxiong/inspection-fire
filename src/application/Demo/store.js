
import { fromJS } from 'immutable'  // 这里用到 fromJS 把 JS 数据结构转化成 immutable 数据结构

//action 常量的定义
const INCREMENT = 'demo/INCREMENT'
const DECREMENT = 'demo/DECREMENT'

const defaultState = fromJS({
    count: 0
})

//reducers 纯函数的编写
export const reducer = (state = defaultState, action) => {
    switch (action.type) {
        case INCREMENT:
          return  state.set('count', state.getIn (['count']) + 1);
        case DECREMENT:
          return state.set('count', state.getIn (['count']) - 1);
        default:
          return state;
    }
}

//actionCreators 的创建
export const inAction = data => ({
    type: INCREMENT,
})
export const deAction = data => ({
    type: DECREMENT,
})