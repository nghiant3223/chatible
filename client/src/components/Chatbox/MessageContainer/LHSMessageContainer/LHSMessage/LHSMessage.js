import React, { Component } from 'react';

import './LHSMessage.css';

class LHSMessage extends Component {
    render() {
        return (
            <div className="lhs-message-item">
                <div className="lhs-message-item__content">
                    {this.props.content}
                </div>
                <div className="lhs-message-item__time">
                    <span>12:25</span>
                </div>
            </div>
        );
    }
}

export default LHSMessage;