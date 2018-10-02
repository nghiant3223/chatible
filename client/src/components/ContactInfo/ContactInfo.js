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
        isFetchingMoreImages: false,
        files: [],
        images: []
    }

    componentDidMount = () => {
        Promise.all([
            axios.get('/api/file/' + this.props.roomId, { headers: { 'x-access-token': localStorage.getItem('x-access-token') } }),
            axios.get('/api/file/image/' + this.props.roomId, { headers: { 'x-access-token': localStorage.getItem('x-access-token') } })
        ]).then(([filesRes, imagesRes]) => {
            this.setState({ files: filesRes.data, images: imagesRes.data });
        });
    }

    componentDidUpdate = async (prevProps, prevState) => {
        if (prevProps.roomId !== this.props.roomId) {
            Promise.all([
                axios.get('/api/file/' + this.props.roomId, { headers: { 'x-access-token': localStorage.getItem('x-access-token') } }),
                axios.get('/api/file/image/' + this.props.roomId, { headers: { 'x-access-token': localStorage.getItem('x-access-token') } })
            ]).then(([filesRes, imagesRes]) => {
                console.log('roomId', this.props.roomId, 'filesRes', filesRes.data);
                this.setState({ files: filesRes.data, images: imagesRes.data });
            });
        }
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
                    <SharedFileList files={this.state.files} />
                    <SharedImageList images={this.state.images} isFetchingMoreImages={this.state.isFetchingMoreImages}/>
                </div>
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => ({
    changeContactColor: (roomId, colorTheme) => dispatch({ type: 'CHANGE_CONTACT_COLOR', payload: { roomId, colorTheme } })
});

const mapStateToProps = ({ recentContacts }) => ({ roomId: recentContacts.activeContact.roomId });

export default connect(mapStateToProps, mapDispatchToProps)(ContactInfo);