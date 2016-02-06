import {
	ADD_ITEM_STATUS, TOGGLE_ITEM_STATUS
} from '../constants/action-types.js';

export function itemStatusReducer(state = {
	statuses: []
}, action) {
	switch(action.type) {
		case ADD_ITEM_STATUS:
			return Object.assign({}, state, {
				statuses: action.statuses,
			});

		case TOGGLE_ITEM_STATUS:
			var tempItem = {
				name: state.statuses[action.index].name,
				isVisible: !state.statuses[action.index].isVisible
			};

			return Object.assign({}, state, {
				statuses: [
					...state.statuses.slice(0, action.index),
					tempItem,
					...state.statuses.slice().reverse().slice(0, state.statuses.length - (action.index + 1)).reverse(),
				]
			});
		default: 
			return state;
	}
}