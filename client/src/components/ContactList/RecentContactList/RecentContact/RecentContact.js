import React, { Fragment, Component} from 'react';
import { connect } from 'react-redux';

import * as actions from '../../../../actions/index';
import { renderRecentContactMessageContent } from '../../../../utils';

import socketGetter from '../../../../socket';

import './RecentContact.css';

class RecentContact extends Component {
    // isNew = true if there is a last message, last message is not from current user and this user has't seen it yet.
    constructor(props) {
        super(props);
        this.state = {
            ...props.lastMessage,
            isNew: props.lastMessage && props.lastMessage.from !== props.thisUser.username && props.lastMessage.peopleSeen.map(person => person.username).indexOf(props.thisUser.username) === -1
        }
    }

    componentDidMount = () => {
        socketGetter.getInstance().on('aUserSendsMessage', data => {
            const { roomId } = data;
            if (this.props.roomId === roomId) {
                const { content, time, type, from } = data;
                this.props.hoistContact(this.props.roomId);
                this.setState({ isNew: this.props.roomId !== this.props.activeContact.roomId, content, time, type, from, peopleSeen: [] });
            }
        });

        socketGetter.getInstance().on('aUserSeesMessage', data => {
            if (this.props.roomId === data.roomId) this.setState(prevState => ({ peopleSeen: prevState.peopleSeen.concat({ from: data.from, time: data.time }) }));
        });
    }

    // If this contact is active, activeRoom changes and lastMessage does not belong to current user then when contact is clicked, socket fires thisUserSeesMessage
    componentDidUpdate = (prevProps, prevState) => {
        if (this.props.roomId === this.props.activeContact.roomId &&
            prevProps.activeContact.roomId !== this.props.activeContact.roomId &&
            this.state.from !== this.props.thisUser.username) {
            console.log('did update');
            this.setState({ isNew: false });
            socketGetter.getInstance().emit('thisUserSeesMessage', {
                roomId: this.props.roomId,
                from: this.props.thisUser.username  
            });
        }
    }
    

    renderLastMessage = () => {
        // This indicates that this room has at least one message
        if (!this.state.from) return (
            <Fragment>
                <div className="recent-contact__mid">
                    <div className="recent-contact__mid__title">{(this.props.counterpart && this.props.counterpart.fullname) || this.props.roomId}</div>
                    <div className="recent-contact__mid__content">Chatible: Let wave each other</div>
                </div>
                <div className="recent-contact__right"></div>
            </Fragment>
        );
        else {
            const { content, type, from, peopleSeen, time } = this.state;
            const messageDateTime = new Date(time);
            const { thisUser } = this.props;
            return (
                <Fragment>
                    <div className="recent-contact__mid">
                        <div className="recent-contact__mid__title">{(this.props.counterpart && this.props.counterpart.fullname) || this.props.roomId}</div>
                        <div className="recent-contact__mid__content">{renderRecentContactMessageContent({ content, type, from, thisUser })}</div>
                    </div>
                    <div className="recent-contact__right">
                        <div className="recent-contact__right__time">
                            {this.renderHHMM(messageDateTime)}
                        </div>
                        {thisUser.username === from && peopleSeen.length > 0 && (
                            <div className="recent-contact__right__seen">
                                <img src={`/images/profile_image.png`} alt="Avatar" />
                            </div>
                        )}
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
        if (this.props.activeContact.roomId === this.props.roomId) className = "recent-contact recent-contact--active";
        return (
            <div className={className} onClick={() => this.props.setActiveContact(this.props.roomId)} >
                <div className="recent-contact__left">
                    <img src="/images/profile_image.png" alt="Avatar" />
                </div>

                {this.renderLastMessage()}
            </div>
        );
    }
}

const mapStateToProps = ({ activeContact, thisUser }) => ({ activeContact, thisUser });

const mapDispatchToProps = dispatch => ({
    setActiveContact: roomId => dispatch(actions.setActiveContact(roomId)),
    hoistContact: roomId => dispatch(actions.hoistContact(roomId))
});

export default connect(mapStateToProps, mapDispatchToProps)(RecentContact);