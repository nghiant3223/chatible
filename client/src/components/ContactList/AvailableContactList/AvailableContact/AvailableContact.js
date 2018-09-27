import React from 'react';

import './AvailableContact.css';
import avatar from '../../../../assets/images/user.svg';

const availableContact =  ({fullname}) => {
    return (
        <div className="contact-list__all__contact">
            <div><img src={avatar} alt="Avatar" /></div>
            <div>{fullname}</div>
        </div>
    );
}

export default availableContact;
