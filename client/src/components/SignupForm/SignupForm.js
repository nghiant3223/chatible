import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom'
import axios from 'axios';

import './SignupForm.css';
import upload from '../../assets/images/upload.png';

class SignupForm extends Component {
    state = {
        spinnerVisible: false,
        fullname: '',
        username: '',
        password: ''
    }

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

        if (this.state.spinnerVisible) return;

        this.setState({ spinnerVisible: true });
        try {
            const data = new FormData();
            data.append('username', this.state.username);
            data.append('password', this.state.password);
            data.append('fullname', this.state.fullname);
            data.append('avatar', this.avatarInput.files[0]);
            await axios.post('/api/signup', data);
            this.setState({ spinnerVisible: false });
            this.props.history.push('/login');
        } catch (e) {
            alert(e.response.data);
            this.setState({ spinnerVisible: false });
        }
    }

    avatarInputChangedHandler = (e) => {
        this.avatarInputBackground.src = URL.createObjectURL(e.target.files[0])
    }

    render() {
        return (
            <Fragment>
                <div className="login-form__form">
                    <form>
                        <div>
                            <div className="login-form__input">
                                <input autoFocus type="text" placeholder="Fullname" tabIndex={1}
                                    onChange={this.fullnameChangedHandler}
                                    value={this.state.fullname} />
                                <span>A</span>
                                <div></div>
                            </div>
                            <div className="login-form__input">
                                <input type="text" placeholder="Username" tabIndex={2}
                                    onChange={this.usernameChangedHandler}
                                    value={this.state.username} />
                                <span><i className="icon ion-md-person"></i></span>
                                <div></div>
                            </div>
                            <div className="login-form__input">
                                <input type="password" placeholder="Password" tabIndex={3}
                                    onChange={this.passwordChangedHandler}
                                    value={this.state.password} />
                                <span><i className="icon ion-md-lock"></i></span>
                                <div></div>
                            </div>
                        </div>
                        <div>
                            <button className="submit-btn" disabled={this.state.spinnerVisible} onClick={this.formSubmittedHandler} tabIndex={4} onKeyDown={e => { if (e.keyCode == 13) this.formSubmittedHandler() }}>
                                Signup
                        </button>
                        </div>
                    </form>

                
                    <div className="login-form__form__avatar">
                        <div className="login-form__form__avatar__init">
                            <div>
                                <img src={upload}/>
                            </div>
                            <p>Upload your avatar</p>
                        </div>
                        <img ref={el => this.avatarInputBackground = el} src={null}/>
                        <input type="file" accept="image/*" ref={el => this.avatarInput = el} onChange={this.avatarInputChangedHandler}/>
                    </div>
                </div>


                <div id="register-link">
                    <Link to='/login'>Login existing account here!</Link>
                </div>
            </Fragment>
        );
    }
}

export default SignupForm;