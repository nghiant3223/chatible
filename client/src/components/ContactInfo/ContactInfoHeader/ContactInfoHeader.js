import React, { Component, Fragment } from 'react';

import socketGetter from '.././../../socket';

import OfflineTimer from '../../UIs/OfflineTimer/OfflineTimer';
import { connect } from 'react-redux';

import './ContactInfoHeader.css';

class ContactInfoHeader extends Component {
    render() {
        return (
            <div className="contact-info__header">
                
                <div className="contact-info__header__left">
                    <img src={this.props.activeContact.counterpart ? this.props.activeContact.counterpart.avatarUrl : '/avatars/default.png'} alt="Avatar" />
                </div>
        
                <div className="contact-info__header__mid">
                    <div className="contact-info__header__mid__title">
                        {(this.props.activeContact.counterpart && this.props.activeContact.counterpart.fullname) || this.props.activeContact.roomId}
                    </div>
        
                    <div className="contact-info__header__mid__status">
                         {this.renderStatus()}
                    </div>
                </div>
        
                {this.props.activeContact.type === 'DUAL' && (
                    <div className="contact-info__header__right">
                        <a href={"/videocall?init=true&roomId="+this.props.activeContact.roomId} target="_blank">
                            <div>
                            <svg viewBox="0 0 64 64" style={{ clipRule: 'evenodd', fill: 'none', fillRule: 'evenodd', stroke: this.props.activeContact.colorTheme, strokeMiterlimit: 10, strokeWidth: 2 }}><title>Make a video call</title><g><g><path d="M47,27.8v7.5l9,4.5V23.2L47,27.8z M37.2,17H13.8C10.6,17,8,19.6,8,22.8v17.4c0,3.2,2.6,5.8,5.8,5.8h23.3
                            c3.2,0,5.8-2.6,5.8-5.8V22.8C43,19.6,40.4,17,37.2,17z"></path></g></g></svg>
                            </div>
                        </a>
                    </div>      
                )}

            </div>
        )
    }

    renderStatus() {
        const { counterpart } = this.props.activeContact;
        if (!counterpart) return null;

        const { lastLogin } = counterpart;
        const { lastLogout } = counterpart;

        if (new Date(lastLogin) > new Date(lastLogout)) return 'Active now';
        
        return (
            <Fragment>
                Active <OfflineTimer offlineDate={lastLogout} /> ago
            </Fragment>
        );    
    }
}

const mapStateToProps = ({ activeContact }) => ({ activeContact });

export default connect(mapStateToProps)(ContactInfoHeader);