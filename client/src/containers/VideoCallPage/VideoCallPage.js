import React, { Component } from 'react';
import SimpleWebRTC from 'simplewebrtc';
import axios from 'axios';

import socketGetter from '../../socket';

import './VideoCallPage.css';

class VideoCallPage extends Component {
    state = {
        isLoading: true,
        error: false
    }

    componentDidMount = () => {
        const urlQuery = new URLSearchParams(window.location.search);
        const roomId = urlQuery.get('roomId');
        const init = urlQuery.get('init');

        Promise.all([
            axios.get('/api/room/info/' + roomId, { headers: { 'x-access-token': localStorage.getItem('x-access-token') } }),
            axios.get('/api/user/me', { headers: { 'x-access-token': localStorage.getItem('x-access-token') } })
        ]).then(([roomRes, meRes]) => {
            this.setState({ isLoading: false });
            const { data: { username } } = meRes;
            const { data: { users, type } } = roomRes;

            window.onunload = () => {
                socketGetter.getInstance().emit('thisUserQuitsVideoCall', {from: username});
            }

            const counterpart = type === 'DUAL' ? (users[0].username !== meRes.username ? users[0] : users[1]) : null;

            if (init === 'true') {
                socketGetter.getInstance().emit('thisUserMakesVideoCall', { roomId, from: username, counterpart, users }, data => {
                    console.log('data', data);
                    if (data === 'YOU_ARE_CALLING') return this.setState({ error: 'You are in other video call room' });

                    if (data === 'USER_IS_CALLING') return this.setState({ error: 'This is user is in other video call room.' });

                    this.initiateWebRTC(roomId);
                });
            } else {
                this.initiateWebRTC(roomId);
            }
        }).catch(e => {
            console.log(e);
            this.setState({ error: e.toString(), isLoading: false });
        });
    }

    initiateWebRTC = (roomId) => {
        console.log('init', roomId);
        const webrtc = new SimpleWebRTC({
            localVideoEl: 'localVideo',
            remoteVideosEl: 'remoteVideos',
            autoRequestMedia: true
        });
        webrtc.on('readyToCall', function () {
            webrtc.joinRoom(roomId);
        });
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