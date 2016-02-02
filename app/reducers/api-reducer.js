import { 
	GET_DATA, RECEIVE_DATA,
	SEND_ITEM, ADD_ITEM 
} from '../constants/action-types.js';

export function apiReducer(state = {
	isFetching: false,
	isPosting: false,
	data: []
}, action){
	switch (action.type) {
		case GET_DATA:
			return Object.assign({}, state, {
				isFetching: true
			});
		case RECEIVE_DATA: 
			return Object.assign({}, state, {
				data: action.newData,
				isFetching: false
			});
		case SEND_ITEM:
			return Object.assign({}, state, {
				isPosting: true
			});

		case ADD_ITEM:
			return Object.assign({}, state, {
				isPosting: false,
				data: [action.newItem, ...state.data]
			});
			
		default:
			return state;
	}
}