import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import axios from 'axios';
import qs from 'qs';

import './SignupForm.css';

class SignupForm extends Component {
    fullnameChangedHandler = (e) => {
        this.setState({ fullname: e.target.value });
    }

    usernameChangedHandler = (e) => {
        this.setState({ username: e.target.value });
    }

    passwordChangedHandler = (e) => {
        this.setState({ password: e.target.value });
    }

    formSubmittedHandler = async (e) => {
        e.preventDefault();

        await axios.post('/api/user/signup', qs.stringify({ username: this.state.username, password: this.state.password, fullname: this.state.fullname }));
        this.props.history.push('/login');
    }

    render() {
        return (
            <div>
                SignupForm

                <form onSubmit={this.formSubmittedHandler}>
                    <input placeholder="Fullname" onChange={this.fullnameChangedHandler} />
                    <br />
                    <input placeholder="Username" onChange={this.usernameChangedHandler} />
                    <br />
                    <input placeholder="Password" onChange={this.passwordChangedHandler} />
                    <br />
                    <button type="submit">Signup</button>
                </form>

                <Link to="/login">Go to login</Link>
            </div>
        )
    }
}

export default SignupForm;