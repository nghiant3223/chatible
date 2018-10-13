import React from 'react';

import AvailableContact from './AvailableContact/AvailableContact';

import './AvailableContactList.css';

const availableContactList = ({ searchValue, allUsers }) => {
    if (searchValue === '') {
        return (
            <div className="contact-list__all">
                {allUsers.map(user => <AvailableContact key={user.username} {...user} />)}
            </div>
        );
    } else {
        return (
            <div className="contact-list__all">
                {allUsers.map(user => user.fullname.toLowerCase().indexOf(searchValue.toLowerCase()) !== -1 ? <AvailableContact key={user.username} {...user} /> : null)}
            </div>
        );
    }
};

export default availableContactList;