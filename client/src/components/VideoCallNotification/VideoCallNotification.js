import React, { Component } from 'react';
import { connect } from 'react-redux';

import socketGetter from '../../socket';

import './VideoCallNotification.css';
import ringstone from '../../assets/sounds/video-call-ringing.mp3';
import camera from '../../assets/images/video-camera.png';

const ringstoneAudio = <audio src={ringstone} autoPlay loop />;

class Notification extends Component {
    state = {
        data: null
    }

    componentDidMount = () => {
        const socket = socketGetter.getInstance();
        socket.on('aUserMakesVideoCall', data => {
            if (this.props.thisUser.username !== data.from) {
                this.setState({data});
            }
        });
    }
    
    declineButtonClickedHandler = () => {
        this.setState({ data: null });
        const socket = socketGetter.getInstance();
        socket.emit('thisUserDeclinesVideoCall', { from: this.props.thisUser.username, fullnameFrom: this.props.thisUser.fullname, roomId: this.state.data.roomId });
    }

    render() {
        const { data } = this.state;
        if (!data) return null;

        return (
            <div className="notification notification--open">
                <div className="notification__icon">
                    <img src={camera}/>
                </div>
                <div>
                                    <div className="notification__title">{data.fullnameFrom} is calling you</div>
                <div className="notification__option">
                    <a className="notification__option__cancel" onClick={this.declineButtonClickedHandler}>Decline</a>
                    <a className="notification__option__ok" href={"/videocall?roomId=" + data.roomId} target="_blank" onClick={() => this.setState({ data: null })}>Accept</a>
                </div>
                </div>

                {ringstoneAudio}
            </div>
        );
    }
}

const mapStateToProps = ({ thisUser }) => ({ thisUser });

export default connect(mapStateToProps)(Notification);