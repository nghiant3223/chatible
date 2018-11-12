import React, { Component } from 'react';
import { connect } from 'react-redux';

import Header from '../../components/Header/Header';
import ContactList from '../../components/ContactList/ContactList';
import Chatbox from '../../components/Chatbox/Chatbox';
import ContactInfo from '../../components/ContactInfo/ContactInfo';
import Spinner from '../../components/UIs/Spinner/Spinner';
import Notification from '../../components/VideoCallNotification/VideoCallNotification';

import socketGetter from '../../socket';
import * as actions from '../../actions/index';

import './HomePage.css';

class HomePage extends Component {
    state = {
        isVideoCallNotificationVisible: false,
        videoCallRoomId: null
    }

    componentDidMount = () => {
        const socket = socketGetter.getInstance();
        
        this.props.fetchInitialData(this.props.history);

       
        socket.on('aUserGoesOnline', ({ username, lastLogin }) => {
            console.log('goes online');
            this.props.updatepartnerLastLogin(username, lastLogin);
        });

        socket.on('aUserGoesOffline', ({ username, lastLogout }) => {
            this.props.updatepartnerLastLogout(username, lastLogout);
        });

        socket.on('aUserCreatesRoom', ({ roomInfo }) => {
            this.props.addContact(roomInfo);
        });
    }
        
    render() {
        if (this.props.thisUser === null || this.props.recentContacts === null || this.props.activeContact === null) {
            return (
                <div className="main-loading">
                    <Spinner />
                </div>
            );
        }

        return (
            <div>
                <Notification />

                <Header />
                <main>
                    <ContactList />
                    <Chatbox key={'chatbox.' + this.props.activeContact.roomId}/>
                    <ContactInfo key={'contact-info.' + this.props.activeContact.roomId}/>
                </main>
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => ({
    fetchInitialData: history => dispatch(actions.fetchUserAndRecentContact(history)),
    updatepartnerLastLogin: (username, lastLogin) => dispatch(actions.updateContactStatusOnline(username, lastLogin)),
    updatepartnerLastLogout: (username, lastLogout) => dispatch(actions.updateContactStatusOffline(username, lastLogout)),
    addContact: roomInfo => dispatch(actions.addContact(roomInfo))
});

const mapStateToProps = ({ thisUser, recentContacts, activeContact }) => ({ thisUser, recentContacts, activeContact });

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);