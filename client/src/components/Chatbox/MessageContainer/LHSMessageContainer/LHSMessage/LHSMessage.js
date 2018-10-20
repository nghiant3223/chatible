import React from 'react';
import moment from 'moment';

import ChatboxContext from '../../../../../contexts/ChatboxContext';
import { renderUserMessageContent } from '../../../../../utils';


import './LHSMessage.css';

const lhsMessage = (props) => (
    <ChatboxContext.Consumer>
        {value => (
            <div className="lhs-message-item">
                {renderUserMessageContent({ type: props.type, from: props.from, content: props.content, colorTheme: value.colorTheme })}
                <div className="lhs-message-item__time">
                    <span>{moment(props.time).format('LT')}</span>
                </div>
            </div>
        )}
    </ChatboxContext.Consumer>
);

export default lhsMessage;