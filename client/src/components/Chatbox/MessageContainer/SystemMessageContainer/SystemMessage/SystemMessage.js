import React from 'react';

import './SystemMessage.css';

const SystemMessage = ({content}) => (
    <div className="system-mess">
        {content}
    </div>
);

export default SystemMessage;