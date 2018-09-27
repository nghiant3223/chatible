import React, { Component } from 'react';

import './RHSMessage.css';

class RHSMessage extends Component {
    render() {
        return (
            <div class="rhs-message-item">
                <div class="rhs-message-item__content">
                    {this.props.content}
                </div>
                <div class="rhs-message-item__time">
                    <span>12:25</span>
                </div>
            </div>
        );
    }
}

export default RHSMessage;