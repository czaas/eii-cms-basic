import React from 'react';
import {
	Spinner,
} from 'elemental';

export class LoadingIndicator extends React.Component {
	render() {
		let isPosting = this.props.isPosting;
		let isDeleting = this.props.isDeleting;
		let isFetching = this.props.isFetching;

		let posting = function() {
			return (
				<div>
					<Spinner size='md' type='primary' /> Sending item
				</div>
			);
		}

		let deleting = function() {
			return (
				<div>
					<Spinner size='md' /> Deleting item
				</div>
			);
		}

		let fetching = function() {
			return (
				<div>
					<Spinner size='md' type='primary' /> Fetching data
				</div>
			);
		}
		

		return (
			<div>
				{(isPosting) ? posting() : ''}
				{(isDeleting) ? deleting() : ''}
				{(isFetching) ? fetching() : ''}
			</div>
		);
	}
}
