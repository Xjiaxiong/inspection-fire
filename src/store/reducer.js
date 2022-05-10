import { combineReducers } from 'redux-immutable'
import { reducer as mainReducer } from '../application/Main/store/index';
import { reducer as checkTypesReducer } from '../application/CheckTypes/store/index';
import { reducer as demoReducers} from '../application/Demo/store'

//拆成多个小的 reducers
export default combineReducers({
    main: mainReducer,
    checktypes: checkTypesReducer,
    demo: demoReducers
})