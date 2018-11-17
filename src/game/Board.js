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
		this.getAdjacentCells = this.getAdjacentCells.bind(this);
		this.createTable = this.createTable.bind(this);
	}

	/**
	 * Initialize the minefield
	 */
	componentDidMount() {
		let mines = [];
		let tempCells = [];
		for(let i = 0; i < this.props.size[0] * this.props.size[1]; i++) {
			mines.push(i);
			tempCells.push(0);
		}
		shuffle(mines);
		mines = mines.slice(0, this.props.mines);
		mines.map((mine) => {
			tempCells[mine] = 'M';
			this.getAdjacentCells(mine).map((cellIndex) => {
				if(tempCells[cellIndex] !== 'M') {
					tempCells[cellIndex]++;
				}
			});
		});

		this.setState({
			cells: tempCells
		});

		/**
		 * Shuffles array using Fischer-Yates
		 * @param {[]} arr 
		 */
		function shuffle(arr) {
			let i, j, x;
			for (i = arr.length - 1; i > 0; i--) {
				j = Math.floor(Math.random() * (i + 1));
				x = arr[i];
				arr[i] = arr[j];
				arr[j] = x;
			}
			return arr;
		}

	}

	/**
	 * click handler for cells
	 * @param {number} i - index of cell being clicked
	 */
	cellClicked(index) {
		if(!this.state.cleared.includes(index)) {
			const tempCleared = this.state.cleared.slice();
			if(this.state.cells[index] === 'M') {
				tempCleared.push(index);
				this.setState({
					lost: true,
					cleared: tempCleared
				});
				return;
			}
			if(this.state.cells[index] === 0) {
				// implementation of the flood fill algorithm if you click a square with no adjecent mines
				const queue = [index];
				while(queue.length > 0) {
					const column = queue[0] % this.props.size[0];
					const row = Math.floor(queue[0] / this.props.size[0]);
					let w = column;
					let e = column;
					// go left until we find something that does not fit the conditions: button is not pushed down and has 0 adjecent mines 
					while(w > 0) {
						if(!tempCleared.includes(w - 1 + this.props.size[0]* row)) {
							if(this.state.cells[w - 1 + this.props.size[0]* row] === 0) {
								w--;
							}
							else {
								// take care of the case where it's a number, press it so the player does not need to
								tempCleared.push(w - 1 + this.props.size[0] * row);
								break;
							}
							
						}
						else {
							break;
						}
					}
					// do the same but to the right
					while(e < this.props.size[0] - 1) {
						if(!tempCleared.includes(e + 1 + this.props.size[0]* row)) {
							if(this.state.cells[e + 1 + this.props.size[0]* row] === 0) {
								e++;
							}
							else {
								// take care of the case where it's a number, press it so the player does not need to
								tempCleared.push(e + 1 + this.props.size[0] * row);
							}
						}
						else {
							break;
						}
					}
					// Part two of the flood fill algorithm: Maybe I should have used the recursive version
					for(let i = w; i <= e; i++) {
						tempCleared.push(i + this.props.size[0] * row);
						if(row !== 0) {
							if(!tempCleared.includes(i + this.props.size[0] * (row - 1))) {
								tempCleared.push(i + this.props.size[0] * (row - 1));
								if(this.state.cells[i + this.props.size[0] * (row - 1)] === 0) {
									queue.push(i + this.props.size[0] * (row - 1));
								}								
							}
						}
						if(row !== this.props.size[1] - 1) {
							if(!tempCleared.includes(i + this.props.size[0] * (row + 1))) {
								if(this.state.cells[i + this.props.size[0] * (row + 1)] === 0) {
									queue.push(i + this.props.size[0] * (row + 1));
								}
								tempCleared.push(i + this.props.size[0] * (row + 1));
							}
						}
					}
					// deal with specific corner cases
					if(w > 0) {
						if(row !== 0) {
							if(!tempCleared.includes(w - 1 + this.props.size[0] * (row - 1))) {
								tempCleared.push(w - 1 + this.props.size[0] * (row - 1));
								if(this.state.cells[w - 1 + this.props.size[0] * (row - 1)] === 0) {
									queue.push(w - 1 + this.props.size[0] * (row - 1));
								}								
							}
						}
						if(row !== this.props.size[1] - 1) {
							if(!tempCleared.includes(w - 1 + this.props.size[0] * (row + 1))) {
								tempCleared.push(w - 1 + this.props.size[0] * (row + 1));
								if(this.state.cells[w - 1 + this.props.size[0] * (row + 1)] === 0) {
									queue.push(w - 1 + this.props.size[0] * (row + 1));
								}								
							}
						}
					}
					if(e < this.props.size[0] - 1) {
						if(row !== 0) {
							if(!tempCleared.includes(e + 1 + this.props.size[0] * (row - 1))) {
								tempCleared.push(e + 1 + this.props.size[0] * (row - 1));
								if(this.state.cells[e + 1 + this.props.size[0] * (row - 1)] === 0) {
									queue.push(e + 1 + this.props.size[0] * (row - 1));
								}								
							}
						}
						if(row !== this.props.size[1] - 1) {
							if(!tempCleared.includes(e + 1 + this.props.size[0] * (row + 1))) {
								tempCleared.push(e + 1 + this.props.size[0] * (row + 1));
								if(this.state.cells[e + 1 + this.props.size[0] * (row + 1)] === 0) {
									queue.push(e + 1 + this.props.size[0] * (row + 1));
								}								
							}
						}
					}
					queue.shift();
				}
			} else {
				tempCleared.push(index);
			}
			this.setState({
				cleared: tempCleared
			});
		}
	}

	/**
	 * Gives index of all adjecent squares to square represented by index
	 * @param {number} index 
	 */
	getAdjacentCells(index) {
		const arr = [];
		const column = index % this.props.size[0];
		const row = Math.floor(index / this.props.size[0]);
		// check all acceptable columns
		for(let i = Math.max(0, column-1); i <= Math.min(this.props.size[0] - 1, column+1); i++) {			
			for(let j = Math.max(0, row-1); j <= Math.min(this.props.size[1] - 1, row+1); j++) {
				if(i !== column || j !== row) {
					arr.push( i + (this.props.size[0] * j));
				}
			}
		}
		return arr;
	}

	createTable() {
		const table = [];
		for(let i = 0; i < this.props.size[1]; i++) {
			const child = [];
			for(let j = 0; j < this.props.size[0]; j++) {
				child.push(<td><Cell enabled={this.state.cleared.includes(i * this.props.size[0] + j)}
				text={this.state.cells[i * this.props.size[0] + j]}
				cellClicked={() => this.cellClicked(i * this.props.size[0] + j)}
				key={i * this.props.size[0] + j} /></td>);
			}
			table.push(<tr>{child}</tr>);
		}
		return table;
	}

	render() {
		return(
			<div>
			<table className = 'grid'>
			{this.createTable()}			
			</table>
			</div>
		);
	}
}

Board.propTypes = {
	size: PropTypes.arrayOf(PropTypes.number), // [width, length]
	mines: PropTypes.number // number of mines
};

export default Board;