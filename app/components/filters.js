import React from 'react';

export class Filters extends React.Component {
	constructor(props) {
		super(props);
		this.handleStatusToggle = this.handleStatusToggle.bind(this);
	}
	handleStatusToggle(index) {
		this.props.toggleStatus(index)
	}

	render() {

		let statusFilters = this.props.statuses.map((status, i) => {				
				return (
					<label htmlFor={'status-' + status.name} className='Checkbox' key={i}>
						<input 
							type='checkbox' 
							className='Checkbox__input'
							onChange={this.handleStatusToggle.bind(this, i)} 
							key={i} 
							defaultChecked={status.isVisible} 
							id={'status-' + status.name} 
							/> {status.name}
					</label>
				)
			});
		return (
			<div>
				<h2>Filters</h2>
				<form ref="statusForm" className="Form Form--basic">
					{statusFilters}
				</form>
			</div>
		);
	}
}
