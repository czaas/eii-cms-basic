import axios from 'axios';

import { apiUrl } from '../constants/app.config.js';
import { 
	GET_DATA, RECEIVE_DATA, 
	SEND_ITEM, ADD_ITEM,
	STATUS_FILTER
} from '../constants/action-types.js';

/*
========================================================
	These four functions below will be called within the async function later
	these will not be exported
========================================================
*/
// this is what I call to let my store know that I'm making a async call
function getData (itemType) {
	return {
		type: GET_DATA,
		itemType
	};
}
// I call this after the data is received
function receiveData (data) {
	return {
		type: RECEIVE_DATA,
		newData: data
	};
}

function sendItem (item) {
	return {
		type: SEND_ITEM,
		item
	}
}

function addItem (item) {
	return {
		type: ADD_ITEM,
		newItem: item
	};
}




// The actual async call by the component
export function apiGetData (itemType) {
	return (dispatch) => {
		dispatch(getData(itemType));

 		// eventually want to make itemType accept key value pairs
		axios.get(apiUrl + '?status=' + itemType)
		.then(response => dispatch(receiveData(response.data)))
		.catch((err) => console.error(err));

	}
}

// Adding new item to DB async
export function apiAddItem (item) {
	return (dispatch) => {
		
		dispatch(sendItem(item)); // updates the state to show isPosting data

		axios.post(apiUrl, item)
		.then((response) => dispatch(addItem(response.data.context_item))) // adds item to state and removes
		.catch((err) => console.error(err));										 // isPosting state

	};
}