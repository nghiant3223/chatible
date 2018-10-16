import React from 'react';
import { connect } from 'react-redux';

import * as actions from '../../../actions/index';

import './ContactListHeader.css';

const contactListHeader = (props) => (
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

        <div className="contact-list__header__new" onMouseDown={() => props.newContact()}>
            <a></a>
        </div>
    </div>
);

const mapDispatchToProps = dispatch => ({
    newContact: () => dispatch(actions.newContact())
});

export default connect(null, mapDispatchToProps)(contactListHeader);