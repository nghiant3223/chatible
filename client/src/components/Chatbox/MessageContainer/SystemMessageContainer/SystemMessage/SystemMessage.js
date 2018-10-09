import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

import {  renderSystemMessageContent } from '../../../../../utils';

import './SystemMessage.css';

class SystemMessage extends Component {
    render() {
        const { type, content, thisUser } = this.props;
        return (
            <div className="system-message">
                {renderSystemMessageContent(type, content, thisUser)}
            </div>
        );
    }
}

const mapStateToProps = ({ thisUser }) => ({ thisUser });

export default connect(mapStateToProps)(SystemMessage);