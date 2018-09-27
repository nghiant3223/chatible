import React, { Component } from 'react';
import axios from 'axios';
import qs from 'qs'

import { Link } from 'react-router-dom';

import './LoginForm.css';

class LoginForm extends Component {
    usernameChangedHandler = (e) => {
        this.setState({ username: e.target.value });
    }

    passwordChangedHandler = (e) => {
        this.setState({ password: e.target.value });
    }

    formSubmittedHandler = async (e) => {
        e.preventDefault();
        console.log(this.state.username, this.state.password);
        try {
            const res = await axios.put('/api/user/login', qs.stringify({ username: this.state.username, password: this.state.password }));
            localStorage.setItem("x-access-token", res.data);
            this.props.history.replace('/');
        } catch (e) {
            console.log(e);
        }
        
    }

    render() {
        return (
            <div>
                LoginForm

                <form onSubmit={this.formSubmittedHandler}>
                    <input placeholder="Username" onChange={this.usernameChangedHandler} />
                    <br />
                    <input placeholder="Password" onChange={this.passwordChangedHandler} />
                    <br />
                    <button type="submit">Login</button>
                </form>
                
                <Link to="/signup">Go to signup</Link>
            </div>
        )
    }
}

export default LoginForm;