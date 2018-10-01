import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';

import './RecentContact.css';

const recentContact = (props) => {
    let className = "recent-contact";
    if (props.seen) className = "recent-contact recent-contact--unread";
    if (props.recentContacts.activeContact && props.recentContacts.activeContact.roomId === props.roomId) className = "recent-contact recent-contact--active";
    return (
        <div className={className} onClick={() => props.setActiveContact(props.roomId)} >
            <div className="recent-contact__left">
                <img src="/images/profile_image.png" alt="Avatar" />
            </div>

            {renderLastMessage(props)}
        </div>
    );
}

const mapStateToProps = ({ recentContacts }) => ({ recentContacts });

const mapDispatchToProps = dispatch => ({
    setActiveContact: roomId => dispatch({ type: 'MAKE_CONTACT_ACTIVE', payload: roomId })
});

export default connect(mapStateToProps, mapDispatchToProps)(recentContact);

function renderLastMessage(props) {
    console.log('foo', props); 

    if (props.lastMessage !== undefined) {
        const messageDateTime = new Date(props.lastMessage.time);
        console.log(',',    messageDateTime, props.lastMessage.time);
        return (
            <Fragment>
                <div className="recent-contact__mid">
                    <div className="recent-contact__mid__title">{(props.counterpart && props.counterpart.fullname) || props.roomId}</div>
                    <div className="recent-contact__mid__content">{props.lastMessage.content}</div>
                </div>
                <div className="recent-contact__right">{messageDateTime.getHours() + ':' + messageDateTime.getMinutes()}</div>
            </Fragment>
        );
    } else return (
        <Fragment>
            <div className="recent-contact__mid">
                <div className="recent-contact__mid__title">{(props.counterpart && props.counterpart.fullname) || props.roomId}</div>
                <div className="recent-contact__mid__content">Chatible: Let wave each otherrrrrrrr</div>
            </div>
            <div className="recent-contact__right"></div>
        </Fragment>
    );
}