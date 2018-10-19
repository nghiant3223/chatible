import React, { Component } from 'react';
import { connect } from 'react-redux';

import socketGetter from '../../socket';

import './Notification.css';

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
    

    render() {
        const { data } = this.state;
        if (!data) return null;

        return (
            <div className="notification">
                <div className="notification__title">{data.from} is calling you</div>
                <div className="notification__option">
                    <a className="notification__option__cancel" onClick={() => this.setState({ data: null })}>Decline</a>
                    <a className="notification__option__ok" href={"/videocall?roomId=" + data.roomId} target="_blank" onClick={() => this.setState({ data: null })}>Accept</a>
                </div>
            </div>
        );
    }
}

const mapStateToProps = ({ thisUser }) => ({ thisUser });

export default connect(mapStateToProps)(Notification);