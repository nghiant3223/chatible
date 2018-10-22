import React, { Component, Fragment } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import moment from 'moment';

import ChatboxContext from '../../../../../contexts/ChatboxContext';
import Spinner from '../../../../UIs/Spinner/Spinner';

import socketGetter from '../../../../../socket';
import { renderUserMessageContent } from '../../../../../utils';
import * as actions from '../../../../../actions/index';

import './RHSMessage.css';

class RHSMessage extends Component {
    constructor(props) {    
        super(props);
        this.state = {
            error: false,
            isLoading: false,
            content: props.content
        }
    }    

    componentDidMount = async () => {
        const { from, roomId, content, isNew, type, file, time } = this.props;
        const socket = socketGetter.getInstance();

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
                        
                        type === 'file' ? this.props.updateSharedFiles(roomId) : this.props.updateSharedImages(roomId);
                    } catch (e) {
                        console.log(e);
                        this.setState({ error: true });
                    } finally {
                        this.setState({ isLoading: false });
                    }
                    break;
                
                // do the same thing with type 'text', 'thumbup', 'sticker'
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
            this.props.updateContactLastMessage(roomId, { type, time, from, content, peopleSeen: [] });
            this.props.hoistContact(roomId);
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
        if (this.state.error) return <div />

        if (this.props.isNew && this.state.isLoading || ((this.props.type === 'file' || this.props.type === 'image') && this.state.content === undefined)) return <Spinner style={{ width: '15px', height: '15px' }} />;
        
        return (
            <Fragment>
                {renderUserMessageContent({ type: this.props.type, from: this.props.from, colorTheme: value.colorTheme, content: !this.props.isNew ? this.props.content : this.state.content, right: true })}
                <div className="rhs-message-item__time">
                    <span>{moment(this.props.time).format('LT')}</span>
                </div>
            </Fragment>
        );
    }
}

const mapDispatchToProps = dispatch => ({
    updateSharedFiles: roomId => dispatch(actions.fetchSharedFiles(roomId)),
    updateSharedImages: roomId => dispatch(actions.fetchSharedImages(roomId)),
    updateContactLastMessage: (roomId, messageInfo) => dispatch(actions.updateContactLastMessage(roomId, messageInfo)),
    hoistContact: roomId => dispatch(actions.hoistContact(roomId))
});

export default connect(null, mapDispatchToProps)(RHSMessage);