import React, { Fragment } from 'react';
import { connect } from 'react-redux';

import * as actions from '../../../../actions/index';
import { renderRecentContactMessageContent } from '../../../../utils';

import './RecentContact.css';

const recentContact = (props) => {
    let className = "recent-contact";
    if (props.seen) className = "recent-contact recent-contact--unread";
    if (props.activeContact.roomId === props.roomId) className = "recent-contact recent-contact--active";
    return (
        <div className={className} onClick={() => props.setActiveContact(props.roomId)} >
            <div className="recent-contact__left">
                <img src="/images/profile_image.png" alt="Avatar" />
            </div>

            {renderLastMessage(props)}
        </div>
    );
}

const mapStateToProps = ({ activeContact, thisUser }) => ({ activeContact, thisUser });

const mapDispatchToProps = dispatch => ({
    setActiveContact: roomId => dispatch(actions.setActiveContact(roomId))
});

export default connect(mapStateToProps, mapDispatchToProps)(recentContact);

function renderLastMessage(props) {
    if (props.lastMessage) {
        const messageDateTime = new Date(props.lastMessage.time);
        const { content, type, from, peopleSeen } = props.lastMessage;
        const { thisUser } = props;
        return (
            <Fragment>
                <div className="recent-contact__mid">
                    <div className="recent-contact__mid__title">{(props.counterpart && props.counterpart.fullname) || props.roomId}</div>
                    <div className="recent-contact__mid__content">{renderRecentContactMessageContent({ content, type, from, thisUser })}</div>
                </div>
                <div className="recent-contact__right">
                    <div className="recent-contact__right__time">
                        {renderHHMM(messageDateTime)}
                    </div>
                    {peopleSeen.length > 0 && (
                        <div className="recent-contact__right__seen">
                            <img src={`/images/profile_image.png`} alt="Avatar" />
                        </div>
                    )}
                </div>
            </Fragment>
        );
    } else return (
        <Fragment>
            <div className="recent-contact__mid">
                <div className="recent-contact__mid__title">{(props.counterpart && props.counterpart.fullname) || props.roomId}</div>
                <div className="recent-contact__mid__content">Chatible: Let wave each other</div>
            </div>
            <div className="recent-contact__right"></div>
        </Fragment>
    );
}

function renderHHMM(messageDateTime) {
    const h = messageDateTime.getHours();
    const m = messageDateTime.getMinutes();
    return (h < 10 ? ('0' + h.toString()) : h.toString()) + ':' + (m < 10 ? ('0' + m.toString()) : m.toString());
}