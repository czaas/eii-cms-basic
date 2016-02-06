import React from 'react';
import { Form, FormField, FormInput, FormSelect, Checkbox, Button } from 'elemental';
import { ITEM_TYPES } from '../constants/app.config.js';

export class ItemForm extends React.Component {

	constructor(props) {
		super(props);

		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleSubmit() {
		let newItem = {
			type: this.refs.item_type.value,
			status: this.refs.item_status.value,
			meta_data: {
				title: this.refs.meta_title.value,
				description: this.refs.meta_description.value
			},
			content: {
				title: this.refs.content_title.value,
				body:  this.refs.content_body.value
			}
		};

		this.props.handleNewItem(newItem);
		this.refs.itemForm.reset();
	}

	render() {

		let typeOptions = ITEM_TYPES.map((type, i) => <option key={i} value={type}>{type}</option>);

		// let statusOptions = ITEM_STATUS.map((status, i) => <option key={i} value={status}>{status}</option>);
		// {statusOptions}
		return (
			<div>
				<h2>Add or edit item</h2>

				<form action='javascript:;' ref="itemForm" className="Form Form--basic">
					<FormField label="Item Type" htmlFor="item-type">
						<select className="FormInput FormSelect" ref="item_type">
							{typeOptions}
						</select>
					</FormField>

					<FormField label="Status" htmlFor="item-status">
						<select className="FormInput FormSelect" ref="item_status">
							<option value="Published">Published</option>
						</select>
					</FormField>
					
					<h3>Meta data</h3>
					<FormField label="Meta Title" htmlFor="meta-title">
						<input  type="text" placeholder="Enter meta title" name="meta-title" ref="meta_title" className="FormInput" />
					</FormField>
					<FormField label="Meta Description" htmlFor="meta-description">
						<input placeholder="Enter meta description" name="meta-description" ref="meta_description" className="FormInput" />
					</FormField>

					<h3>On page content</h3>
					<FormField label="Title" htmlFor="page-title">
						<input type="text" placeholder="Enter Title" name="page-title" ref="content_title" className="FormInput" />
					</FormField>
					<FormField label="Body Content" htmlFor="description">
						<input placeholder="body content" name="body content" multiline ref="content_body" className="FormInput" />
					</FormField>
					
					<Button type="default" onClick={this.handleSubmit}>Submit</Button>
				</form>
			</div>
		);
	}
}