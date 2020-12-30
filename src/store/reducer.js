import { combineReducers } from 'redux-immutable'
import { reducer as mainReducer } from '../application/Main/store/index';
import { reducer as checkTypesReducer } from '../application/CheckTypes/store/index';

export default combineReducers({
    main: mainReducer,
    checktypes: checkTypesReducer
})