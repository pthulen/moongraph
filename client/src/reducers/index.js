import { combineReducers } from 'redux';
import { coinReducer } from './coinReducer';
import { portfolioReducer } from './portfolioReducer';
import { authReducer } from './authReducer';

export default combineReducers({
    coins: coinReducer,
    portfolio: portfolioReducer,
    auth: authReducer
})