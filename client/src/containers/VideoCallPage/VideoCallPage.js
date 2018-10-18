import React, { Component } from 'react';
import SimpleWebRTC from 'simplewebrtc';
import axios from 'axios';

import './VideoCallPage.css';

class VideoCallPage extends Component {
    state = {
        isLoading: false,
        error: false
    }

    componentDidMount = async () => {
        let urlQuery = new URLSearchParams(window.location.search);
        let roomId = urlQuery.get('roomId');

        try {
            await axios.get('/api/room/check/' + roomId, { headers: { 'x-access-token': localStorage.getItem('x-access-token') } });
            this.setState({ isLoading: false });
            var webrtc = new SimpleWebRTC({
                localVideoEl: 'localVideo',
                remoteVideosEl: 'remoteVideos',
                autoRequestMedia: true
            });
            webrtc.on('readyToCall', function () {
                webrtc.joinRoom(roomId);
            });
        } catch (e) {
            this.setState({ error: e.toString(), isLoading: false });
        }
    }

    render() {
        if (this.state.error) return this.state.error;
        if (this.state.isLoading) return 'Loading';
        return (
            <div>
                <video id="localVideo"></video>
                <div id="remoteVideos" style={{ height: 500 }}></div>
            </div>
        );
    }
}


export default VideoCallPage;