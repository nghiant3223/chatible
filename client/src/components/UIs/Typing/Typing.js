import React from 'react';

import avatar from '../../../assets/images/user.svg';

import './Typing.css';

const Typing = ({side, avatarBackgroundColor, text}) => {
    return (
        <div className={`${side}hs-message-container`}>
            {
                side === 'l' && (
                    <div className="lhs-message-avatar">
                        <img src={avatar} alt="Avatar" />
                    </div>
                )
            }
            <div className="lhs-message-container__messages">
                <div className={`${side}hs-message-item`}>
                    <div className={`${side}hs-message-item__content`}>
                        <div className={`message-typing message-typing--${side}hs`}>
                            <div></div>
                            <div></div>
                            <div></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Typing;