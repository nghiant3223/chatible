import React from 'react';

import { connect } from 'react-redux';

import './Typing.css';

const typing = ({ username, allUsers }) => {
    const user = allUsers.find(user => user.username === username);
    return (
        <div className={`lhs-message-container`}>
            <div className="lhs-message-avatar">
                <img src={user.avatarUrl} alt="Avatar" />
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
}

const mapStateToProps = ({ allUsers }) => ({ allUsers });

export default connect(mapStateToProps)(typing);