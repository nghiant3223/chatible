import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';

import Header from '../../components/Header/Header';
import ContactList from '../../components/ContactList/ContactList';
import Chatbox from '../../components/Chatbox/Chatbox';
import ContactInfo from '../../components/ContactInfo/ContactInfo';
import Spinner from '../../components/UIs/Spinner/Spinner';

import socketGetter from '../../socket';

import './HomePage.css';

class HomePage extends Component {
    state = {
        isLoading: true
    }

    componentDidMount = async () => {
        const socket = socketGetter.getInstance();

        try {
            const meRes = await axios.get('/api/user/me', { headers: { 'x-access-token': localStorage.getItem("x-access-token") } });
            const recentRes = await axios.get('/api/room', { headers: { 'x-access-token': localStorage.getItem('x-access-token') } });
            this.props.setUser(meRes.data);
            this.props.fetchRecentContact(recentRes.data);
            socket.emit('thisUserGoesOnline', {username: meRes.data.username});
        } catch (e) {
            console.log(e);
            this.props.history.replace('/login');
        } finally {
            this.setState({ isLoading: false });
        }

        socket.on('aUserGoesOnline', data => {
            this.props.updateCounterpartLastLogin(data.username, data.lastLogin);
        });

        socket.on('aUserGoesOffline', data => {
            this.props.updateCounterpartLastLogout(data.username, data.lastLogout);
        });
    }
        
    render() {
        if (this.state.isLoading) {
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
    setUser: user => dispatch({
        type: 'SET_USER',
        payload: user
    }),
    fetchRecentContact: contacts => dispatch({
        type: 'FETCH_CONTACT',
        payload: contacts
    }),
    updateCounterpartLastLogin: (username, lastLogin) => dispatch({
        type: 'UPDATE_CONTACT_STATUS__ONLINE',
        payload: { username, lastLogin }
    }),
    updateCounterpartLastLogout: (username, lastLogout) => dispatch({
        type: 'UPDATE_CONTACT_STATUS__OFFLINE',
        payload: { username, lastLogout }
    })
});

const mapStateToProps = ({ thisUser }) => ({ thisUser });

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);