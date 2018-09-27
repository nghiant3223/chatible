import React from 'react';
import { withRouter } from 'react-router';
import axios from 'axios';

import './Header.css';
import avatar from '../../assets/images/user.svg';

const header = (props) => {
    const logoutButtonClickedHandler = () => {
        axios.put('/api/user/logout', {}, { headers: { 'x-access-token': localStorage.getItem("x-access-token") } });
        localStorage.removeItem("x-access-token");
        props.history.replace('/login');
    }

    return (
        <header>
            <div className="header__left">Chatible</div>
            <div className="header__right">
                <div className="header__current-avatar"><img src={avatar} alt="Avatar" /></div>
                <div className="header__current-fullname">Trọng Nghĩa</div>
                <div className="header__navigation-button">
                    <i className="material-icons" onClick={logoutButtonClickedHandler}>
                        last_page
                    </i>
                </div>
            </div>
        </header>
    );
}
export default withRouter(header);