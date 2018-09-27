import React from 'react';

import './ContactListHeader.css';

const ContactListHeader = (props) => (
    <div className="contact-list__header">
        <div className="contact-list__header__search">
            <label htmlFor="contact-name">
                <input type="text"
                    name="contact-name"
                    placeholder="Searching for a contact"
                    onFocus={props.inputFocusedHandler}
                    onBlur={props.inputBlurredHandler}
                    onChange={props.inputChangedHandler} />
            </label>
        </div>

        <div className="contact-list__header__new">
            <a></a>
        </div>
    </div>
);

export default ContactListHeader;