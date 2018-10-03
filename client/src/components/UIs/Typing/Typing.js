import React from 'react';

import './Typing.css';

const Typing = ({ avatarUrl, text }) => (
    <div className={`lhs-message-container`}>
        <div className="lhs-message-avatar">
            <img src="/images/profile_image.png" alt="Avatar" />
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