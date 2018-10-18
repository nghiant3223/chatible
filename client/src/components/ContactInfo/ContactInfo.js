import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

import { colorThemes } from '../../configs';
import ContactInfoHeader from './ContactInfoHeader/ContactInfoHeader';
import OptionList from './OptionList/OptionList';
import SharedFileList from './SharedFileList/SharedFileList';
import SharedImageList from './SharedImageList/SharedImageList';
import ColorThemeModal from './ColorThemeModal/ColorThemeModal';
import UserList from './UserList/UserList';

import socketGetter from '../../socket';

import './ContactInfo.css';

class ContactInfo extends PureComponent {
    state = {
        colorThemeOption: this.props.activeContact.colorTheme,
        colorThemeModalOpen: false,
        isFetchingMoreImages: false
    }

    colorThemeClickedHandler = (i) => {
        this.setState({ colorThemeOption: colorThemes[i] });
    }

    componentDidUpdate = (prevProps, prevState) => {
        console.log('contact info uupdate');    
    }
    

    colorThemeChangedHandler = () => {
        const { roomId } = this.props.activeContact;
        axios.post('/api/room/color/' + roomId, {
            colorTheme: this.state.colorThemeOption
        }, {
            headers: {
                'x-access-token': localStorage.getItem('x-access-token')
            }
        });
        this.setState({
            colorThemeModalOpen: false
        });

        socketGetter.getInstance().emit('thisUserChangesColorTheme', { content: JSON.stringify({ colorTheme: this.state.colorThemeOption, changer: this.props.thisUser.username }), roomId, type: 'changeColorTheme' }); 
    }

    changeColorThemeClickedHandler = () => {
        this.setState({ colorThemeModalOpen: true });
    };

    render() {
        if (JSON.stringify(this.props.activeContact) === '{}' || this.props.activeContact === 'new') return null;

        return (
            <div className="contact-info" onScroll={this.contactInfoScrolledBottomHandler}>
                <ColorThemeModal isOpen={this.state.colorThemeModalOpen}
                    onCancel={() => this.setState({ colorThemeModalOpen: false })}
                    colorThemeOption={this.state.colorThemeOption}
                    colorThemeClickedHandler={this.colorThemeClickedHandler}
                    onSubmit={this.colorThemeChangedHandler} />

                <ContactInfoHeader videoCallButtonOnClicked={this.videoCallButtonOnClicked}/>
                <div className="contact-info__main">
                    <OptionList changeColorThemeClickedHandler={this.changeColorThemeClickedHandler} />
                    {this.props.activeContact.type === 'GROUP' && <UserList users={this.props.activeContact.users}/>}
                    <SharedFileList files={this.props.activeContact.files} />
                    <SharedImageList images={this.props.activeContact.images} isFetchingMoreImages={this.state.isFetchingMoreImages}/>
                </div>
            </div>
        );
    }
}

const mapStateToProps = ({ activeContact, thisUser }) => ({ activeContact, thisUser });

export default connect(mapStateToProps)(ContactInfo);