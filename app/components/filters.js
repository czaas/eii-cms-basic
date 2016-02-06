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
					<div key={i}>
						<label htmlFor={'status-' + status.name}>
							<input 
								type='checkbox' 
								onChange={this.handleStatusToggle.bind(this, i)} 
								key={i} 
								defaultChecked={status.isVisible} 
								id={'status-' + status.name} 
								/> {status.name}
						</label>
						<br />
					</div>
				)
			});
		return (
			<div>
				<h2>Filters</h2>
				<form ref="statusForm">
					{statusFilters}
				</form>
			</div>
		);
	}
}
