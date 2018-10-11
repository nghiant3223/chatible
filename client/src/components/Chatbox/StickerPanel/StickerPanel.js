import React from 'react';

import Sticker from '../../UIs/Sticker/Sticker';

import './StickerPanel.css'

import { stickerMap } from '../../../configs';

const StickerPanel = (props) => (
    <div className="chatbox__actions__sticker__panel">
        <div className="chatbox-item__actions__sticker__panel__container">
            {Object.keys(stickerMap).map(sticker => <Sticker
                name={sticker}
                small
                interval={stickerMap[sticker].interval}
                onClick={() => props.stickerClickedHandler(sticker)}
                positions={stickerMap[sticker].smallPositions} />)}
        </div>
    </div>
);

export default StickerPanel;