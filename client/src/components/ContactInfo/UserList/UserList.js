import React from 'react';
import { connect } from 'react-redux';

import Dropdown from '../../../hocs/ContactInfoDropdown/ContactInfoDropdown';

import './UserList.css';

const UserList = ({ users, allUsers }) => {
    if (allUsers.length < 1) return null;
    return (
        <Dropdown title="Members">
            <div>
                {users.map(username => {
                    const user = allUsers.find(user => user.username === username);
                    return (
                        <div key={username} className="contact-list__all__contact">
                            <div className="contact-list__all__contact__avatar">
                                <img src={user.avatarUrl} alt={'Avatar of' + user.fullname} />
                            </div>
                            <div className="contact-list__all__contact__fullname">{user.fullname}</div>
                        </div>
                    )
                })}
            </div>
        </Dropdown>
    );
};

const mapStateToProps = ({ allUsers }) => ({ allUsers });

export default connect(mapStateToProps)(UserList);