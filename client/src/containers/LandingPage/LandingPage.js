import React from 'react';
import { Route } from 'react-router-dom';

import LoginForm from '../../components/LoginForm/LoginForm';
import SignupForm from '../../components/SignupForm/SignupForm';

import './LandingPage.css';

const landingPage = () => (
    <div id="landing-page">
        <div className="background-layer"></div>
        <div id="main-panel">
            <div id="title"><span>Chatible</span></div>
            <div id="subtitle"><span>implements fb's chat feature.</span></div>
        
            <div id="login-form">
                <Route path='/login' component={LoginForm} exact />
                <Route path='/signup' component={SignupForm} exact />
            </div>
        </div>
    </div>
);

export default landingPage;