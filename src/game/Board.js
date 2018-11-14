import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Cell from './Cell';
class Board extends Component {
	constructor(props) {
		super(props);
		this.state = {
			cells: [],
			cleared: [],
			lost: false
		};
		this.cellClicked = this.cellClicked.bind(this);
	}

	/**
	 * click handler for cells
	 * @param {number} i - index of cell being clicked
	 * @param {boolean} explosion - did this click cause an explosion?
	 */
	cellClicked(i, explosion = false) {
		if(explosion) {
			this.setState({
				lost: true
			});
			return;
		}
		if(!this.state.cleared.includes(i)) {
			const temp = this.state.cleared.slice();
			temp.push(i);
		}
	}

	getAdjecentCells(index) {
		const arr = [];
		const column = index % this.props.size[0];
		const row = Math.floor(index / this.props.size[0]);
		// check all acceptable columns
		for(let i = Math.max(-1, column-1); i <= Math.min(this.props.size[0], column+1); i++) {			
			for(let j = Math.max(-1, row-1); j <= Math.min(this.props.size[1], row+1); j++) {
				arr.push(index + i + (this.props.size[0] * j));
			}
		}

	}

	render() {
		return(
			<div className = 'minefield'>
			{this.state.cells.map((cell, index) => (
				<Cell enabled={this.state.cleared.includes(index)}
					text={cell.text}
					cellClicked={this.cellClicked}
					key={index} />
			))}
			</div>
		);
	}
}

Board.propTypes = {
	size: PropTypes.arrayOf(PropTypes.number) // [width, length]
};

export default Board;