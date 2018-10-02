import React from 'react';

import avatar from '../../../assets/images/user.svg';

import './Typing.css';

const Typing = ({ avatarUrl, text }) => (
    <div className={`$lhs-message-container`}>
        <div className="lhs-message-avatar">
            <img src="/images/profile-image.jpg" alt="Avatar" />
        </div>
        <div className="lhs-message-container__messages">
            <div className={`lhs-message-item`}>
                <div className={`lhs-message-item__content`}>
                    <div className={`message-typing message-typing--lhs`}>
                        <div></div>
                        <div></div>
                        <div></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
);

export default Typing;