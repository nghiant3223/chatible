import React from 'react';
import { connect } from 'react-redux';

import * as actions from '../../../../actions/index';

import './AvailableContact.css';

const availableContact = ({ username, fullname, setActiveContact, recentContacts, setPseudoActiveContact }) => {
    let foundContact = recentContacts.find(contact => {
        if (!contact.counterpart) return false;
        return contact.counterpart.username === username;
    });
    
    return (
        <div className="contact-list__all__contact" onMouseDown={() =>  foundContact !== undefined ? setActiveContact(foundContact.roomId) : setPseudoActiveContact(username)}>
            <div><img src='/images/profile_image.png' alt="Avatar" /></div>
            <div>{fullname}</div>
        </div>
    );
}

const mapStateToProps = ({ recentContacts }) => ({ recentContacts });

const mapDispatchToProps = dispatch => ({
    setActiveContact: roomId => dispatch(actions.setActiveContact(roomId)),
    setPseudoActiveContact: username => dispatch(actions.setPseudoActiveContact(username))
});

export default connect(mapStateToProps, mapDispatchToProps)(availableContact);
