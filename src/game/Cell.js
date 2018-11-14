import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Cell extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<button className="cell" onClick={this.props.cellClicked}>
			{this.props.text}
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