import React, { Component } from 'react';
import axios from 'axios';

import ChatboxContext from '../../../../../contexts/ChatboxContext';

import socketGetter from '../../../../../socket';

import './RHSMessage.css';

class RHSMessage extends Component {
    state = {
        error: false
    }

    componentDidMount = () => {
        const { from, roomId, content, isNew } = this.props;
        const socket = socketGetter.getInstance();

        if (isNew) {
            switch (content) {
                default: {
                    try {
                        axios.post('/api/message/' + roomId, { content }, { headers: { 'x-access-token': localStorage.getItem('x-access-token') } });
                        socket.emit('thisUserSendsMessage', { from, roomId, content, time: new Date().toISOString() });
                    } catch (e) {
                        console.log(e);
                        this.setState({ error: true });
                        socket.emit('thisUserStopsTyping', { roomId });
                    }
                }
            }
        };
    }

    render() {
        let className = "rhs-message-item";
        if (this.state.error) className = [className, "rhs-message-item--error"].join(' ');
        return (
            <ChatboxContext.Consumer>
                {
                    value => (
                        <div className={className}>
                            <div className="rhs-message-item__content" style={{ background: value.colorTheme }}>
                                {this.props.content}
                            </div>
                            <div className="rhs-message-item__time">
                                <span>12:25</span>
                            </div>
                        </div>
                    )
            }
                </ChatboxContext.Consumer>
        );
    }
}

export default RHSMessage;