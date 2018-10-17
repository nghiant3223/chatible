import React from 'react';
import ReactDOM from 'react-dom';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { combineReducers, compose, createStore, applyMiddleware } from 'redux';
import Modal from 'react-modal';

import recentContactReducer from './reducers/recentContactReducer';
import thisUserReducer from './reducers/thisUserReducer';
import activeContactReducer from './reducers/activeContactReducer';
import allUsersReducer from './reducers/allUsersReducer';

import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

Modal.setAppElement('#root');

const rootReducer = combineReducers({ thisUser: thisUserReducer, recentContacts: recentContactReducer, activeContact: activeContactReducer, allUsers: allUsersReducer});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));

ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));
registerServiceWorker();
