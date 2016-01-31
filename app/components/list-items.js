import React from 'react';

export class ListItems extends React.Component {
	render() {
		let allItems = this.props.data.map((item, i) => {
			
			let itemTags = item.tags.map((tag, tagI) => {
				return tag + ((tagI + 1 < item.tags.length) ? ', ' : '');
			});

			return (
				<div className={ 'item ' + item.status } key={i}>
					<p><strong>{item.content.title}</strong></p>
					<p>{item.content.body}</p>
					<p>Tags: {itemTags}</p>
					<hr />
				</div>
			);
		});

		return (
			<div>
				{allItems}
			</div>
		);
	}
}
