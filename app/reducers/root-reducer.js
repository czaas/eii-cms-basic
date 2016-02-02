import { combineReducers } from 'redux';

import { apiReducer } from './api-reducer.js';
import { filtersReducer } from './filters-reducer.js';


export const rootReducer = combineReducers({
	apiReducer, 
	filtersReducer,
});