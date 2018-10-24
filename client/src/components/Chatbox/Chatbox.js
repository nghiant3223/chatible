import React, { PureComponent, Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import NewContact from './NewContact/NewContact';

import MessageContainer from './MessageContainer/MessageContainer';
import EmojiPanel from './EmojiPanel/EmojiPanel';
import StickerPanel from './StickerPanel/StickerPanel';
import SharedEditor from './SharedEditor/SharedEditor';

import ChatboxContext from '../../contexts/ChatboxContext';
import socketGetter from '../../socket';
import { emojiMap } from '../../configs';
import * as actions from '../../actions/index';
import { seperateDualRoomMessage, seperateGroupRoomMessage } from '../../utils';

import './Chatbox.css';

class Chatbox extends PureComponent {
    state = {
        emojiPanelVisible: false,
        stickerPanelVisible: false,
        LHSTyping: [],
        textInput: '',
        isLoading: false,
        messages: [],
        isFetchingMore: false,
        shouldScroll: false,
        sharedEditorContent: ''
    }

    componentDidMount = async () => {
        const { roomId } = this.props;

        if (!roomId) return;

        Promise.all([
            axios.get('/api/message/' + roomId + '?count=35', { headers: { 'x-access-token': localStorage.getItem('x-access-token') } }),
            axios.get('/api/room/info/' + roomId, { headers: { 'x-access-token': localStorage.getItem('x-access-token') } })
        ]).then(([messagesRes, roomInfoRes]) => {
            const messages = messagesRes.data;
            for (let i = 0; i < messages.length; i++) {
                messages[i].time = (new Date(messages[i].time)).getTime(); // convert string to real Date
            }
            this.setState({ messages, sharedEditorContent: roomInfoRes.data.sharedEditorContent });
        }).catch(e => {
            console.log(e);
        });

        const socket = socketGetter.getInstance();

        socket.on('aUserSendsMessage', data => {
            if (data.roomId === roomId) {
                this.setState(prevState => ({
                    messages: prevState.messages.concat(data),
                    LHSTyping: prevState.LHSTyping.filter(username => username !== data.from)
                }));
                if (data.type === 'file') {
                    this.props.updateSharedFiles(roomId);
                }
                if (data.type === 'image') {
                    this.props.updateSharedImages(roomId);
                }
            }
        });

        socket.on('aUserIsTyping', data => {
            if (data.roomId === roomId) {
                if (this.state.LHSTyping.indexOf(data.from) === -1) {
                    this.setState(prevState => ({ LHSTyping: prevState.LHSTyping.concat(data.from) }));
                }
            }
        });

        socket.on('aUserStopsTyping', data => {
            if (data.roomId === roomId) {
                if (data.roomId === roomId) {
                    if (this.state.LHSTyping.indexOf(data.from) !== -1) {
                        this.setState(prevState => ({ LHSTyping: prevState.LHSTyping.filter(username => username !== data.from) }));
                    }
                }
            }
        });

        socket.on('aUserChangesColorTheme', data => {
            if (data.roomId === roomId) {
                this.setState(prevState => ({
                    messages: prevState.messages.concat({ ...data, type: 'changeColorTheme', from: 'system' })
                }));
                const { colorTheme } = JSON.parse(data.content);
                this.props.changeContactColor(data.roomId, colorTheme);
            }
        })
    }
    
    
    emojiButtonClickedHandler = () => {
        if (!this.state.emojiPanelVisible) {
            document.addEventListener('click', this.handleEmojiOutsideClick, false);
        } else {
            document.removeEventListener('click', this.handleEmojiOutsideClick, false);
        }
      
        this.setState(prevState => ({
            emojiPanelVisible: !prevState.emojiPanelVisible,
        }));
    }

    handleEmojiOutsideClick = (e) => {
        if (!this.emojiPanel.contains(e.target)) {
            this.emojiButtonClickedHandler();
        }
    }

    stickerButtonClickedHandler = () => {
        if (!this.state.stickerPanelVisible) {
            document.addEventListener('click', this.handleStickerOutsideClick, false);
        } else {
            document.removeEventListener('click', this.handleStickerOutsideClick, false);
        }
      
        this.setState(prevState => ({
            stickerPanelVisible: !prevState.stickerPanelVisible,
        }));
    }

    handleStickerOutsideClick = (e) => {
        if (!this.stickerPanel.contains(e.target)) {
            this.stickerButtonClickedHandler();
        }
    }

    textInputChangedHandler = (e) => {
        let textInput = e.target.value;
        Object.keys(emojiMap).forEach(emoji => textInput = textInput.replace(emojiMap[emoji].shortcut, emoji));
        this.setState({ textInput });

        if (e.target.value === '') {
            socketGetter.getInstance().emit('thisUserStopsTyping', {roomId: this.props.roomId, from: this.props.thisUser.username});
        } else {
            socketGetter.getInstance().emit('thisUserIsTyping', {roomId: this.props.roomId, from: this.props.thisUser.username});
        }

    }

    moreMessagesFetchedHandler = async () => {
        this.setState({ isFetchingMore: true });
        const messagesRes = await axios.get('/api/message/' + this.props.roomId + '?count=' + (this.state.messages.length + 10), { headers: { 'x-access-token': localStorage.getItem('x-access-token') } });

        const messages = messagesRes.data;

        if (messages.length === this.state.messages) return;

        for (let i = 0; i < messages.length; i++) {
            messages[i].time = (new Date(messages[i].time)).getTime(); // convert string to real Date
        }
        this.setState({ messages, isFetchingMore: false });
    }
    
    textInputSubmittedHandler = (e) => {
        e.preventDefault();

        if (this.state.textInput === '') return;
    
        this.setState(prevState => ({
            textInput: '',
            RHSTyping: false,
            messages: prevState.messages.concat({
                from: this.props.thisUser.username,
                content: this.state.textInput,
                time: new Date().toISOString(),
                roomId: this.props.roomId,
                isNew: true,
                type: 'text'
            }),
        }));
    }

    thumbUpClickedHandler = () => {
        this.setState(prevState => ({
            textInput: '',
            RHSTyping: false,
            messages: prevState.messages.concat({
                from: this.props.thisUser.username,
                time: new Date().toISOString(),
                roomId: this.props.roomId,
                isNew: true,
                type: 'thumbup'
            }),
        }));
    }

    fileInputChangedHandler = (e) => {
        e.persist();
        const file = e.target.files[0];
 
        if (!(/[.][a-zA-Z]+$/i).test(file.name)) {
            alert('File type is not supported');
            return;
        }

        const isImage = (/[.](gif|jpg|jpeg|tiff|png|ico|gif)$/i).test(file.name);

        this.setState(prevState => ({
            messages: prevState.messages.concat({
                from: this.props.thisUser.username,
                type: isImage ? 'image' : 'file',
                time: new Date().toISOString(),
                file,
                isNew: true,
                roomId: this.props.roomId
            }),
        }));
    }

    emojiClickedHandler = (emoji) => {
        this.setState(prevState => ({ textInput: prevState.textInput.concat(emoji) }));
    }

    stickerClickedHandler = (stickerName) => {
        this.setState(prevState => ({
            messages: prevState.messages.concat({
                from: this.props.thisUser.username,
                content: stickerName,
                time: new Date().toISOString(),
                roomId: this.props.roomId,
                isNew: true,
                type: 'sticker'
            }),
        }));
    }

    render() {  
        if (!this.props.roomId) return <NewContact />
        return (
            <ChatboxContext.Provider value={{ colorTheme: this.props.colorTheme || 'cyan', counterpartAvatarUrl: this.props.counterpartAvatarUrl }}>
                <div className="chatbox">
                    <SharedEditor roomId={this.props.roomId} content={this.state.sharedEditorContent} />

                    {this.props.type === 'DUAL' ? (
                        <MessageContainer
                            LHSTyping={this.state.LHSTyping}
                            messages={this.state.messages}
                            isLoading={this.state.isLoading}
                            moreMessagesFetchedHandler={this.moreMessagesFetchedHandler}
                            isFetchingMore={this.state.isFetchingMore}
                            roomId={this.props.roomId}
                            thisUser={this.props.thisUser}
                            messagesRenderMethod={seperateDualRoomMessage}/>
                    ) : (
                            <MessageContainer
                            LHSTyping={this.state.LHSTyping}
                            messages={this.state.messages}
                            moreMessagesFetchedHandler={this.moreMessagesFetchedHandler}
                            isFetchingMore={this.state.isFetchingMore}
                            roomId={this.props.roomId}
                            thisUser={this.props.thisUser}
                            messagesRenderMethod={seperateGroupRoomMessage}/>
                    )}

                    <div className="chatbox__inputs">
                        <form className="chatbox__inputs__text" onSubmit={this.textInputSubmittedHandler} >
                            <input type="text" placeholder="Type a message..." autoFocus onChange={this.textInputChangedHandler} value={this.state.textInput} />
                        </form>
                        <ul className="chatbox__inputs__actions">
                            <label htmlFor="file" title="Send file or image">
                                <li className="chatbox__actions__file">
                                    <input type="file" name="file" id="file" onChange={this.fileInputChangedHandler}  onClick={e => e.target.value = null}/>
                                </li>
                            </label>

                            <li className="chatbox__actions__emoji" ref={el => this.emojiPanel = el} >
                                {this.state.emojiPanelVisible && <EmojiPanel emojiClickedHandler={this.emojiClickedHandler} />}
                                <div className="chatbox__actions__emoji__icon" title="Send emoji" onClick={this.emojiButtonClickedHandler}/>
                            </li>

                            <li className="chatbox__actions__sticker"  ref={el => this.stickerPanel = el} >
                                {this.state.stickerPanelVisible && <StickerPanel stickerClickedHandler={this.stickerClickedHandler} />}
                                <div className="chatbox__actions__sticker__icon" title="Sticker" onClick={this.stickerButtonClickedHandler}/>
                            </li>

                            <li className="chatbox__actions__thumbup" onClick={this.thumbUpClickedHandler}>
                                <svg aria-labelledby="js_9be" version="1.1" viewBox="0 0 40.16 42.24" preserveAspectRatio="xMinYMax meet" style={{ height: '85%', width: '66%' }}>
                                    <title id="js_9be">Send a thumb up</title>
                                    <path d="M935.36,1582.44a0,0,0,0,0,0,.06,3.59,3.59,0,0,1-.72,6.53,0,0,0,0,0,0,0,3.56,3.56,0,0,1,.71,2.13,3.6,3.6,0,0,1-3,3.54, 0,0,0,0,0,0,.05,3.56,3.56,0,0,1,.38,1.61,3.61,3.61,0,0,1-3.42,3.6H910v-19.6l5.27-7.9a4,4,0,0,0,.66-2.31l-0.1-4c-0.22-2.4-.09-2.06, 1.13-2.37,2-.51,7.16,1.59,5.13,12.17h11.06A3.59,3.59,0,0,1,935.36,1582.44ZM899,1581h7v22h-7v-22Z"
                                        transform="translate(-898.5 -1563.26)" fill="transparent" fillRule="evenodd" stroke={this.props.colorTheme || 'cyan'}
                                        strokeLinecap="round" strokeWidth="5%">
                                    </path>
                                </svg>
                            </li>

                        </ul>
                    </div>
                </div>
            </ChatboxContext.Provider>
        );
    }
}

const mapStateToProps = ({ activeContact, thisUser }) => ({
    roomId: activeContact.roomId,
    thisUser,
    colorTheme: activeContact.colorTheme,
    counterpartAvatarUrl: activeContact.counterpart ? activeContact.counterpart.avatarUrl : null,
    type: activeContact.type,
    sharedEditorContent: activeContact.sharedEditorContent
});

const mapDispatchToProps = dispatch => ({
    updateSharedFiles: roomId => dispatch(actions.fetchSharedFiles(roomId)),
    updateSharedImages: roomId => dispatch(actions.fetchSharedImages(roomId)),
    changeContactColor: (roomId, colorTheme) => dispatch(actions.changeColorTheme(roomId, colorTheme))
});

export default connect(mapStateToProps, mapDispatchToProps)(Chatbox);