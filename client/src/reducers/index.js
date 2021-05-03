import { combineReducers } from 'redux';
import { coinReducer } from './coinReducer';
import { portfolioReducer } from './portfolioReducer';

export default combineReducers({
    coins: coinReducer,
    portfolio: portfolioReducer
})