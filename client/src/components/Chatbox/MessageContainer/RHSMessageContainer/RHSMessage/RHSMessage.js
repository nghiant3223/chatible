import React, { Component } from 'react';

import ChatboxContext from '../../../../../contexts/ChatboxContext';

import './RHSMessage.css';

class RHSMessage extends Component {
    render() {
        return (
            <ChatboxContext.Consumer>
                {
                    value => (
                        <div className="rhs-message-item">
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