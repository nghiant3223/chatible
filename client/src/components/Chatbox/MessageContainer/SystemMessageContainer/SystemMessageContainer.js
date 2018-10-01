import React from 'react';

import SystemMessage from './SystemMessage/SystemMessage';

import './SystemMessageContainer.css';

const SystemMessageContainer = (props) => props.messages.map((message, i) => <SystemMessage {...message} key={props.id + "." + i}/>);

export default SystemMessageContainer;