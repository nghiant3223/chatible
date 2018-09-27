import React, { Component } from 'react';

import RecentContact from './RecentContact/RecentContact';

class RecentContacts extends Component {
    render() {
        return (
            <div className="contact-list__recent">
                {this.props.contactList.map(contact => <RecentContact {...contact} />)}
            </div>
        );
    }
}

export default RecentContacts;