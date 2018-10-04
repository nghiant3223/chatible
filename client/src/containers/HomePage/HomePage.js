import React, { Component } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import Header from '../../components/Header/Header';
import ContactList from '../../components/ContactList/ContactList';
import Chatbox from '../../components/Chatbox/Chatbox';
import ContactInfo from '../../components/ContactInfo/ContactInfo';
import Spinner from '../../components/UIs/Spinner/Spinner';

import socketGetter from '../../socket';
import * as actions from '../../actions/index';

import './HomePage.css';

class HomePage extends Component {

    componentDidMount = () => {
        const socket = socketGetter.getInstance();

        this.props.fetchInitialData();
       
        socket.on('aUserGoesOnline', ({ username, lastLogin }) => {
            console.log('goes online');
            this.props.updateCounterpartLastLogin(username, lastLogin);
        });

        socket.on('aUserGoesOffline', ({ username, lastLogout }) => {
            console.log('goes offline');
            this.props.updateCounterpartLastLogout(username, lastLogout);
        });

    }
        
    render() {
        if (this.props.thisUser === false || this.props.recentContacts === false) {
            return <Redirect to = '/login' /> ;
        }

        if (this.props.thisUser === null || this.props.recentContacts === null || this.props.activeContact === null) {
            console.log('readh')
            return (
                <div className="main-loading">
                    <Spinner />
                </div>
            );
        }

        return (
            <div>
                <Header />
                <main>
                    <ContactList />
                    <Chatbox />
                    <ContactInfo />
                </main>
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => ({
    fetchInitialData: () => dispatch(actions.fetchUserAndRecentContact()),
    updateCounterpartLastLogin: (username, lastLogin) => dispatch(actions.updateContactStatusOnline(username, lastLogin)),
    updateCounterpartLastLogout: (username, lastLogout) => dispatch(actions.updateContactStatusOffline(username, lastLogout))
});

const mapStateToProps = ({ thisUser, recentContacts, activeContact }) => ({ thisUser, recentContacts, activeContact });

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);