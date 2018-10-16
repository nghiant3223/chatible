import React, { PureComponent, Fragment } from 'react';
import axios from 'axios';

import Typing from '../../UIs/Typing/Typing';
import Spinner from '../../UIs/Spinner/Spinner';
import Seen from '../../UIs/Seen/Seen';

import { seperateMessages } from '../../../utils';
import socketGetter from '../../../socket';

import './MessageContainer.css';

class MessageContainer extends PureComponent {
    constructor(props) {
        super(props);
        this.initialFetching = true; // this flag is used to make when user first login to the page, this makes the messages container scroll to bottom
        this.activeContactChanged = false; // this flag is used to make messageContainer scrolls down to bottom when activeContact changes
        this.colorThemeChanged = false;
    }

    state = {
        peopleSeen: []
    }
    
    componentDidMount = () => {
        this.messageContainer.scrollTop = this.messageContainer.scrollHeight;

        socketGetter.getInstance().on('aUserSeesMessage', data => {
            if (data.roomId === this.props.roomId) {
                this.setState(prevState => {
                    if (prevState.peopleSeen.map(user => user.username).indexOf(data.from) === -1) {
                        return {
                            peopleSeen: prevState.peopleSeen.concat({
                                username: data.from,
                                time: data.time
                            })
                        };
                    } else return prevState;
                });
            }
        });
    }
    

    componentDidUpdate = (prevProps, prevState) => {
        if (prevProps.messages.length !== this.props.messages.length) {
            const { scrollTop, clientHeight, scrollHeight } = this.messageContainer;
            if (scrollTop + clientHeight >= scrollHeight - 150 ) {
                this.messageContainer.scrollTop = this.messageContainer.scrollHeight;
            }

            if (this.initialFetching) {
                this.messageContainer.scrollTop = this.messageContainer.scrollHeight;
                this.initialFetching = false;
            }

            if (prevProps.isFetchingMore && !this.props.isFetchingMore) {
                this.messageContainer.scrollTop = 10; // allow user to scroll up
            }

            this.setState({
                peopleSeen: (function (messages) {
                    if (messages.length > 0) {
                        const lastMessage = messages[messages.length - 1];
                        return lastMessage.peopleSeen || [];
                    } else return [];
                })(this.props.messages)
            });
        }

        if (this.props.LHSTyping || this.state.peopleSeen.length != prevState.peopleSeen.length) {
            const { scrollTop, clientHeight, scrollHeight } = this.messageContainer;
            if (scrollTop + clientHeight >= scrollHeight - 150 ) {
                this.messageContainer.scrollTop = this.messageContainer.scrollHeight;
            }
        }

        if (prevProps.roomId !== this.props.roomId) {
            this.activeContactChanged = true;

            /**
             * On activeContact changed.
             * Set this flag to true to indicates that it should scroll down to bottom.
             * We cant set scrollTop = scrollHeight at this time because after this update, the messages haven't been fetched again yet.
             */
        }

        if (this.activeContactChanged && this.props.messages.length !== prevProps.messages.length) {
            this.messageContainer.scrollTop = this.messageContainer.scrollHeight;
            this.activeContactChanged = false;

            /**
             * On finishing fetching new activeContact's messages.
             * When activeContact changes and its messages have been fetched, make messageContainer scroll.
             */
        }
    }

    messageContainerScrolledHandler = () => {
        if (this.messageContainer.scrollTop === 0 && !this.props.isFetchingMore) {
            this.props.moreMessagesFetchedHandler();
        }
    }

    messageContainerClickedHandler = () => {
        const length = this.props.messages.length;

        if (length > 0 && this.props.messages[length - 1].from !== this.props.thisUser.username && this.props.messages[length - 1].from !== 'system') {
            socketGetter.getInstance().emit('thisUserSeesMessage', {
                roomId: this.props.roomId,
                from: this.props.thisUser.username
            });
        }
    }

    render() {
        return (
            <div
                className="chatbox__message-container"
                ref={el => this.messageContainer = el}
                onScroll={this.messageContainerScrolledHandler}
                onClick={this.messageContainerClickedHandler}>
                {this.renderContent()}
            </div>
        );
    }

    renderContent() {
        if (this.props.isLoading) {
            return (
                <div className="loader">
                    <Spinner />
                </div>
            );
        }

        return (
            <Fragment>
                {this.props.isFetchingMore && <div className="fetching-more"><Spinner /></div>}
                
                {seperateMessages(this.props.messages, this.props.thisUser.username)}
                
                {this.props.LHSTyping && <Typing />}

                <Seen peopleSeen={this.state.peopleSeen} thisUser={this.props.thisUser}/>
            </Fragment>
        );
    }
}

export default MessageContainer;