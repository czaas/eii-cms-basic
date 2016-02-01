import React from 'react';
import { Form, FormField, FormInput, FormSelect, Checkbox, Button } from 'elemental';
import { ITEM_TYPES } from '../constants/app.config.js';

export class ItemForm extends React.Component {

	handleSelect() {
		console.log('select');
	}

	render() {

		let itemTypes = ITEM_TYPES.map((item) => {
			return {
				label: item,
				value: item
			};
		});

		return (
			<div>
				<h2>Add or edit item</h2>

				<Form action='javascript:;'>
					<FormField label="Item Type" htmlFor="item-type">
						<FormSelect options={itemTypes} firstOption={'Select'} onChange={this.handleSelect} />
					</FormField>
					<FormField label="Title" htmlFor="title">
						<FormInput autofocus type="text" placeholder="Enter Title" name="title" />
					</FormField>
					<FormField label="description" htmlFor="description">
						<FormInput placeholder="Textarea" name="description" multiline />
					</FormField>
					<Button type="default">Submit</Button>
				</Form>
			</div>
		);
	}
}
