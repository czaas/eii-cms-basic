import {
	STATUS_FILTER
} from '../constants/action-types.js';

import {
	CMS_STATUS_VIEWABLE
} from '../constants/app.config.js';

export function filtersReducer(state = {
	statusFilter: []
}, action) {

	switch(action.type) {
		case STATUS_FILTER: 
			return Object.assign({}, state, {
				statusFilter: action.statusFilter // array of strings containing status name: Published, Draft, ect
			});

		default:
			return state;
	}
}


// To change the status of a filter 
	// I'm going to loop through an array 
	// if the post matches, display it!
