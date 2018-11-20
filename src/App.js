import React, { Component } from 'react';
import 'normalize.css';
import './App.css';
import Minesweeper from './game/Minesweeper';
class App extends Component {
	constructor() {
		super();
		this.state = {
			width: 16,
			length: 16,
			mines: 40
		};
	}
	render() {
		return (
			<div className="App">
				<Minesweeper size={[this.state.width, this.state.length]} mines={this.state.mines}/>
			</div>
		);
	}
}

export default App;
