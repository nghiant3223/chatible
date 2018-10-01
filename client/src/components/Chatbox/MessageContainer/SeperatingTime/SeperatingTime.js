import React from 'react';
import moment from 'moment';

import './SeperatingTime.css';

const SeperatingTime = ({time}) => (
    <div className="seperating-time">
        {moment(new Date(time)).calendar().replace(/at/, ' ').replace('Today', '')}
    </div>
);

export default SeperatingTime;