import React, { PureComponent, Fragment } from 'react';

import Typing from '../../UIs/Typing/Typing';
import Spinner from '../../UIs/Spinner/Spinner';

import { seperateMessages } from '../../../utils';

import './MessageContainer.css';

class MessageContainer extends PureComponent {
    constructor() {
        super();
        this.initialFetching = true; // this flag is used to make when user first login to the page, this makes the messages container scroll to bottom
        this.activeContactChanged = false; // this flag is used to make messageContainer scrolls down to bottom when activeContact changes
        this.colorThemeChanged = false;
    }
    
    componentDidUpdate = (prevProps, prevState) => {
        console.log('update', prevProps, this.props);

        if (prevProps.messages.length !== this.props.messages.length) {
            const { scrollTop, clientHeight, scrollHeight } = this.messageContainer;
            if (scrollTop + clientHeight >= scrollHeight - 100) {
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