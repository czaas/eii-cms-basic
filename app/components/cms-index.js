// Libraries
import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Row, Col, DemoBox } from 'elemental';

// My Components
import { ListItems } from './list-items.js';
import { Filters } from './filters.js';
import { ItemForm } from './item-form.js';

// actions
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
				<Row>
					<Col sm='1/1'>
						<h1>CMS</h1>
					</Col>
				</Row>
				<Row>
					<Col sm='10%'>
						<Filters />
					</Col>
					<Col sm='60%'>
						<ListItems data={this.props.data} />
					</Col>
					<Col sm='30%'>
						<ItemForm />
					</Col>
				</Row>
			</div>
		);
	}
}

// Binding data of posts to props
function mapStateToProps (state) {
	return {
		data: state.apiReducer.data
	}
}

// binding store dispatch items to props
function mapDispatchToProps (dispatch) {
	return {
		actions: bindActionCreators(actionCreators, dispatch)
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(CmsIndex);