import React, { Component } from 'react';

import RecentContact from './RecentContact/RecentContact';

class RecentContacts extends Component {
    render() {
        return (
            <div className="contact-list__recent">
                {this.props.contactList.map(room => <RecentContact {...room}/>)}
            </div>
        );
    }
}

export default RecentContacts;