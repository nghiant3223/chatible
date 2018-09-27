import React, { Component } from 'react';
import { Switch, BrowserRouter, Route } from 'react-router-dom';
import Modal from 'react-modal';

import HomePage from './containers/HomePage/HomePage';
import LandingPage from './containers/LandingPage/LandingPage';

import './App.css';

Modal.setAppElement('#root');

class App extends Component {
	render() {
		return (
			<BrowserRouter>
				<div>
					<Switch>
						<Route path='/' exact component={HomePage} />
						<Route path='/(login|signup)' exact component={LandingPage} />
					</Switch>
				</div>
			</BrowserRouter>
		);
	}
}

export default App;
