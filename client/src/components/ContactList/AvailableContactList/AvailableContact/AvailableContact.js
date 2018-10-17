import React from 'react';
import { connect } from 'react-redux';

import * as actions from '../../../../actions/index';

import './AvailableContact.css';

const availableContact = ({ searchItem, roomId, username, setActiveContact, allUsers }) => {
    const user = allUsers.find(user => user.username === searchItem);
    return (
        <div className="contact-list__all__contact" onMouseDown={() => setActiveContact(roomId)}>
            <div className="contact-list__all__contact__avatar"><img src={user ? user.avatarUrl : '/avatars/default.png'} alt="Avatar" /></div>
            <div className="contact-list__all__contact__fullname">{searchItem}</div>
        </div>
    );
}

const mapDispatchToProps = dispatch => ({
    setActiveContact: roomId => dispatch(actions.setActiveContact(roomId))
});

const mapStateToProps = ({ allUsers }) => ({ allUsers });

export default connect(mapStateToProps, mapDispatchToProps)(availableContact);
