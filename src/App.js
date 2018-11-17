import React, { Component } from 'react';
import 'normalize.css';
import './App.css';
import Board from './game/Board';
class App extends Component {
	render() {
		return (
			<div className="App">
				<Board size={[10,10]} mines={10}/>
			</div>
		);
	}
}

export default App;
