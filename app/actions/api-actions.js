import axios from 'axios';

import { apiUrl } from '../constants/app.config.js';
import { 
	GET_DATA, RECEIVE_DATA, 
	SEND_ITEM, ADD_ITEM,
	REQUEST_DELETE_ITEM, RESPONSE_DELETE_ITEM,
	STATUS_FILTER
} from '../constants/action-types.js';



/* ========================================================
START of api get data
======================================================== */
function getData (itemType) {
	return {
		type: GET_DATA,
		itemType
	};
}
function receiveData (data) {
	return {
		type: RECEIVE_DATA,
		newData: data
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
/* ========================================================
END of api get data
========================================================  */





/* ========================================================
START of api add item	
======================================================== */
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
// Adding new item to DB async
export function apiAddItem (item) {
	return (dispatch) => {
		
		dispatch(sendItem(item)); // updates the state to show isPosting data

		axios.post(apiUrl, item)
		.then((response) => dispatch(addItem(response.data.context_item))) // adds item to state and removes
		.catch((err) => console.error(err));										 // isPosting state

	};
}
/* ========================================================
END of api add item	
======================================================== */





/* ========================================================
START api delete item request
========================================================*/
function sendDeleteRequest(id){
	return {
		type: REQUEST_DELETE_ITEM,
		id
	}
}
function receiveDeleteRequest(id) {
	return {
		type: RESPONSE_DELETE_ITEM,
		id
	}
}

// Async delete call
export function deleteItem(id) {
	return (dispatch) => {

		dispatch(sendDeleteRequest(id))

		axios.delete(apiUrl + id)
		.then((response) => {
			if (response.statusText === 'OK') { dispatch(receiveDeleteRequest(id)) };
		})
		.catch((err) => console.error(err));
	};
}
/*========================================================
END api delete item request
========================================================*/


