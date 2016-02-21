import React from 'react';
import _ from 'lodash';
import { Form, FormField, FormInput, FormSelect, Checkbox, Button } from 'elemental';
import { ITEM_TYPES } from '../constants/app.config.js';

export class ItemForm extends React.Component {

	constructor(props) {
		super(props);

		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleStatusChange = this.handleStatusChange.bind(this);
		this.handleTypeChange = this.handleTypeChange.bind(this);

		var defaultValues = {
			id: null,
			status: this.props.statuses[0].name.toLowerCase(),
			type: ITEM_TYPES[0].toLowerCase(),
			tags: [].join(', '),
			meta_data: {
				title: '',
				description: '',
				keywords: '',
			},
			content: {
				title: '',
				body: '',
				videoUrl: '',
			}
		};

		if(this.props.isEditing) {
			defaultValues = _.merge(defaultValues, this.props.itemBeingEdited);
		}

		this.state = {
			selectType: '',
			defaultValues: defaultValues,
			selectedStatus: (this.props.isEditing) ? this.props.itemBeingEdited.status : defaultValues.status,
			selectedType: (this.props.isEditing) ? this.props.itemBeingEdited.type : defaultValues.type,
			validationMessage: '',
		};
	}

	handleStatusChange(e) {
		e.preventDefault();
		this.setState({
			selectedStatus: e.target.value.toLowerCase()
		});
	}

	handleTypeChange(e) {
		e.preventDefault();
		this.setState({
			selectedType: e.target.value.toLowerCase()
		});
	}

	handleSubmit() {

		// splitting the strings at the comma 
		// then trimming whitespace around the tags
		let tags = this.refs.tags.value.split(',').map( s => s.trim());

		if(tags[0] === '') {
			tags = [];
		}

		// Collect all data
		let newItem = {
			id: this.refs.id.value,
			type: this.state.selectedType,
			status: this.state.selectedStatus,
			meta_data: {
				title: this.refs.meta_title.value,
				description: this.refs.meta_description.value
			},
			content: {
				title: this.refs.content_title.value,
				body:  this.refs.content_body.value,
				videoUrl: this.refs.video_url.value,
			},
			tags: tags,
		};

		// Validate...really dirty
		if(isValid(newItem.meta_data.title) && isValid(newItem.meta_data.description) && isValid(newItem.tags) && isValid(newItem.content.title)){
			this.props.handleNewItem(newItem);
			this.refs.itemForm.reset();
		} else {
			
			var validationArr = ['Please fill out:'];
			
			(isValid(newItem.meta_data.title)) ? true : validationArr.push('Meta Title,');
			(isValid(newItem.meta_data.description)) ? true : validationArr.push('Meta description,');
			(isValid(newItem.tags)) ? true : validationArr.push('1 Meta Tag,');

			(isValid(newItem.content.title)) ? true : validationArr.push('Content Title,');

			if(newItem.type === 'video') {
				isValid(newItem.content.videoUrl) ? true : validationArr.push('Video Url');
			}

			this.setState({
				validationMessage: validationArr.join(' ').slice(0, -1) // removes the trailing comma
			});

			validationArr = ['Please fill out:'];
		}


		function isValid(input) {
			return input.length >= 1;
		}
	}

	render() {

		let typeOptions = ITEM_TYPES.map((type, i) => <option key={i} value={type.toLowerCase()}>{type}</option>);

		let statusOptions = this.props.statuses.map((status, i) => <option key={i} value={status.name.toLowerCase()}>{status.name}</option>);

		return (
			<div>
				<p>{this.state.validationMessage}</p>
				<form action='javascript:;' ref="itemForm" className="Form Form--basic">
					<input type="hidden" defaultValue={this.state.defaultValues.id} ref="id" />
					<FormField label="Item Type" htmlFor="item-type">
						<select className="FormInput FormSelect" ref="item_type" value={this.state.selectedType} onChange={this.handleTypeChange}>
							{typeOptions}
						</select>
					</FormField>

					<FormField label="Status" htmlFor="item-status">
						<select className="FormInput FormSelect" ref="item_status" value={this.state.selectedStatus} onChange={this.handleStatusChange}>
							{statusOptions}
						</select>
					</FormField>
					
					<h3>Meta data</h3>
					<FormField label="Meta Title" htmlFor="meta-title">
						<input type="text" placeholder="Enter meta title" name="meta-title" ref="meta_title" className="FormInput" required defaultValue={this.state.defaultValues.meta_data.title} />
					</FormField>
					<FormField label="Meta Description" htmlFor="meta-description">
						<input placeholder="Enter meta description" name="meta-description" ref="meta_description" className="FormInput" required defaultValue={this.state.defaultValues.meta_data.description} />
					</FormField>
					<FormField label="Tags" htmlFor="tags">
						<input placeholder="Enter Tags seperated by comma" name="tags" ref="tags" className="FormInput" defaultValue={this.state.defaultValues.tags} />
					</FormField>

					<h3>On page content</h3>
					<FormField label="Title" htmlFor="page-title">
						<input type="text" placeholder="Enter Title" name="page-title" ref="content_title" className="FormInput" required defaultValue={this.state.defaultValues.content.title} />
					</FormField>
					<FormField label="Body Content" htmlFor="description">
						<input placeholder="body content" name="body content" multiline ref="content_body" className="FormInput" required defaultValue={this.state.defaultValues.content.body} />
					</FormField>
					<FormField label="Video Url" htmlFor="video-url">
						<input placeholder="Video Url" name="body content" multiline ref="video_url" className="FormInput" required defaultValue={this.state.defaultValues.content.videoUrl} />
					</FormField>
					
					<Button type="default" onClick={this.handleSubmit}>{(this.props.isEditing) ? 'Save' : 'Submit'}</Button>
				</form>
			</div>
		);
	}
}