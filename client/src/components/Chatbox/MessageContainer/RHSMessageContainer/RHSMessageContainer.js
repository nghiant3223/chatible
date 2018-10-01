import React from 'react';

import RHSMessage from './RHSMessage/RHSMessage';

import './RHSMessageContainer.css';

const RHSMessageContainer = (props) => (
    <div className="rhs-message-container">
        {props.messages.map((message, i) => <RHSMessage {...message} key={props.id + "." + i} />)}
    </div>
);

export default RHSMessageContainer;