import React, { Component } from 'react';
import { Switch, BrowserRouter, Route } from 'react-router-dom';
import Modal from 'react-modal';
import { connect } from 'react-redux';

import HomePage from './containers/HomePage/HomePage';
import LandingPage from './containers/LandingPage/LandingPage';
import VideoCallPage from './containers/VideoCallPage/VideoCallPage';

import socketGetter from './socket';

import './App.css';

Modal.setAppElement('#root');

class App extends Component {
	constructor() {
		super();
		window.onunload = () => {
			socketGetter.getInstance().emit('thisUserGoesOffline', { username: this.props.thisUser.username });
		}
	}

	render() {
		return (
			<BrowserRouter>
				<div>
					<Switch>
						<Route path='/videocall' exact component={VideoCallPage} />
						<Route path='/' exact component={HomePage} />
						<Route path='/(login|signup)' exact component={LandingPage} />
					</Switch>
				</div>
			</BrowserRouter>
		);
	}
}

const mapStateToProps = ({ thisUser }) => ({ thisUser });

export default connect(mapStateToProps)(App);
