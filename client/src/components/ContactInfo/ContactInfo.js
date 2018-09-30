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
        colorThemeModalOpen: false
    }

    colorThemeClickedHandler = (i) => {
        this.setState({ colorThemeOption: colorThemes[i] });
    }

    colorThemeChangedHandler = () => {
        this.props.changeContactColor(this.props.roomId, this.state.colorThemeOption);
        axios.post('/api/room/color/' + this.props.roomId, {
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
    }

    render() {
        console.log('contactinfo rerender');
        return (
            <div className="contact-info">
                <ColorThemeModal modalOpen={this.state.colorThemeModalOpen}
                    onCancel={() => this.setState({ colorThemeModalOpen: false })}
                    colorThemeOption={this.state.colorThemeOption}
                    colorThemeClickedHandler={this.colorThemeClickedHandler}
                    onSubmit={this.colorThemeChangedHandler}/>

                <ContactInfoHeader />
                <div className="contact-info__main">
                    <OptionList colorTheme={this.props.colorTheme} changeColorThemeClickedHandler={this.changeColorThemeClickedHandler}/>
                    <SharedFileList />
                    <SharedImageList />
                </div>
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => ({
    changeContactColor: (roomId, colorTheme) => dispatch({ type: 'CHANGE_CONTACT_COLOR', payload: { roomId, colorTheme } })
});

export default connect(null, mapDispatchToProps)(ContactInfo);