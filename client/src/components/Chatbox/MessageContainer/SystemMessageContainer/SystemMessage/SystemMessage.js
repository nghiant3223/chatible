import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

import {  renderSystemMessageContent } from '../../../../../utils';

import './SystemMessage.css';

class SystemMessage extends Component {
    componentDidMount = () => {
        const { roomId, content, type, isNew } = this.props;
        if (isNew) {
            axios.post('/api/message/' + roomId, { content, type, from: 'system' }, { headers: { 'x-access-token': localStorage.getItem('x-access-token') } });
        }
    }
    

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