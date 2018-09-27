import React, { Component, Fragment } from 'react';
import axios from 'axios';

import ContactListHeader from './ContactListHeader/ContactListHeader';
import RecentContactList from './RecentContactList/RecentContactList';
import AvailableContactList from './AvailableContactList/AvailableContactList';

import './ContactList.css';

class ContactList extends Component {
    state = {
        recentContactList: [],
        availableContactList: [],
        recentVisible: true,
        searchValue: ''
    }

    componentDidMount = async () => {
        this.setState({
            recentContactList: [{ fullname: '1', username: 'a' }, {fullname: '2', username: 'b'}]
        });

        const res = await axios.get('/api/user/');
        const availableContactList = res.data;
        this.setState({ availableContactList });
    }

    inputFocusedHandler = () => {
        this.setState(prevState => ({ recentVisible: !prevState.recentVisible }));
    }

    inputBlurredHandler = () => {
        this.setState(prevState => ({recentVisible: !prevState.recentVisible}))
    }

    inputChangedHandler = (e) => {
        this.setState({ searchValue: e.target.value });
    }

    render() {
        return (
            <div className="contact-list">
                <ContactListHeader inputFocusedHandler={this.inputFocusedHandler} inputBlurredHandler={this.inputBlurredHandler} inputChangedHandler={this.inputChangedHandler}/>
                {this.renderContactList()}
            </div>
        );
    }

    renderContactList() {
        if (this.state.recentVisible) {
            return <RecentContactList contactList={this.state.recentContactList} />;
        } else {
            return <AvailableContactList contactList={this.state.availableContactList} searchValue={this.state.searchValue}/>;
        }
    }
}

export default ContactList;