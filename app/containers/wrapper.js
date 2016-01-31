import React from 'react';
import { Link } from 'react-router';

export class Wrapper extends React.Component {
	render() {
		return (
			<div>
				<nav>
					<Link to="/">Home</Link>
				</nav>
				{this.props.children}
			</div>
		);
	}
}