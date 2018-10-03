import React, { Component } from 'react';
import axios from 'axios';

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
        try {
            const res = await axios.post('/api/login', ({ username: this.state.username, password: this.state.password }));
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
                    <input placeholder="Username" onChange={this.usernameChangedHandler} autoFocus/>
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