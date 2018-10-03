import React, { Component, Fragment } from 'react';

import Typing from '../../UIs/Typing/Typing';
import Spinner from '../../UIs/Spinner/Spinner';

import { seperateMessages } from '../../../utils';

import './MessageContainer.css';

class MessageContainer extends Component {
    constructor() {
        super();
        this.initialFetching = true; // this is used to make when user first login to the page, this makes the messages container scroll to bottom
        this.activeContactChanged = false;
    }
    
    componentDidUpdate = (prevProps, prevState) => {
        if (prevProps.messages.length !== this.props.messages.length) {
            const { scrollTop, clientHeight, scrollHeight } = this.messageContainer;
            if (scrollTop + clientHeight >= scrollHeight - 60) {
                this.messageContainer.scrollTop = this.messageContainer.scrollHeight;
            }
            if (this.initialFetching) {
                this.messageContainer.scrollTop = this.messageContainer.scrollHeight;
                this.initialFetching = false;
            }
            if (prevProps.isFetchingMore && !this.props.isFetchingMore) {
                this.messageContainer.scrollTop = 10; // allow user to scroll up
            }
        }

        if (prevProps.activeContact && this.props.activeContact && prevProps.activeContact.roomId !== this.props.activeContact.roomId) {
            this.activeContactChanged = true;
        }

        if (this.activeContactChanged) {
            this.messageContainer.scrollTop = this.messageContainer.scrollHeight;
            this.activeContactChanged = false;
        }
    }

    messageContainerScrolledHandler = () => {
        if (this.messageContainer.scrollTop === 0 && !this.props.isFetchingMore) {
            this.props.moreMessagesFetchedHandler();
        }
    }

    render() {
        return (
            <div className="chatbox__message-container" ref={el => this.messageContainer = el} onScroll={this.messageContainerScrolledHandler}>
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
            </Fragment>
        );
    }
}

export default MessageContainer;