import React from 'react';

import './AvailableContact.css';

const availableContact =  ({counterpart}) => {
    return (
        <div className="contact-list__all__contact">
            <div><img src='/images/profile_image.png' alt="Avatar" /></div>
            <div>{counterpart.fullname}</div>
        </div>
    );
}

export default availableContact;
