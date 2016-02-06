import { combineReducers } from 'redux';

import { apiReducer } from './api-reducer.js';
import { itemStatusReducer } from './item-status-reducer.js';

export const rootReducer = combineReducers({
	apiReducer, 
	itemStatusReducer,
});