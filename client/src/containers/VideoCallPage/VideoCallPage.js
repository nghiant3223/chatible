import React, { Component } from 'react';
import SimpleWebRTC from 'simplewebrtc';
import axios from 'axios';
import socketIOClient from 'socket.io-client';

import { socketPath } from '../../configs';

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
            const { data: { username, fullname } } = meRes;
            const { data: { users, type } } = roomRes;

            const socket = new socketIOClient(socketPath);

            window.onunload = () => {
                socket.emit('thisUserQuitsVideoCall', { from: username, fullnameFrom: fullname, roomId });
                socket.disconnect();
            }

            socket.on('aUserDeclinesVideoCall', data => {
                if (data.roomId === roomId) {
                    alert(`${data.fullnameFrom} declines video call!`);
                }
            });

            socket.on('aUserQuitsVideoCall', data => {
                if (data.roomId === roomId) {
                    alert(`${data.fullnameFrom} quits video call!`);
                }
            })

            const counterpart = type === 'DUAL' ? (users[0].username !== username ? users[0] : users[1]) : null;

            if (init === 'true') {
                socket.emit('thisUserMakesVideoCall', { roomId, from: username, counterpart, users, fullnameFrom: fullname }, data => {
                    if (data === 'YOU_ARE_CALLING') return this.setState({ error: 'You are in other video call room' });

                    if (data === 'USER_IS_CALLING') return this.setState({ error: 'This is user is in other video call room.' });

                    this.initiateWebRTC(roomId);
                });
            } else {
                socket.emit('thisUserJoinsVideoCall', { from: username });
                this.initiateWebRTC(roomId);
            }
        }).catch(e => {
            console.log(e);
            this.setState({ error: e.toString(), isLoading: false });
        });
    }

    initiateWebRTC = (roomId) => {
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
            <div className="videocall-page">
                <video id="localVideo"></video>
                <div id="remoteVideos"></div>
            </div>
        );
    }
}


export default VideoCallPage;