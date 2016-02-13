import expect from 'expect';
import * as actions from '../api-actions.js';
import * as types from '../../constants/action-types.js';


describe('actions', () =>{
	describe('get data action', () => {
		it('should create an action to get a data type', () => {
			const itemType = 'video';
			const expectedAction = {
				type: types.GET_DATA,
				itemType
			};
			expect(actions.getData(itemType)).toEqual(expectedAction);
		});
	});

	describe('receive data action', () => {
		it('should create an action to receive the data', () => {
			const data = [{id: 1}, {id: 2}];
			const expectedAction = {
				type: types.RECEIVE_DATA,
				newData: data
			};

			expect(actions.receiveData(data)).toEqual(expectedAction);
		});
	});

	describe('set item action', () => {
		it('should create an action to send to send to the api', () => {
			const data = {
				meta_data: {
					title: 'This is a test title',
					description: 'My test description',
				}
			};

			const expectedAction = {
				type: types.SEND_ITEM,
				item: data,
			};

			expect(actions.sendItem(data)).toEqual(expectedAction);
		});
	});

	describe('add item action', () => {
		it('should create an action to add the item to the database', () => {
			const data = {
				meta_data: {
					title: 'This is a test title',
					description: 'My test description',
				}
			};
			const expectedAction = {
				type: types.ADD_ITEM,
				newItem: data,
			};
			expect(actions.addItem(data)).toEqual(expectedAction);
		});
	});

	describe('request delete item action', () => {
		it('should create an action to request to delete an item from the database', () => {
			const id = 'UNQUIE_ID_CREATED_BY_THE_SERVER';
			const expectedAction = {
				type: types.REQUEST_DELETE_ITEM,
				id,
			};

			expect(actions.sendDeleteRequest(id)).toEqual(expectedAction);
		});
	})

	describe('accept requested delete item action', () => {
		it('should create an action that has the id of the accepted deleted item', () => {
			const id = 'UNQUIE_ID_CREATED_BY_THE_SERVER';
			const expectedAction = {
				type: types.RESPONSE_DELETE_ITEM,
				id,
			};
			expect(actions.receiveDeleteRequest(id)).toEqual(expectedAction);
		});
	});

	describe('edit item action creator', () => {
		it('should create an action that passes the id of the requested item to edit', () => {
			const id = 'UNQUIE_ID_CREATED_BY_THE_SERVER';
			const expectedAction = {
				type: types.EDIT_ITEM,
				id,
			};
			expect(actions.editItem(id)).toEqual(expectedAction);
		});
	});

	describe('cancel edit action creator', () => {
		it('should create an action to cancel the edit status of the redux store', () => {
			const expectedAction = {
				type: types.CANCEL_EDIT
			};
			expect(actions.cancelEdit()).toEqual(expectedAction);
		});
	});

	describe('post item request action creator', () => {
		it('should create an action to make an update request on selected item', () => {
			const item = {
				meta_data: {
					title: 'This is a test title',
					description: 'My test description',
				}
			};
			const expectedAction = {
				type: types.POST_UPDATED_ITEM,
				updatedItem: item,
			};

			expect(actions.postEditItem(item)).toEqual(expectedAction);
		});
	});

	describe('item updated response action creator', () => {
		it('should return an object and id of an item that was updated on the database', () => {
			const item = {
				id: 'UNQUIE_ID_CREATED_BY_THE_SERVER',
				meta_data: {
					title: 'This is a test title',
					description: 'My test description',
				}
			};
			const expectedAction = {
				type: types.ITEM_UPDATED,
				updatedItem: item,
				id: item.id,
			};

			expect(actions.itemUpdated(item.id, item)).toEqual(expectedAction);
		});
	});
});