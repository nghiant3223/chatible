import React from 'react';

import SystemMessageContainer from './components/Chatbox/MessageContainer/SystemMessageContainer/SystemMessageContainer';
import SeperatingTime from './components/Chatbox/MessageContainer/SeperatingTime/SeperatingTime';
import RHSMessageContainer from './components/Chatbox/MessageContainer/RHSMessageContainer/RHSMessageContainer';
import LHSMessageContainer from './components/Chatbox/MessageContainer/LHSMessageContainer/LHSMessageContainer';
import ThumbUp from './components/UIs/ThumbUp/ThumbUp';
import Emoji from './components/UIs/Emoji/Emoji';
import Sticker from './components/UIs/Sticker/Sticker';

import { emojiMap, stickerMap } from './configs';

import wavinghand from './assets/images/waving-hand.png';

const SECOND = 1000;
const MINUTE = SECOND * 60;
const HOUR = MINUTE * 60;
const DAY = HOUR * 24;
const TIMEGAP = 3*SECOND;

const splitByEmojiReg = /(?:[\u2700-\u27bf]|(?:\ud83c[\udde6-\uddff]){2}|[\ud800-\udbff][\udc00-\udfff]|[\u0023-\u0039]\ufe0f?\u20e3|\u3299|\u3297|\u303d|\u3030|\u24c2|\ud83c[\udd70-\udd71]|\ud83c[\udd7e-\udd7f]|\ud83c\udd8e|\ud83c[\udd91-\udd9a]|\ud83c[\udde6-\uddff]|[\ud83c[\ude01-\ude02]|\ud83c\ude1a|\ud83c\ude2f|[\ud83c[\ude32-\ude3a]|[\ud83c[\ude50-\ude51]|\u203c|\u2049|[\u25aa-\u25ab]|\u25b6|\u25c0|[\u25fb-\u25fe]|\u00a9|\u00ae|\u2122|\u2139|\ud83c\udc04|[\u2600-\u26FF]|\u2b05|\u2b06|\u2b07|\u2b1b|\u2b1c|\u2b50|\u2b55|\u231a|\u231b|\u2328|\u23cf|[\u23e9-\u23f3]|[\u23f8-\u23fa]|\ud83c\udccf|\u2934|\u2935|[\u2190-\u21ff])/g;
const splitByEmojiButRetainDelimiterReg = /((?:[\u2700-\u27bf]|(?:\ud83c[\udde6-\uddff]){2}|[\ud800-\udbff][\udc00-\udfff]|[\u0023-\u0039]\ufe0f?\u20e3|\u3299|\u3297|\u303d|\u3030|\u24c2|\ud83c[\udd70-\udd71]|\ud83c[\udd7e-\udd7f]|\ud83c\udd8e|\ud83c[\udd91-\udd9a]|\ud83c[\udde6-\uddff]|[\ud83c[\ude01-\ude02]|\ud83c\ude1a|\ud83c\ude2f|[\ud83c[\ude32-\ude3a]|[\ud83c[\ude50-\ude51]|\u203c|\u2049|[\u25aa-\u25ab]|\u25b6|\u25c0|[\u25fb-\u25fe]|\u00a9|\u00ae|\u2122|\u2139|\ud83c\udc04|[\u2600-\u26FF]|\u2b05|\u2b06|\u2b07|\u2b1b|\u2b1c|\u2b50|\u2b55|\u231a|\u231b|\u2328|\u23cf|[\u23e9-\u23f3]|[\u23f8-\u23fa]|\ud83c\udccf|\u2934|\u2935|[\u2190-\u21ff]))/g;

export const getOfflineTime = (offlineMoment) => {
    const now = new Date();
    const diff = now.getTime() - new Date(offlineMoment).getTime();

    if (diff < HOUR) return (parseInt(diff / MINUTE, 10) + 1).toString() + 'min';
    else if (diff < 24 * HOUR) return (parseInt(diff / HOUR, 10) + 1).toString() + 'hour';
    else if (diff < 7 * DAY) return (parseInt(diff / DAY, 10) + 1).toString() + 'day';
    else return '';
}

export const renderSystemMessageContent = (type, content, thisUser) => {
    switch (type) {
        case 'changeColorTheme': {
            const { colorTheme, changer } = JSON.parse(content);
            let renderedChanger = thisUser.username === changer ? 'You' : changer;
            return <div>{renderedChanger} has changed color theme to <div className="color-theme-circle" style={{width: 12, height: 12, backgroundColor: colorTheme}}></div></div>
        }
        default:
            return null;
    }
}


export const seperateDualRoomMessage = (messages, RHSName) => {
    if (messages.length < 1) return [];

    for (let i = 0; i < messages.length; i++) {
        messages[i].time = new Date(messages[i].time).getTime();
    }

    let retArr = [];
    let tempLeft = [];
    let tempRight = [];
    let tempMid = [];

    let key = 0;

    if (messages[0].from === RHSName) {
        retArr.push(<SeperatingTime key={'st.' + key + '.-1'} time={messages[0].time} />);
        tempRight.push(messages[0]);
    } else if (messages[0].from === 'system') {
        retArr.push(<SeperatingTime key={'st.' + key + '.-1'} time={messages[0].time} />);
        tempMid.push(messages[0]);
    } else {
        retArr.push(<SeperatingTime key={'st.' + key + '.-1'} time={messages[0].time} />);
        tempLeft.push(messages[0]);
    }
    
    for (var i = 1; i < messages.length; i++) {
        if (messages[i].from === 'system') {
            if (tempLeft.length > 0) {
                if (key > 0 && messages[key].time - messages[key - 1].time > TIMEGAP) {
                    retArr.push(<SeperatingTime key={'st.' + key + '.'} time={messages[key].time} />);
                }

                let tempArr = [tempLeft[0]];
                let subKey = 0;
                for (let j = 1; j < tempLeft.length; j++) {
                    if (tempLeft[j].time - tempLeft[j - 1].time > TIMEGAP) {
                        retArr.push(<LHSMessageContainer messages={tempArr} key={key + '.' + subKey} id={key + '.' + subKey} />);
                        retArr.push(<SeperatingTime key={'st.' + key + '.' + subKey}  id={'st.' + key + '.' + subKey}  time={messages[key + j].time} />);
                        tempArr = [];
                        subKey = j;
                    }
                    tempArr.push(tempLeft[j]);
                }

                if (tempArr.length !== 0) {
                    retArr.push(<LHSMessageContainer messages={tempArr} key={key + '.' + subKey} id={key + '.' + subKey} />);
                }
        
                tempLeft = [];
                key = i;
            } else if (tempRight.length > 0) {
                if (key > 0 && messages[key].time - messages[key - 1].time > TIMEGAP) {
                    retArr.push(<SeperatingTime key={'st.' + key + '.'} time={messages[key].time} />);
                }

                let tempArr = [tempRight[0]];
                let subKey = 0;
                for (let j = 1; j < tempRight.length; j++) {
                    if (tempRight[j].time - tempRight[j - 1].time > TIMEGAP) {
                        retArr.push(<RHSMessageContainer messages={tempArr} key={key + '.' + subKey} id={key + '.' + subKey} />);
                        retArr.push(<SeperatingTime key={'st.' + key + '.' + subKey}  id={'st.' + key + '.' + subKey}  time={messages[key + j].time} />);
                        tempArr = [];
                        subKey = j;
                    }
                    tempArr.push(tempRight[j]);
                }

                if (tempArr.length !== 0) {
                    retArr.push(<RHSMessageContainer messages={tempArr} key={key + '.' + subKey} id={key + '.' + subKey} />);
                }
        
                tempRight = [];
                key = i;
            } 

            tempMid.push(messages[i]);
        } else if (messages[i].from === RHSName) {
            if (tempLeft.length > 0)  {
                if (key > 0 && messages[key].time - messages[key - 1].time > TIMEGAP) {
                    retArr.push(<SeperatingTime key={'st.' + key + '.'} time={messages[key].time} />);
                }
                let tempArr = [tempLeft[0]];
                let subKey = 0;
                for (let j = 1; j < tempLeft.length; j++) {
                    if (tempLeft[j].time - tempLeft[j - 1].time > TIMEGAP) {
                        retArr.push(<LHSMessageContainer messages={tempArr} key={key + '.' + subKey} id={key + '.' + subKey} />);
                        retArr.push(<SeperatingTime key={'st.' + key + '.' + subKey}  id={'st.' + key + '.' + subKey}  time={messages[key + j].time} />);
                        tempArr = [];
                        subKey = j;
                    }
                    tempArr.push(tempLeft[j]);
                }
        
                if (tempArr.length !== 0) {
                    retArr.push(<LHSMessageContainer messages={tempArr} key={key + '.' + subKey} id={key + '.' + subKey} />);
                }
        
                tempLeft = [];
                key = i;
            } else if (tempMid.length > 0) {
                    if (key > 0 && messages[key].time - messages[key - 1].time > TIMEGAP) {
                    retArr.push(<SeperatingTime key={'st.' + key + '.'} time={messages[key].time} />);
                }
                let tempArr = [tempMid[0]];
                let subKey = 0;
                for (let j = 1; j < tempMid.length; j++) {
                    if (tempMid[j].time - tempMid[j - 1].time > TIMEGAP) {
                        retArr.push(<SystemMessageContainer messages={tempArr} key={key + '.' + subKey} id={key + '.' + subKey} />);
                        retArr.push(<SeperatingTime key={'st.' + key + '.' + subKey}  id={'st.' + key + '.' + subKey}  time={messages[key + j].time} />);
                        tempArr = [];
                        subKey = j;
                    }
                    tempArr.push(tempMid[j]);
                }
        
                if (tempArr.length !== 0) {
                    retArr.push(<SystemMessageContainer messages={tempArr} key={key + '.' + subKey} id={key + '.' + subKey} />);
                }
        
                tempMid = [];
                key = i;
            }

            tempRight.push({ ...messages[i] });
        } else {
            if (tempRight.length > 0) {
                if (key > 0 && messages[key].time - messages[key - 1].time > TIMEGAP) {
                    retArr.push(<SeperatingTime key={'st.' + key + '.'} time={messages[key].time} />);
                }
                let tempArr = [tempRight[0]];
                let subKey = 0;
                for (let j = 1; j < tempRight.length; j++) {
                    if (tempRight[j].time - tempRight[j - 1].time > TIMEGAP) {
                        retArr.push(<RHSMessageContainer messages={tempArr} key={key + '.' + subKey} id={key + '.' + subKey} />);
                        retArr.push(<SeperatingTime key={'st.' + key + '.' + subKey} id={'st.' + key + '.' + subKey}  time={messages[key + j].time} />);
                        tempArr = [];
                        subKey = j;
                    }
                    tempArr.push(tempRight[j]);
                }
        
                if (tempArr.length !== 0) {
                    retArr.push(<RHSMessageContainer messages={tempArr} key={key + '.' +subKey} id={key + '.' +subKey}  />);
                }
        
                tempRight = [];
                key = i;
            } else if (tempMid.length > 0) {
                if (key > 0 && messages[key].time - messages[key - 1].time > TIMEGAP) {
                    retArr.push(<SeperatingTime key={'st.' + key + '.'} time={messages[key].time} />);
                }
                let tempArr = [tempMid[0]];
                let subKey = 0;
                for (let j = 1; j < tempMid.length; j++) {
                    if (tempMid[j].time - tempMid[j - 1].time > TIMEGAP) {
                        retArr.push(<SystemMessageContainer messages={tempArr} key={key + '.' + subKey} id={key + '.' + subKey} />);
                        retArr.push(<SeperatingTime key={'st.' + key + '.' + subKey}  id={'st.' + key + '.' + subKey}  time={messages[key + j].time} />);
                        tempArr = [];
                        subKey = j;
                    }
                    tempArr.push(tempMid[j]);
                }
        
                if (tempArr.length !== 0) {
                    retArr.push(<SystemMessageContainer messages={tempArr} key={key + '.' + subKey} id={key + '.' + subKey} />);
                }
        
                tempMid = [];
                key = i;
            }

            tempLeft.push({ ...messages[i] });
        }
    }
    

    i--;

    if (tempLeft.length >0) {
        if (key > 1 && messages[key].time - messages[key - 1].time > TIMEGAP) {
            retArr.push(<SeperatingTime key={'st.' + key + '.'} time={messages[key].time} />);
        }
        let tempArr = [tempLeft[0]];

        let subKey = 0;
        for (let j = 1; j < tempLeft.length; j++) {
            if (tempLeft[j].time - tempLeft[j - 1].time > TIMEGAP) {
                retArr.push(<LHSMessageContainer messages={tempArr} key={key + '.' + subKey} id={key + '.' + subKey}  />);
                retArr.push(<SeperatingTime key={'st.' + key + '.' + subKey}  id={'st.' + key + '.' + subKey}  time={messages[key + j].time} />);
                tempArr = [];
                subKey = j;
            }
            tempArr.push(tempLeft[j]);
        }

        if (tempArr.length !== 0) {
            retArr.push(<LHSMessageContainer messages={tempArr} key={key + '.' + subKey} id={key + '.' + subKey}  />);
            key++;
        }
    }

    if (tempRight.length > 0) {
        if (key > 1 && messages[key].time - messages[key - 1].time > TIMEGAP) {
            retArr.push(<SeperatingTime key={'st.' + key + '.'} time={messages[key].time} />);
        }
        let tempArr = [tempRight[0]];
        let subKey = 0;
        for (let j = 1; j < tempRight.length; j++) {
            if (tempRight[j].time - tempRight[j- 1].time > TIMEGAP) {
                retArr.push(<RHSMessageContainer messages={tempArr} key={key + '.' + subKey} id={key + '.' + subKey} />);
                retArr.push(<SeperatingTime key={'st.' + key + '.' + subKey} id={'st.' + key + '.' + subKey}  time={messages[key + j].time} />);
                tempArr = [];
                subKey = j;
            }
            tempArr.push(tempRight[j]);
        }

        if (tempArr.length !== 0) {
            retArr.push(<RHSMessageContainer messages={tempArr} key={key + '.' +subKey} id={key + '.' +subKey}  />);
            key++;
        }
    }

    if (tempMid.length > 0) {
        if (key > 1 && messages[i].time - messages[key - 1].time > TIMEGAP) {
            retArr.push(<SeperatingTime key={'st.' + key + '.'} time={messages[key].time} />);
        }
        let tempArr = [tempMid[0]];
        let subKey = 0;
        for (let j = 1; j < tempMid.length; j++) {
            if (tempMid[j].time - tempMid[j- 1].time > TIMEGAP) {
                retArr.push(<SystemMessageContainer messages={tempArr} key={key + '.' + subKey} id={key + '.' + subKey} />);
                retArr.push(<SeperatingTime key={'st.' + key + '.' + subKey} id={'st.' + key + '.' + subKey}  time={messages[key + j].time} />);
                tempArr = [];
                subKey = j;
            }
            tempArr.push(tempMid[j]);
        }

        if (tempArr.length !== 0) {
            retArr.push(<SystemMessageContainer messages={tempArr} key={key + '.' +subKey} id={key + '.' +subKey}  />);
            key++;
        }
    }

    return retArr;
}

export const seperateGroupRoomMessage = (messages) => {
    return messages.reduce((acc, cur, i) => {
        return acc.concat(<div key={i}>{cur.from}: {cur.content}</div>)
    }, []);
}


export const renderUserMessageContent = ({ content, type, from, colorTheme, right }) => {
    const side = right ? 'r' : 'l';
    switch (type) {
        case 'waving':
            return (
                <div className={`waving-message-container ${side}hs-waving-message-container`}>
                    
                    <div className="waving-message-container__image">
                        <img alt="Waving hand" src={wavinghand} />
                    </div>
                    <div className="waving-message-container__text">
                        <div> You waved at {from.split(' ')[0]}!</div>
                        <div>Waiting for {from.split(' ')[0]}...</div>
                    </div>
                </div>
            );
        
        case 'thumbup':
            return (
                <div className={`${side}hs-message-item__content ${side}hs-message-item__content--thumbup no-background-message`}>
                    <ThumbUp fillColor={colorTheme}/>
                </div>
            );
        
        case 'image': {
            const { hashedName, originalName } = JSON.parse(content);
            return (
                <div className={`${side}hs-message-item__content no-background-message no-padding-message`}
                    style={{ cursor: 'pointer' }}>
                    <img src={"/uploads/" + hashedName} alt={originalName} />
                </div>
            );
        }
        
        case 'file': {
            const { hashedName, originalName } = JSON.parse(content);
            return (
                <div className={`${side}hs-message-item__content ${side}hs-message-item__content--file`} style={right ? { backgroundColor: colorTheme } : {}}>
                    <a href={"/uploads/" + hashedName} download>
                        <div ></div>{originalName}</a>
                </div>
            );
        }

        case 'sticker': {
            return (
                <div className={`${side}hs-message-item__content no-background-message no-padding-message`}>
                    <Sticker name={content} interval={stickerMap[content].interval} positions={stickerMap[content].bigPositions} />
                </div>
            );

        }
        
        default:
            if ((/^[\s]*$/).test(content.replace(splitByEmojiReg, ''))) {
                return (
                    <div className={`${side}hs-message-item__content ${side}hs-message-item__content--icon no-background-message`}>
                        {(() => {
                            let ret = [];
                            content.split(splitByEmojiButRetainDelimiterReg).forEach((str, i) => {
                                if (str !== "") {
                                    if (Object.keys(emojiMap).includes(str)) {
                                        ret.push(<Emoji code={emojiMap[str].code} key={i} />);
                                    } else {
                                        ret.push(<span key={i}>{str}</span>);
                                    }
                                }
                            });
                            return ret;
                        })()}
                    </div>
                );
            }
            return (
                <div className={`${side}hs-message-item__content`} style={right ? {backgroundColor: colorTheme} : null}>
                    {(() => {
                        let ret = [];
                        content.split(splitByEmojiButRetainDelimiterReg).forEach((str, i) => {
                            if (str !== "") {
                                if (Object.keys(emojiMap).includes(str)) {
                                    ret.push(<Emoji code={emojiMap[str].code} key={i} small />);
                                } else {
                                    ret.push(<span key={i}>{str}</span>);
                                }
                            }
                        });
                        return ret;
                    })()}
                </div>
            );
    }
}

export const renderRecentContactMessageContent = ({ content, type, from, thisUser }) => {
    const sender = from === thisUser.username ? 'You' : from;
    switch (type) {
        case 'file': 
            return `${sender} has sent a file`;
            
        case 'image': 
            return `${sender} has sent an image`;
            
        case 'changeColorTheme':
            return `${JSON.parse(content).changer} has changed color theme`;
        
        case 'sticker':
            return `${sender} has sent a sticker`;
        
        case 'thumbup':
            return `${sender} has sent a thumbup`;
        
        default:
            return (
                <div>
                    {(() => {
                        let ret = [from === thisUser.username ? 'You: ' : ''];
                        content.split(splitByEmojiButRetainDelimiterReg).forEach((str, i) => {
                            if (str !== "") {
                                if (Object.keys(emojiMap).includes(str)) {
                                    ret.push(<Emoji code={emojiMap[str].code} key={i} small />);
                                } else {
                                    ret.push(<span key={i}>{str}</span>);
                                }
                            }
                        });
                        return ret;
                    })()}
                </div>
            );
    }
 }

export const arrayDiff = (left, right) => {
    return left.filter(x => right.indexOf(x) < 0);
}