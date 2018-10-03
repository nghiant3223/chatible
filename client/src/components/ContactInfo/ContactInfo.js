import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

import { colorThemes } from '../../configs';
import ContactInfoHeader from './ContactInfoHeader/ContactInfoHeader';
import OptionList from './OptionList/OptionList';
import SharedFileList from './SharedFileList/SharedFileList';
import SharedImageList from './SharedImageList/SharedImageList';
import ColorThemeModal from '../UIs/ColorThemeModal/ColorThemeModal';

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
        this.props.changeContactColor(roomId, this.state.colorThemeOption);
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
    }

    changeColorThemeClickedHandler = () => {
        this.setState({ colorThemeModalOpen: true });
    };

    render() {
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

const mapDispatchToProps = dispatch => ({
    changeContactColor: (roomId, colorTheme) => dispatch({ type: 'CHANGE_CONTACT_COLOR', payload: { roomId, colorTheme } })
});

const mapStateToProps = ({ recentContacts }) => ({ activeContact: recentContacts.activeContact });

export default connect(mapStateToProps, mapDispatchToProps)(ContactInfo);