import React from 'react';
import { connect } from 'react-redux';

import * as actions from '../../../../actions/index';

import './AvailableContact.css';

const availableContact = ({ searchItem, roomId, setActiveContact}) => {
    return (
        <div className="contact-list__all__contact" onMouseDown={() => setActiveContact(roomId)}>
            <div className="contact-list__all__contact__avatar"><img src='/images/profile_image.png' alt="Avatar" /></div>
            <div className="contact-list__all__contact__fullname">{searchItem}</div>
        </div>
    );
}

const mapDispatchToProps = dispatch => ({
    setActiveContact: roomId => dispatch(actions.setActiveContact(roomId))
});

export default connect(null, mapDispatchToProps)(availableContact);
