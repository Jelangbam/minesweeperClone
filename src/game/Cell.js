import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Cell extends Component {

	render() {
		return (
			<button className="cell" onClick={this.props.cellClicked}>
			{this.props.enabled ? this.props.text : '_'}
			</button>
		);
	}
}

Cell.propTypes = {
	enabled: PropTypes.bool,
	cellClicked: PropTypes.func,
	text: PropTypes.string
};

export default Cell;