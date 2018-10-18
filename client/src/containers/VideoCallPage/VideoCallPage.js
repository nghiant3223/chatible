import React, { Component } from 'react';
import SimpleWebRTC from 'simplewebrtc';

import './VideoCallPage.css';

class VideoCallPage extends Component {
    state = {
        myinfo: null,
        friendinfo: null
    }

    componentDidMount = () => {
        var webrtc = new SimpleWebRTC({
            localVideoEl: 'localVideo',
            remoteVideosEl: 'remoteVideos',
            autoRequestMedia: true
        });
        webrtc.on('readyToCall', function () {
            webrtc.joinRoom('aRoom');
        });
    }


    render() {
        return (
            <div>
                <video id="localVideo"></video>
                <div id="remoteVideos" style={{ height: 500 }}></div>
            </div>
        );
    }
}

export default VideoCallPage;