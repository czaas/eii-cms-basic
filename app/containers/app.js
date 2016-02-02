import React from 'react';
import { Provider } from 'react-redux';
import { Router, Route, IndexRoute } from 'react-router';
import createBrowserHistory from 'history';

import { store } from '../stores/store.js';

import { Wrapper } from './wrapper.js';
import CmsIndex from '../components/cms-index.js';

export class App extends React.Component {
	render() {
		return (
			<Provider store={store()}>
				<Router history={createBrowserHistory}>
					<Route path="/" component={Wrapper}>
						<IndexRoute component={CmsIndex} />
					</Route>
				</Router>
			</Provider>
		);
	}
}