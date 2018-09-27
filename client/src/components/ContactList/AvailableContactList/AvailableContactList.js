import React from 'react';

import AvailableContact from './AvailableContact/AvailableContact';

import './AvailableContactList.css';

const availableContactList = ({searchValue, contactList}) => {
    if (searchValue === '') {
        return (
            <div className="contact-list__all">
                {contactList.map(contact => <AvailableContact {...contact} />)}
            </div>
        );
    } else {
        return (
            <div className="contact-list__all">
                {contactList.map(contact => contact.fullname.toLowerCase().indexOf(searchValue.toLowerCase()) !== -1 ? <AvailableContact {...contact} /> : null)}
            </div>
        );
    }
};

export default availableContactList;