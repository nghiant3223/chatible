import React, { Component } from 'react';

import RHSMessageContainer from './RHSMessageContainer/RHSMessageContainer';
import LHSMessageContainer from './LHSMessageContainer/LHSMessageContainer';
import Typing from '../../UIs/Typing/Typing';

import { seperateMessages } from '../../../utils';

import './MessageContainer.css';

class MessageContainer extends Component {
    render() {
        return (
            <div className="chatbox__message-container">
                {seperateMessages(this.props.messages, 'r')}
                
                {this.props.LHSTyping && <Typing />}

            </div>
        );
    }
}

export default MessageContainer;