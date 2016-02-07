import React from 'react';
import _ from 'lodash';

export class ListItems extends React.Component {
	render() {

		let allItems = this.props.data.map((item, i) => {

			var allClassNames = 'item';
			
			allClassNames += ' ' + item.status;

			(item.isBeingDeleted) ? allClassNames += ' beingDeleted' : allClassNames;

			let itemTags = item.tags.map((tag, tagI) => {
				return tag + ((tagI + 1 < item.tags.length) ? ', ' : '');
			});

			var visibilityStyles = function (item){

				var currentStatus = _.find(this.props.statuses, (s) => s.name.toLowerCase() === item.status.toLowerCase());

				return (currentStatus.isVisible) ? { display: 'block' } : { display: 'none' };
			}.bind(this);

			return (
				<div className={ allClassNames } style={visibilityStyles(item)} key={i}>
					<p><strong>{item.content.title}</strong></p>
					<p>{item.content.body}</p>
					<p>{item.id}</p>
					<p>Status: {item.status}</p>
					<p>Tags: {itemTags}</p>
					<p><a onClick={this.props.handleDelete.bind(this, item.id)}><i className='Glyph__icon octicon octicon-trashcan'></i></a></p>
					<hr />
				</div>
			);
		});

		return (
			<div>
				<h2>All Items</h2>
				{allItems}
			</div>
		);
	}
}