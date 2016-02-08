import _ from 'lodash';
import { 
	GET_DATA, RECEIVE_DATA,
	SEND_ITEM, ADD_ITEM,
	REQUEST_DELETE_ITEM,
	RESPONSE_DELETE_ITEM,
	EDIT_ITEM, POST_UPDATED_ITEM, ITEM_UPDATED, CANCEL_EDIT,
} from '../constants/action-types.js';

export function apiReducer(state = {
	isFetching: false,
	isPosting: false,
	isDeleting: false,
	isEditing: false,
	data: [],
	itemBeingEdited: {},
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
		case REQUEST_DELETE_ITEM:
			var indexOfItem = _.findIndex(state.data, { id: action.id });
			var tempItem = Object.assign({}, state.data[indexOfItem], {
				isBeingDeleted: true
			});

			return Object.assign({}, state , {
				isDeleting: true,
				data: [
					...state.data.slice(0, indexOfItem),
					tempItem,
					...state.data.slice().reverse().slice(0, state.data.length - (indexOfItem + 1)).reverse(),
				]
			});
		case RESPONSE_DELETE_ITEM:

			var indexOfItem = _.findIndex(state.data, { id: action.id });

			return Object.assign({}, state, {
				isDeleting: false,
				data: [
					...state.data.slice(0, indexOfItem),
					...state.data.slice().reverse().slice(0, state.data.length - (indexOfItem + 1)).reverse(),
				]
			});


		case EDIT_ITEM:
			var indexOfItem = _.findIndex(state.data, { id: action.id });

			var item = state.data.slice(indexOfItem, indexOfItem + 1)[0];

			return Object.assign({}, state, {
				isEditing: true,
				itemBeingEdited: item
			});
		case CANCEL_EDIT: 
			return Object.assign({}, state, {
				isEditing: false,
				itemBeingEdited: {},
			});

		case POST_UPDATED_ITEM: 
			return Object.assign({}, state, {
				isEditing: false,
				isPosting: true,
				itemBeingEdited: action.updatedItem,
			});
		case ITEM_UPDATED:
			var indexOfItem = _.findIndex(state.data, { id: action.id });
			var newItem = action.updatedItem;

			return Object.assign({}, state, {
				isPosting: false,
				itemBeingEdited: {},
				data: [
					...state.data.slice(0, indexOfItem),
					newItem,
					...state.data.slice().reverse().slice(0, state.data.length - (indexOfItem + 1)).reverse(),
				]
			});
		default:
			return state;
	}
}