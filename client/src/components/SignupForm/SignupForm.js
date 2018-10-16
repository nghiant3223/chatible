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
        const data = new FormData();
        data.append('username', this.state.username);
        data.append('password', this.state.password);
        data.append('fullname', this.state.fullname);
        data.append('avatar', this.avatarInput.files[0]);
        await axios.post('/api/signup', data);
        this.props.history.push('/login');
    }

    render() {
        return (
            <div>
                SignupForm

                <form onSubmit={this.formSubmittedHandler}>
                    <input placeholder="Fullname" onChange={this.fullnameChangedHandler} autoFocus/>
                    <br />
                    <input placeholder="Username" onChange={this.usernameChangedHandler} />
                    <br />
                    <input placeholder="Password" onChange={this.passwordChangedHandler} />
                    <br />
                    <input type="file" ref={el => this.avatarInput = el}/>
                    <button type="submit">Signup</button>
                </form>

                <Link to="/login">Go to login</Link>
            </div>
        )
    }
}

export default SignupForm;