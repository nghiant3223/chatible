import React, { Component } from 'react';
import axios from 'axios';

import Header from '../../components/Header/Header';
import ContactList from '../../components/ContactList/ContactList';
import Chatbox from '../../components/Chatbox/Chatbox';
import ContactInfo from '../../components/ContactInfo/ContactInfo';

import './HomePage.css';

class HomePage extends Component {
    state = {
        isLoading: true
    }

    componentDidMount = async () => {
        try {
            const res = await axios.get('/api/user/me', { headers: { 'x-access-token': localStorage.getItem("x-access-token") } })
            console.log(res.data);
        } catch (e) {
            console.log(e);
            this.props.history.replace('/login');
        } finally {
            this.setState({ isLoading: false });
        }
    }
        
    render() {
        if (this.state.isLoading) {
            return (
                <div>
                    Loading...
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

export default HomePage;