import { combineReducers } from 'redux';
import errorReducer from './errorReducer';
import authReducer from './authReducer';
import empReducer from './empReducer';

const rootReducer = combineReducers({
    auth:authReducer,
    error:errorReducer,
    emp:empReducer
})

export default rootReducer;
// export default combineReducers({
//     user:userReducer,
//     error:errorReducer
// });