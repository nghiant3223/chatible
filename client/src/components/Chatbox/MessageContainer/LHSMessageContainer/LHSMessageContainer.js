import React from 'react';

import LHSMessage from './LHSMessage/LHSMessage';

import './LHSMessageContainer.css';
import avatar from '../../../../assets/images/user.svg';

const LHSMessageContainer = (props) => (
    <div className="lhs-message-container">
        <div className="lhs-message-avatar">
            <img src={avatar} alt="Avatar" />
        </div>
        <div className="lhs-message-container__messages">
            {props.messages.map((message, i) => <LHSMessage {...message} key={props.id + "." + i}/>)}
        </div>
    </div>
);

export default LHSMessageContainer;