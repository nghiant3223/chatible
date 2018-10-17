import React, { Component } from 'react';
import axios from 'axios';
import Modal from 'react-modal';
import { connect } from 'react-redux';
import StandardModal from '../../UIs/StandardModal/StandardModal';

import SelectedTag from './SelectedTag/SelectedTag';

import { arrayDiff } from '../../../utils';
import * as actions from '../../../actions/index';

import './NewContact.css';

const input = (
    <div className="new-contact__inputs">
        <form className="new-contact__inputs__text" >
            <input type="text" placeholder="Type a message..." />
        </form>
        <ul className="new-contact__inputs__actions">
            <label htmlFor="file" title="Send file or image">
                <li className="new-contact__actions__file">
                    <input type="file" name="file" id="file" disabled />
                </li>
            </label>

            <li className="new-contact__actions__emoji"  >
                <div className="new-contact__actions__emoji__icon" title="Send emoji" />
            </li>

            <li className="new-contact__actions__sticker"  >
                <div className="new-contact__actions__sticker__icon" title="Sticker" />
            </li>

            <li className="new-contact__actions__thumbup" >
                <svg aria-labelledby="js_9be" version="1.1" viewBox="0 0 40.16 42.24" preserveAspectRatio="xMinYMax meet" style={{ height: '85%', width: '66%' }}>
                    <title id="js_9be">Send a thumb up</title>
                    <path d="M935.36,1582.44a0,0,0,0,0,0,.06,3.59,3.59,0,0,1-.72,6.53,0,0,0,0,0,0,0,3.56,3.56,0,0,1,.71,2.13,3.6,3.6,0,0,1-3,3.54, 0,0,0,0,0,0,.05,3.56,3.56,0,0,1,.38,1.61,3.61,3.61,0,0,1-3.42,3.6H910v-19.6l5.27-7.9a4,4,0,0,0,.66-2.31l-0.1-4c-0.22-2.4-.09-2.06, 1.13-2.37,2-.51,7.16,1.59,5.13,12.17h11.06A3.59,3.59,0,0,1,935.36,1582.44ZM899,1581h7v22h-7v-22Z"
                        transform="translate(-898.5 -1563.26)" fill="transparent" fillRule="evenodd" stroke="blue"
                        strokeLinecap="round" strokeWidth="5%">
                    </path>
                </svg>
            </li>

        </ul>
    </div>
);

class NewContact extends Component {
    state = {
        toAddList: [],
        textInput: '',
        searchResultVisible: false,
        modalVisible: false,
        modalMessage: ''
    }

    componentDidMount = () => {
        window.addEventListener('click', this.handleSearchResultContainerOutsideClick, false);
    }
    

    handleChange = (e) => {
        this.setState({ textInput: e.target.value });

        if (e.target.value === '') return this.setState({ searchResultVisible: false });

        if (!this.state.searchResultVisible) return this.setState({ searchResultVisible: true });
    }

    searchItemClickedHandler = (username, fullname) => {
        if (this.state.toAddList.map(user => user.username).indexOf(username) === -1) {
            this.setState(prevState => ({ toAddList: prevState.toAddList.concat({ username, fullname }), searchResultVisible: false, textInput: '' }));
        }
    }

    findUserByUsername = (username) => {
        return this.props.allUsers.find(user => user.username == username);
    }

    handleSearchResultContainerOutsideClick = (e) => {
        if (this.searchResultContainer && !this.searchResultContainer.contains(e.target)) {
            this.setState({ searchResultVisible: false });
        }
    }

    handleSelectedTagRemoved = (username) => {
        this.setState(prevState => ({ toAddList: prevState.toAddList.filter(user => user.username !== username) }));
    }

    createButtonClicked = () => {
        if (this.state.toAddList.length < 1) {
            return this.setState({modalVisible: true, modalMessage: 'No user to create new room.'})
        }

        if (this.state.toAddList.length < 2) {
            if (this.props.recentContacts.map(contact => contact.counterpart && contact.counterpart.username).indexOf(this.state.toAddList[0].username) !== -1) {
                return this.setState({ modalVisible: true, modalMessage: 'Contact already exists' });
            }
            return this.props.createRoom([...this.state.toAddList.map(user => user.username), this.props.thisUser.username], this.props.thisUser);
        }
        this.props.createRoom([...this.state.toAddList.map(user => user.username), this.props.thisUser.username]);
    }

    render() {
        return (
            <div className="new-contact">
                <div className="new-contact__box">
                    <div className="new-contact__box__to">
                        <span className="new-contact__box__title">To: </span>
                        {this.state.toAddList.map(user => <SelectedTag username={user.username} fullname={user.fullname} key={user.username} onClick={() => this.handleSelectedTagRemoved(user.username)} />)}
                        <div className="new-contact__box__input">
                            <input onChange={this.handleChange} value={this.state.textInput} autoFocus/>
                            {this.state.searchResultVisible && <div className="new-contact__box__input__search-result" ref={el => this.searchResultContainer = el}>
                                {this.renderSearchResult()}
                            </div>}
                        </div>
                        <a className="new-contact__box__create" onClick={this.createButtonClicked}>Create</a>
                    </div>
                </div>

                {input}

                <StandardModal isOpen={this.state.modalVisible} onRequestClose={() => this.setState({ modalVisible: false })}>
                    <div>{this.state.modalMessage}</div>
                    <div style={{textAlign: "right"}}>
                        <button onClick={() => this.setState({ modalVisible: false })}>OK</button>
                    </div>
                </StandardModal>
            </div>
        );
    }

    renderSearchResult = () => {
        const searchResult = arrayDiff(this.props.allUsers.map(user => user.username), this.state.toAddList.map(user => user.username))
            .filter(username => username.indexOf(this.state.textInput) !== -1);
        if (searchResult.length < 1) return <div className="search-result__no-result">No results</div>;
        return searchResult.map(username => {
            const user = this.findUserByUsername(username);
            return (
                <div key={username} className="contact-list__all__contact" onClick={() => this.searchItemClickedHandler(username, user.fullname)}>
                    <div className="contact-list__all__contact__avatar"><img src={user.avatarUrl} alt="Avatar" /></div>
                    <div className="contact-list__all__contact__fullname">{user.fullname}</div>
                </div>
            );
        });
    }
}

const mapStateToProps = ({ recentContacts, thisUser, allUsers }) => ({ recentContacts, thisUser, allUsers });

const mapDispatchToProps = dispatch => ({
    createRoom: (users, counterpart) => dispatch(actions.createContactAndSetActive(users, counterpart))
});

export default connect(mapStateToProps, mapDispatchToProps)(NewContact);