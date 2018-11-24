import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Status extends Component {
	render() {
		return (
			<div className='status'>
			Lost?: {this.props.status ? 'Yes' : 'Still alive!'} <br></br>
			Current Time: {this.props.timer.toFixed(1)}
			</div>
		);
	}
}

Status.propTypes = {
	status: PropTypes.boolean,
	timer: PropTypes.number	
};

export default Status;