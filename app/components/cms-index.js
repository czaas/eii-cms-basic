import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { ListItems } from './list-items.js';
import * as actionCreators from '../actions/api-actions.js';

export class CmsIndex extends React.Component {

	constructor(props) {
		super(props);

		this.componentDidMount = this.componentDidMount.bind(this); 
	}

	componentDidMount() {
		this.props.actions.apiGetData('all');
	}

	render() {
		return (
			<div>
				<h1>CMS</h1>
				<ListItems data={this.props.data} />
			</div>
		);
	}
}

function mapStateToProps (state) {
	return {
		data: state.apiReducer.data
	}
}

function mapDispatchToProps (dispatch) {
	return {
		actions: bindActionCreators(actionCreators, dispatch)
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(CmsIndex);