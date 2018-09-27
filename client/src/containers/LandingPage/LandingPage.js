import React from 'react';
import { Route } from 'react-router-dom';

import LoginForm from '../../components/LoginForm/LoginForm';
import SignupForm from '../../components/SignupForm/SignupForm';

const landingPage = () => (
    <div>
        Chatible

        <Route path='/login' component={LoginForm} exact/>
        <Route path='/signup' component={SignupForm} exact/>
    </div>
);

export default landingPage;