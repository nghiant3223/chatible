import React from 'react';
import moment from 'moment';

import './SeperatingTime.css';

const SeperatingTime = ({time}) => (
    <div className="seperating-time">
        {moment(new Date(time)).calendar().replace(/\sat\s/, ' ').replace('Today', '')}
    </div>
);

export default SeperatingTime;