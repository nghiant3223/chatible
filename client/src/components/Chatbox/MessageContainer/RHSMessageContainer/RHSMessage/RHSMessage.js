import React, { Component, Fragment } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';

import ChatboxContext from '../../../../../contexts/ChatboxContext';
import Spinner from '../../../../UIs/Spinner/Spinner';

import socketGetter from '../../../../../socket';
import { renderUserMessageContent } from '../../../../../utils';

import * as actions from '../../../../../actions/index';

import './RHSMessage.css';

class RHSMessage extends Component {
    state = {
        error: false,
        isLoading: false,
        content: this.props.content
    }

    componentDidMount = async () => {
        const { from, roomId, content, isNew, type, file } = this.props;
        const socket = socketGetter.getInstance();
        console.log(from, content);
        if (isNew) {
            switch (type) {
                case 'image':
                
                case 'file':
                    this.setState({ isLoading: true });
                    try {
                        const data = new FormData();
                        data.append('file', file);
                        const fileRes = await axios.post('/api/file/' + roomId, data, { headers: { 'x-access-token': localStorage.getItem('x-access-token') } });
                        const returnedContent = JSON.stringify(fileRes.data);
                        axios.post('/api/message/' + roomId, { content: returnedContent, type }, { headers: { 'x-access-token': localStorage.getItem('x-access-token') } });
                        this.setState({ content: returnedContent });
                        socket.emit('thisUserSendsMessage', { from, roomId, content: returnedContent, type });
                        type === 'file' ? this.props.updateSharedFiles(roomId, JSON.parse(returnedContent)) : this.props.updateSharedImages(roomId, JSON.parse(returnedContent));
                    } catch (e) {
                        console.log(e);
                        this.setState({ error: true });
                    } finally {
                        this.setState({ isLoading: false });
                    }
                    break;
                

                default:
                    try {
                        axios.post('/api/message/' + roomId, { content, type }, { headers: { 'x-access-token': localStorage.getItem('x-access-token') } });
                        socket.emit('thisUserSendsMessage', { from, roomId, content, type });
                    } catch (e) {
                        console.log(e);
                        this.setState({ error: true });
                        socket.emit('thisUserStopsTyping', { roomId });
                    }
            };
        }
    }

    render() {
        let className = "rhs-message-item";
        if (this.state.error) className += " rhs-message-item--error";
        return (
            <ChatboxContext.Consumer>
                {
                    value => (
                        <div className={className}>
                            {this.renderMessageItem(value)}
                        </div>
                    )
                }
            </ChatboxContext.Consumer>
        );
    }

    renderMessageItem(value) {
        if (this.state.isLoading || ((this.props.type === 'file' || this.props.type === 'image') && this.state.content === undefined)) return <Spinner style={{ width: '15px', height: '15px' }} />;

        return (
            <Fragment>
                {renderUserMessageContent({ type: this.props.type, from: this.props.from, colorTheme: value.colorTheme, content: this.state.content, right: true })}
                <div className="rhs-message-item__time">
                    <span>{this.props.time}</span>
                </div>
            </Fragment>
        );
    }
}

const mapDispatchToProps = dispatch => ({
    updateSharedFiles: (roomId, fileInfo) => dispatch(actions.updateSharedFiles(roomId, fileInfo)),
    updateSharedImages: (roomId, imageInfo) => dispatch(actions.updateSharedImages(roomId, imageInfo))
});

export default connect(null, mapDispatchToProps)(RHSMessage);