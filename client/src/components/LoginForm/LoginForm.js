import React, { Component, Fragment } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

import Spinner from '../UIs/Spinner/Spinner';

import './LoginForm.css';

class LoginForm extends Component {
    state = {
        spinnerVisible: false,
        username: '',
        password: ''
    }

    usernameChangedHandler = (e) => {
        this.setState({ username: e.target.value });
    }

    passwordChangedHandler = (e) => {
        this.setState({ password: e.target.value });
    }

    formSubmittedHandler = async (e) => {
        e.preventDefault();
        if (this.state.spinnerVisible) return;

        this.setState({ spinnerVisible: true });
        try {
            const res = await axios.post('/api/login', ({ username: this.state.username, password: this.state.password }));
            this.setState({ spinnerVisible: false });
            localStorage.setItem("x-access-token", res.data);
            this.props.history.replace('/');
        } catch (e) {
            alert(e.response.data);
            this.setState({ spinnerVisible: false });
        }
        
    }

    render() {
        return (
            <Fragment>
                <form>
                    <div>
                        <div className="login-form__input">
                            <input autoFocus type="text" placeholder="Username" tabIndex={1}
                                onChange={this.usernameChangedHandler}
                                value={this.state.username} />
                            <span><i className="icon ion-md-person"></i></span>
                            <div></div>
                        </div>
                        <div className="login-form__input">
                            <input type="password" placeholder="Password" tabIndex={2}
                                onChange={this.passwordChangedHandler}
                                value={this.state.password} />
                            <span><i className="icon ion-md-lock"></i></span>
                            <div></div>
                        </div>
                    </div>
                    <div>
                        <button className="submit-btn" disabled={this.state.spinnerVisible}  onClick={this.formSubmittedHandler} tabIndex={3} onKeyDown={e => { if (e.keyCode == 13) this.formSubmittedHandler() }}>
                            LOGIN
                        </button>
                    </div>
                </form>
                
                <div id="register-link">
                    <Link to='/signup'>Register new account here!</Link>
                </div>
            </Fragment>
        );
    }
}

export default LoginForm;