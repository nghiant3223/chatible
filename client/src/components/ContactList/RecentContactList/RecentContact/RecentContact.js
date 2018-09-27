import React, { Component } from 'react';

import './RecentContact.css';
import avatar from '../../../../assets/images/user.svg';

class RecentContact extends Component {
    render() {
        return (
            <div className="recent-contact">
                <div className="recent-contact__left">
                    <img src={avatar} alt="Avatar" />
                </div>

                <div className="recent-contact__mid">
                    <div className="recent-contact__mid__title">{this.props.fullname}</div>
                    <div className="recent-contact__mid__content">This is a content</div>
                </div>
                
                <div className="recent-contact__right">12:41</div>
            </div>
        );
    }
}

export default RecentContact;