import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Board from './Board';
import Status from './Status';

class Minesweeper extends Component {
	constructor(props) {
		super(props);
		this.state = {
			timer: 0,
			status: false
		};
		this.setLost = this.setLost.bind(this);
		this.startTimer = this.startTimer.bind(this);
		this.stopTimer = this.stopTimer.bind(this);
	}

	setLost(bool) {
		this.setState({
			status: bool
		});
	}

	startTimer() {
		this.setState({
			timer: 0
		});
		//timestep in ms
		const accuracy = 100;
		this.interval = setInterval(
			() => (this.setState((prevState) => ({
				timer: prevState.timer + accuracy/1000
			}))), accuracy
		);
		return;
	}

	stopTimer() {
		clearInterval(this.interval);
		return;
	}

	render() { 
		return(
			<div>
				<div className='Board'>
					<Board setLost={this.setLost} 
						size={this.props.size} 
						mines={this.props.mines} 
						startTimer = {this.startTimer}
						stopTimer = {this.stopTimer}/>
				</div>
				<div className='Statusbar'>
					<Status status={this.state.status}	timer={this.state.timer} />
				</div>
			</div>			
		);
		

	}
}

Minesweeper.propTypes = {
	size: PropTypes.arrayOf(PropTypes.number), // [width, length]
	mines: PropTypes.number // number of mines
};

export default Minesweeper;