import React from 'react';
import { Link } from 'react-router';
import { Container } from 'elemental';

export class Wrapper extends React.Component {
	render() {
		return (
			<Container>
				
				{this.props.children}
			</Container>
		);
	}
}