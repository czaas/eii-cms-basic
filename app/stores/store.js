import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import createLogger from 'redux-logger';

import { rootReducer } from '../reducers/root-reducer.js';

export function store(initialState) {
	return createStore(
		rootReducer,
		initialState,
		applyMiddleware(thunkMiddleware, createLogger())
	);
}