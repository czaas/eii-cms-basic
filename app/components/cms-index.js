// Libraries
import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { 
	Container, Row, Col, 
	Modal, ModalHeader, ModalFooter, ModalBody,
	Button, Glyph,
} from 'elemental';

// My Components
import { ListItems } from './list-items.js';
import { Filters } from './filters.js';
import { ItemForm } from './item-form.js';
import { LoadingIndicator } from './loading-indicator.js';

// actions
import * as apiActionCreators from '../actions/api-actions.js';
import * as itemStatusCreators from '../actions/item-status-actions.js';

// Custom Configurations for CMS
import { ITEM_TYPES, STATUSES } from '../constants/app.config.js';

export class CmsIndex extends React.Component {

	constructor(props) {
		super(props);

		this.componentDidMount = this.componentDidMount.bind(this); 
		this.handleNewItem = this.handleNewItem.bind(this);
		this.toggleStatus = this.toggleStatus.bind(this);
		this.handleDelete = this.handleDelete.bind(this);
		this.handleEdit = this.handleEdit.bind(this);
		this.toggleModal = this.toggleModal.bind(this);
		this.toggleModalCancel = this.toggleModalCancel.bind(this);

		// Local state for the modal
		this.state = {
			modalIsOpen: false
		}
	}

	componentDidMount() {
		// Adding CMS settings
		this.props.actions.api.apiGetData('all');
		this.props.actions.status.addStatuses(STATUSES);
	}

	handleNewItem(item) {
		// Checking to see if the item already exists. 
		// The ID should only exist if it's already saved on the server
		// So we are either updating or sending a new item 
		if (item.id.length){
			console.log('coming here UPDATE_ITEM');
			this.props.actions.api.apiUpdateItem(item);

		} else {
			console.log('or here: ADD ITEM')
			delete item.id;
			this.props.actions.api.apiAddItem(item);
		}
		
		this.toggleModal();
	}

	toggleStatus(index) {
		this.props.actions.status.toggleStatus(index);
	}

	handleDelete(id) {
		var confirmDelete = confirm('Are you sure you want to delete?');
		(confirmDelete) ? this.props.actions.api.deleteItem(id) : null;
	}

	handleEdit(id) {
		// console.log(id);
		this.props.actions.api.editItem(id);
		this.setState({
			modalIsOpen: !this.state.modalIsOpen
		});
	}

	toggleModal() {
		this.setState({
			modalIsOpen: !this.state.modalIsOpen
		});
	}

	toggleModalCancel() {
		this.props.actions.api.cancelEdit();
		this.setState({
			modalIsOpen: false
		});
	}

	render() {
		return (
			<Container>
				<Row>
					<Col md='1/3'>
						<h1>CMS</h1>
					</Col>
					<Col md='2/3'>
						<LoadingIndicator 
							isFetching={this.props.apiReducer.isFetching} 
							isDeleting={this.props.apiReducer.isDeleting} 
							isPosting={this.props.apiReducer.isPosting} 
						/>
					</Col>
				</Row>
				<Row>
					<Button onClick={this.toggleModal} type='primary'><Glyph icon='file-add' /> Add Item</Button>
				</Row>
				<Row>
					<Col md='35%'>
						<Filters statuses={this.props.statuses} toggleStatus={this.toggleStatus} />
					</Col>
					<Col md='65%'>
						<ListItems 
							data={this.props.data} 
							statuses={this.props.statuses} 
							handleDelete={this.handleDelete} 
							handleEdit={this.handleEdit}
						/>
					</Col>
				</Row>
				
				<Modal isOpen={this.state.modalIsOpen} onCancel={(this.props.apiReducer.isEditing) ? this.toggleModalCancel : this.toggleModal} backdropClosesModal={true}>
					<ModalHeader text="Add or Edit item" showCloseButton onClose={this.toggleModal} />
					<ModalBody>
						<ItemForm 
							handleNewItem={this.handleNewItem} 
							statuses={this.props.statuses} 
							isEditing={this.props.apiReducer.isEditing}
							itemBeingEdited={this.props.apiReducer.itemBeingEdited}
						/>
					</ModalBody>
				</Modal>
			</Container>
		);
	}
}

// Binding data of posts to props
function mapStateToProps (state) {
	return {
		data: state.apiReducer.data,
		statuses: state.itemStatusReducer.statuses,
		apiReducer: state.apiReducer,
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