import React from 'react';

import ChatboxContext from '../../../../contexts/ChatboxContext';

import LHSMessage from './LHSMessage/LHSMessage';

import './LHSMessageContainer.css';
import avatar from '../../../../assets/images/user.svg';

const LHSMessageContainer = (props) => (
    <ChatboxContext.Consumer>
        {
            value => (
                <div className="lhs-message-container">
                    <div className="lhs-message-avatar">
                        <img src={'/avatars/' + props.messages[0].from + '.png'} alt="Avatar" />
                    </div>
                    <div className="lhs-message-container__messages">
                        {props.messages.map((message, i) => <LHSMessage {...message} key={props.id + "." + i} />)}
                    </div>
                </div>
            )
        }
    </ChatboxContext.Consumer>
);

export default LHSMessageContainer;