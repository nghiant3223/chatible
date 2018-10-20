import React, { Fragment, Component} from 'react';
import { connect } from 'react-redux';

import * as actions from '../../../../actions/index';
import { renderRecentContactMessageContent } from '../../../../utils';

import socketGetter from '../../../../socket';

import './RecentContact.css';

const getInitIsNew = (props) => {
    if ((props.lastMessage && props.lastMessage.from !== props.thisUser.username)) {
        return props.lastMessage.peopleSeen.map(person => person.username).indexOf(props.thisUser.username) === -1;
    }
    else return false;
}

class RecentContact extends Component {
    // isNew = true if there is a last message, the last message is not from current user and this user has't seen it yet.
    constructor(props) {
        super(props);
        this.state = {
            isNew: getInitIsNew(props) || props.isNew
        }
    }

    componentDidMount = () => {
        socketGetter.getInstance().on('aUserSendsMessage', data => {
            const { roomId } = data;
            if (this.props.roomId === roomId) {
                const { content, time, type, from } = data;
                this.props.hoistContact(this.props.roomId);
                this.props.updateContactLastMessage(roomId, { content, time, type, from });
                this.setState({
                    isNew: this.props.roomId !== this.props.activeContact.roomId
                });
            }
        });

        socketGetter.getInstance().on('aUserSeesMessage', data => {
            if (this.props.roomId === data.roomId && this.props.lastMessage && this.props.lastMessage.peopleSeen && this.props.lastMessage.peopleSeen.map(person => person.username).indexOf(data.from) === -1) {
                this.props.updateContactLastMessage(this.props.roomId, {
                    ...this.props.lastMessage,
                    peopleSeen: this.props.lastMessage.peopleSeen.concat({ username: data.from, time: data.time })
                });
            }
        });
    }

    componentDidUpdate = (prevProps, prevState) => {
        /**
         * When user is from other room, 
         * he visits this room, make this room old (isNew = false) and fire `thisUserSeesMessage`
         */
        if (this.props.roomId === this.props.activeContact.roomId &&
            prevProps.activeContact.roomId !== this.props.activeContact.roomId &&
            this.state.from !== this.props.thisUser.username) {
            this.setState({ isNew: false });
            socketGetter.getInstance().emit('thisUserSeesMessage', {
                roomId: this.props.roomId,
                from: this.props.thisUser.username  
            });
        }

        // When new message arrive and this room is active, make this room old (isNew = false)
        if (this.props.roomId === this.props.activeContact.roomId && JSON.stringify(prevProps.activeContact.lastMessage) !== JSON.stringify(this.props.activeContact.lastMessage)) {
            this.setState({ isNew: false });
        }

        // When this room was previously active, user visits other room, make this room old (isNew = false)
        if (prevState.isNew && this.props.activeContact.roomId === this.props.roomId) {
            this.setState({ isNew: false });
        }
    }
    

    renderLastMessage = () => {
        // This indicates that this room has at least one message
        if (!this.props.lastMessage) return (
            <Fragment>
                <div className="recent-contact__mid">
                    <div className="recent-contact__mid__title">{(this.props.counterpart && this.props.counterpart.fullname) || this.props.users.filter(username => username !== this.props.thisUser.username).join(', ')}</div>
                    <div className="recent-contact__mid__content">Chatible: Let wave each other</div>
                </div>
                <div className="recent-contact__right"></div>
            </Fragment>
        );
        else {
            const { content, type, from, peopleSeen, time } = this.props.lastMessage;
            const { thisUser, allUsers } = this.props;
            const messageDateTime = new Date(time);
            return (
                <Fragment>
                    <div className="recent-contact__mid">
                        <div className="recent-contact__mid__title">{(this.props.counterpart && this.props.counterpart.fullname) || this.props.users.filter(username => username !== this.props.thisUser.username).join(', ')}</div>
                        <div className="recent-contact__mid__content">{renderRecentContactMessageContent({ content, type, from, thisUser })}</div>
                    </div>
                    <div className="recent-contact__right">
                        <div className="recent-contact__right__time">
                            {this.renderHHMM(messageDateTime)}
                        </div>
                        {peopleSeen && peopleSeen.length > 0 && thisUser.username === from && allUsers.length > 0 ? (
                        <div className="recent-contact__right__seen">
                            <img src={allUsers.find(user => user.username === peopleSeen[0].username).avatarUrl} alt="Avatar" />
                        </div>
                        ):null}
                    </div>
                </Fragment>
            );
        }
    }

    renderHHMM = (messageDateTime)  => {
        const h = messageDateTime.getHours();
        const m = messageDateTime.getMinutes();
        return (h < 10 ? ('0' + h.toString()) : h.toString()) + ':' + (m < 10 ? ('0' + m.toString()) : m.toString());
    }

    render() {
        let className = "recent-contact";
        if (this.state.isNew) className = className + " recent-contact--new";
        if (this.props.activeContact.roomId === this.props.roomId) className += " recent-contact--active";
        return (
            <div className={className} onClick={() => this.props.setActiveContact(this.props.roomId)} >
                <div className="recent-contact__left">
                    <img src={(this.props.counterpart && this.props.counterpart.avatarUrl) || '/avatars/default.png'} alt="Avatar" />
                </div>

                {this.renderLastMessage()}
            </div>
        );
    }
}

const mapStateToProps = ({ activeContact, thisUser, allUsers }) => ({ activeContact, thisUser, allUsers });

const mapDispatchToProps = dispatch => ({
    setActiveContact: roomId => dispatch(actions.setActiveContact(roomId)),
    hoistContact: roomId => dispatch(actions.hoistContact(roomId)),
    updateContactLastMessage: (roomId, messageInfo) => dispatch(actions.updateContactLastMessage(roomId, messageInfo)),
});

export default connect(mapStateToProps, mapDispatchToProps)(RecentContact);