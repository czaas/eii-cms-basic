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
		this.closeModal = this.closeModal.bind(this);
		this.openModal = this.openModal.bind(this);
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
			this.props.actions.api.apiUpdateItem(item);
			this.closeModal();
		} else {
			delete item.id;
			this.props.actions.api.apiAddItem(item);
			this.closeModal();
		}
	}

	toggleStatus(index) {
		this.props.actions.status.toggleStatus(index);
	}

	handleDelete(id) {
		var confirmDelete = confirm('Are you sure you want to delete?');
		(confirmDelete) ? this.props.actions.api.deleteItem(id) : null;
	}

	handleEdit(id) {
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

	openModal() {
		this.toggleModal();
	}

	closeModal(confirmUser) {

		// If you pass any parameter that === true, it will prompt the user the new data is not saved. 
		// If you don't want to confirm user, it will close without notice
		var confirmCloseModal = (confirmUser) ? ('Any new data is not saved! Are you sure you want to close?') : false;

		if (confirmCloseModal) {
			this.props.actions.api.cancelEdit();
			this.toggleModal();
		} else {
			this.toggleModal();
		}
	}

	render() {
		return (
			<Container>
				<Row>
					<Col md='1/3'>
						<h1>CMS</h1>
					</Col>
					<Col md='1/3'>
						<LoadingIndicator 
							isFetching={this.props.apiReducer.isFetching} 
							isDeleting={this.props.apiReducer.isDeleting} 
							isPosting={this.props.apiReducer.isPosting} 
						/>
					</Col>
					<Col md='1/3'>
						<a href='/video-feature.html' target="_blank">Video Feature Example <Glyph icon='chevron-right' /></a>
					</Col>
				</Row>
				<Row>
					<Button onClick={this.openModal} type='primary'><Glyph icon='file-add' /> Add Item</Button>
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
				


				<Modal isOpen={this.state.modalIsOpen} onCancel={this.closeModal} backdropClosesModal={true}>
					<ModalHeader text={(this.props.apiReducer.isEditing) ? 'Edit Item' : 'Add New Item'} showCloseButton onClose={this.closeModal.bind(this, 'confirmUserDelete')} />
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