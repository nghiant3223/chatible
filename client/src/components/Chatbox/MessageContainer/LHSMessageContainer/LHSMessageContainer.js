import React from 'react';

import LHSMessage from './LHSMessage/LHSMessage';

import './LHSMessageContainer.css';
import avatar from '../../../../assets/images/user.svg';

const LHSMessageContainer = (props) => (
    <div className="lhs-message-container">
        <div class="lhs-message-avatar">
            <img src={avatar} alt="Avatar" />
        </div>
        <div class="lhs-message-container__messages">
            {props.messages.map(message => <LHSMessage {...message} />)}
        </div>
    </div>
);

export default LHSMessageContainer;