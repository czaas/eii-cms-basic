// Libraries
import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Container, Row, Col } from 'elemental';

// My Components
import { ListItems } from './list-items.js';
import { Filters } from './filters.js';
import { ItemForm } from './item-form.js';

// actions
import * as apiActionCreators from '../actions/api-actions.js';
import * as itemStatusCreators from '../actions/item-status-actions.js';

// Custom Configurations for CMS
import { ITEM_TYPES } from '../constants/app.config.js';

export class CmsIndex extends React.Component {

	constructor(props) {
		super(props);

		this.componentDidMount = this.componentDidMount.bind(this); 
		this.handleNewItem = this.handleNewItem.bind(this);
		this.toggleStatus = this.toggleStatus.bind(this);
	}

	componentDidMount() {
		let statuses = [{
			name: 'Published',
			isVisible: true,
		},{
			name: 'Draft',
			isVisible: true,
		},{
			name: 'Archived',
			isVisible: false,
		}];

		this.props.actions.api.apiGetData('all');
		this.props.actions.status.addStatuses(statuses);
	}

	handleNewItem(item) {
		this.props.actions.api.apiAddItem(item);
	}

	toggleStatus(index) {
		this.props.actions.status.toggleStatus(index);
		// console.log(index);
	}

	render() {
		return (
			<Container>
				<Row>
					<Col md='1/1'>
						<h1>CMS</h1>
						<hr />
					</Col>
				</Row>
				<Row>
					<Col md='20%'>
						<Filters statuses={this.props.statuses} toggleStatus={this.toggleStatus} />
					</Col>
					<Col md='50%'>
						<ListItems data={this.props.data} />
					</Col>
					<Col md='30%'>
						<ItemForm handleNewItem={this.handleNewItem} />
					</Col>
				</Row>
			</Container>
		);
	}
}

// Binding data of posts to props
function mapStateToProps (state) {
	return {
		data: state.apiReducer.data,
		statuses: state.itemStatusReducer.statuses,
	}
}

// binding store dispatch items to props
function mapDispatchToProps (dispatch) {

	return {
		actions: {
			api: bindActionCreators(apiActionCreators, dispatch),
			status: bindActionCreators(itemStatusCreators, dispatch),
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(CmsIndex);