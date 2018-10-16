import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

import ContactListHeader from './ContactListHeader/ContactListHeader';
import RecentContactList from './RecentContactList/RecentContactList';
import AvailableContactList from './AvailableContactList/AvailableContactList';

import './ContactList.css';

class ContactList extends Component {
    state = {
        recentVisible: true,
        allUsers: [],
        searchValue: ''
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
            return <RecentContactList contactList={this.props.recentContacts} />;
        } else {
            return <AvailableContactList contactList={this.props.recentContacts} searchValue={this.state.searchValue}/>;
        }
    }
}

const mapStateToProps = ({ recentContacts, thisUser }) => ({ recentContacts, thisUser });

export default connect(mapStateToProps)(ContactList);