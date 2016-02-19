import expect from 'expect';

import { apiReducer } from '../api-reducer.js';
import * as types from '../../constants/action-types.js';

describe('api reducer', () => {
	
	it('should return initial state', () => {
		expect(
			apiReducer(undefined, {})
		).toEqual({
			isFetching: false,
			isPosting: false,
			isDeleting: false,
			isEditing: false,
			data: [],
			itemBeingEdited: {},
		});
	});


	it('should set isFetching to true on GET_DATA', () => {
		expect(
			apiReducer(undefined, {
				type: types.GET_DATA
			})
		).toEqual({
			isFetching: true,
			isPosting: false,
			isDeleting: false,
			isEditing: false,
			data: [],
			itemBeingEdited: {},
		});
	});


	it('should set isFetching to false and add data RECEIVE_DATA', () => {
		expect(
			apiReducer(undefined, {
				type: types.RECEIVE_DATA,
				newData: [{ new: 'data' }]
			})
		).toEqual({
			isFetching: false,
			isPosting: false,
			isDeleting: false,
			isEditing: false,
			data: [{ new: 'data' }],
			itemBeingEdited: {},
		})
	});


});