import React, { Component } from 'react';

import RHSMessageContainer from './RHSMessageContainer/RHSMessageContainer';
import LHSMessageContainer from './LHSMessageContainer/LHSMessageContainer';
import Typing from '../../UIs/Typing/Typing';

import './MessageContainer.css';

class MessageContainer extends Component {
    render() {
        return (
            <div className="chatbox__message-container">
                <RHSMessageContainer messages={[{ content: 'hahaah' }, { 'content': '????' }, { content: 'fofofbar' }]} />
                <LHSMessageContainer messages={[{ content: 'hahaah' }, { 'content': '????' }, { content: 'fofofbar' }]} />
                
                {this.props.LHSTyping && <Typing side='l' avatarBackgroundColor={this.props.avatarBackgroundColor} />}
                {this.props.RHSTyping && <Typing side='r' avatarBackgroundColor={this.props.avatarBackgroundColor} />}

            </div>
        );
    }
}

export default MessageContainer;