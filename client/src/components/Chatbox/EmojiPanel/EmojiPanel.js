import React from 'react';
import Emoji from '../../UIs/Emoji/Emoji';

import { emojiMap } from '../../../configs';

import './EmojiPanel.css'

const EmojiPanel = (props) => (
    <div className="chatbox__actions__emoji__panel">
        <div className="chatbox-item__actions__input-box__sticker__panel__container">
            {Object.keys(emojiMap).map(emoji => <Emoji code={emojiMap[emoji].code} key={emojiMap[emoji].code} onClick={() => props.emojiClickedHandler(emoji)} style={{ cursor: 'pointer' }} />)}
        </div>
            
    </div>
);

export default EmojiPanel;