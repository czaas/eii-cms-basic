import { ADD_ITEM_STATUS, TOGGLE_ITEM_STATUS } from '../constants/action-types.js';

export function addStatuses(statuses) {
	return {
		type: ADD_ITEM_STATUS,
		statuses
	};
}

export function toggleStatus(index) {
	return {
		type: TOGGLE_ITEM_STATUS,
		index
	}
}