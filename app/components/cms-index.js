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
import * as apiActionCreators from '../actions/actions.js';


export class CmsIndex extends React.Component {

	constructor(props) {
		super(props);

		this.componentDidMount = this.componentDidMount.bind(this); 
		this.handleNewItem = this.handleNewItem.bind(this);
	}

	componentDidMount() {

		this.props.actions.changeStatusFilter(['Published', 'Draft']);

		this.props.actions.apiGetData('all');
	}

	handleNewItem(item) {
		this.props.actions.apiAddItem(item);
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
						<Filters />
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
		data: state.apiReducer.data
	}
}

// binding store dispatch items to props
function mapDispatchToProps (dispatch) {
	return {
		actions: bindActionCreators(apiActionCreators, dispatch)
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(CmsIndex);