import React from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import axios from 'axios';

import socketGetter from '../../socket';

import './Header.css';

const header = (props) => {
    const logoutButtonClickedHandler = () => {
        axios.post('/api/logout', {}, { headers: { 'x-access-token': localStorage.getItem("x-access-token") } });
        localStorage.removeItem("x-access-token");
        props.clearState();

        const socket = socketGetter.getInstance();
        socket.emit('thisUserGoesOffline', { username: props.thisUser.username });
        socket.disconnect();
        socketGetter.deleteInstance();
        
        props.history.replace('/login');
    }

    return (
        <header>
            <div className="header__left">Chatible</div>
            <div className="header__right">
                <div className="header__current-avatar"><img src="/images/profile_image.png" alt="Avatar" /></div>
                <div className="header__current-fullname">{props.thisUser.fullname}</div>
                <div className="header__navigation-button" onClick={logoutButtonClickedHandler}>
                    Logout
                </div>
            </div>
        </header>
    );
}

const mapStateToProps = ({ thisUser }) => ({ thisUser });

const mapDispatchToProps = dispatch => ({
    clearState: () => dispatch({ type: 'CLEAR' })
})

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(header));