import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

import { colorThemes } from '../../configs';
import ContactInfoHeader from './ContactInfoHeader/ContactInfoHeader';
import OptionList from './OptionList/OptionList';
import SharedFileList from './SharedFileList/SharedFileList';
import SharedImageList from './SharedImageList/SharedImageList';
import ColorThemeModal from '../UIs/ColorThemeModal/ColorThemeModal';

import * as actions from '../../actions/index';
import socketGetter from '../../socket';

import './ContactInfo.css';

class ContactInfo extends Component {
    state = {
        colorThemeOption: this.props.colorTheme,
        colorThemeModalOpen: false,
        isFetchingMoreImages: false
    }

    colorThemeClickedHandler = (i) => {
        this.setState({ colorThemeOption: colorThemes[i] });
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
        if (!this.props.activeContact) return null;
        
        return (
            <div className="contact-info" onScroll={this.contactInfoScrolledBottomHandler}>
                <ColorThemeModal modalOpen={this.state.colorThemeModalOpen}
                    onCancel={() => this.setState({ colorThemeModalOpen: false })}
                    colorThemeOption={this.state.colorThemeOption}
                    colorThemeClickedHandler={this.colorThemeClickedHandler}
                    onSubmit={this.colorThemeChangedHandler}/>

                <ContactInfoHeader />
                <div className="contact-info__main">
                    <OptionList changeColorThemeClickedHandler={this.changeColorThemeClickedHandler}/>
                    <SharedFileList files={this.props.activeContact.files} />
                    <SharedImageList images={this.props.activeContact.images} isFetchingMoreImages={this.state.isFetchingMoreImages}/>
                </div>
            </div>
        );
    }
}

const mapStateToProps = ({ activeContact, thisUser }) => ({ activeContact, thisUser });

export default connect(mapStateToProps)(ContactInfo);