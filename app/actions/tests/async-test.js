import expect from 'expect';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import nock from 'nock';

import * as actions from '../api-actions.js';
import * as types from '../../constants/action-types.js';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

// describe('async actions', () => {

// 	afterEach(() => nock.cleanAll());

// 	describe('get api get data action', () => {
// 		it('should get the api data and return it', (done) => {
// 			const content = [{
// 				id: 'UNIQUE_ID_FROM_SERVER',
// 				meta_data: {
// 					title: 'Meta title',
// 					description: 'Meta description'
// 				},
// 				content: {
// 					title: 'This is the content title',
// 					body: 'Body content!!!'
// 				}
// 			}];
// 			const test = nock('http://dev100.etnainteractive.com', {
// 				reqheaders: {
// 					'Content-Type': 'application/json',
// 					'Accept': 'application/json'
// 				}	
// 			})
// 			.get('/api/v1/content/')
// 			.reply(200, content);

// 			const expectedActions = [
// 				{ type: types.GET_DATA, itemType: 'all' },
// 				{ type: types.RECEIVE_DATA, newData: content }
// 			];

// 			const store = mockStore({data: []}, expectedActions, done);
// 			store.dispatch(actions.apiGetData('all'));
			
// 		});
// 	});
		
// });