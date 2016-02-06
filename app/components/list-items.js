import React from 'react';
import _ from 'lodash';

export class ListItems extends React.Component {
	render() {

		let allItems = this.props.data.map((item, i) => {
					
			let itemTags = item.tags.map((tag, tagI) => {
				return tag + ((tagI + 1 < item.tags.length) ? ', ' : '');
			});

			var visibilityStyles = function (item){

				var currentStatus = _.find(this.props.statuses, (s) => s.name.toLowerCase() === item.status.toLowerCase());

				return (currentStatus.isVisible) ? { display: 'block' } : { display: 'none' };
			}.bind(this);

			return (
				<div className={ 'item ' + item.status } style={visibilityStyles(item)} key={i}>
					<p><strong>{item.content.title}</strong></p>
					<p>{item.content.body}</p>
					<p>Status: {item.status}</p>
					<p>Tags: {itemTags}</p>
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