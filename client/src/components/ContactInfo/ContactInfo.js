import React, { Component } from 'react';

import ContactInfoHeader from './ContactInfoHeader/ContactInfoHeader';
import OptionList from './OptionList/OptionList';
import SharedFileList from './SharedFileList/SharedFileList';
import SharedImageList from './SharedImageList/SharedImageList';

import './ContactInfo.css';

class ContactInfo extends Component {
    render() {
        return (
            <div className="contact-info">
                <ContactInfoHeader />
                <div className="contact-info__main">
                    <OptionList />
                    <SharedFileList />
                    <SharedImageList />
                </div>
            </div>
        )
    }
}

export default ContactInfo;