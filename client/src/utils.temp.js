import React from 'react';

import SystemMessage from './components/Chatbox/MessageContainer/SystemMessage/SystemMessage';
import SeperatingTime from './components/Chatbox/MessageContainer/SeperatingTime/SeperatingTime';
import RHSMessageContainer from './components/Chatbox/MessageContainer/RHSMessageContainer/RHSMessageContainer';
import LHSMessageContainer from './components/Chatbox/MessageContainer/LHSMessageContainer/LHSMessageContainer';

const SECOND = 1000;
const MINUTE = SECOND * 60;
const HOUR = MINUTE * 60;
const DAY = HOUR * 24;
const TIMEGAP = 5;

const renderSystemMessage = content => content;

export const getOfflineTime = (offlineMoment) => {
    const now = new Date();
    const diff = now.getTime() - new Date(offlineMoment).getTime();

    if (diff < HOUR) return (parseInt(diff / MINUTE, 10) + 1).toString() + 'min';
    else if (diff < 24 * HOUR) return (parseInt(diff / HOUR, 10) + 1).toString() + 'hour';
    else if (diff < 7 * DAY) return (parseInt(diff / DAY, 10) + 1).toString() + 'day';
    else return '';
}


export const seperateMessages = (messages, RHSName, avatarUrl) => {
    if (messages.length < 1) return [];

    let retArr = [];
    let tempLeft = [];
    let tempRight = [];

    let key = 0;

    if (messages[0].from === RHSName) {
        retArr.push(<SeperatingTime key={'st.' + key + '.'} time={messages[0].time} />);
        tempRight.push(messages[0]);
    } else if (messages[0].from === 'system') {
        retArr.push(<SeperatingTime key={'st.' + key + '.'} time={messages[0].time} />, <SystemMessage key={key++} render={() => <div>{renderSystemMessage(messages[0].content)}</div>}/>);
    } else {
        retArr.push(<SeperatingTime key={'st.' + key + '.'} time={messages[0].time} />);
        tempLeft.push(messages[0]);
    }
    
    for (var i = 1; i < messages.length; i++) {
        if (messages[i].from === 'system') {
            if (tempLeft.length !== 0) {
                if (key > 0 && messages[key].time - messages[key- 1].time > TIMEGAP) {
                    retArr.push(<SeperatingTime key={'st.' + key + '.'} time={messages[key].time} />);
                }
                let tempArr = [tempLeft[0]];
                let subKey = 0;
                for (let j = 1; j < tempLeft.length; j++) {
                    if (tempLeft[j].time - tempLeft[j - 1].time > TIMEGAP) {
                        retArr.push(<LHSMessageContainer messages={tempArr} key={key + '.' + subKey} id={key + '.' + subKey} avatarUrl={avatarUrl} />);
                        retArr.push(<SeperatingTime key={'st.' + key + '.' + subKey}  id={'st.' + key + '.' + subKey}  time={messages[i].time} />);
                        tempArr = [];
                        subKey = j;
                    }
                    tempArr.push(tempLeft[j]);
                }
        
                if (tempArr.length !== 0) {
                    retArr.push(<LHSMessageContainer messages={tempArr} key={key + '.' + subKey} id={key + '.' + subKey} avatarUrl={avatarUrl} />);
                }

                tempLeft = [];
                key = i;

                let tempi = i;
                retArr.push(<SystemMessage key={key} render={() => <div>{renderSystemMessage(messages[tempi].content)}</div>} />);
                
                key = i + 1;
            }
        
            if (tempRight.length !== 0) {
                if (key > 0 && messages[key].time - messages[key - 1].time > TIMEGAP && i > 1) {
                    retArr.push(<SeperatingTime key={'st.' + key + '.'} time={messages[key].time} />);
                }
                let tempArr = [tempRight[0]];
                let subKey = 0;
                for (let j = 1; j < tempRight.length; j++) {
                    if (tempRight[j].time - tempRight[j- 1].time > TIMEGAP) {
                        retArr.push(<RHSMessageContainer messages={tempArr} key={key + '.' + subKey} id={key + '.' + subKey} />);
                        retArr.push(<SeperatingTime key={'st.' + key + '.' + subKey} id={'st.' + key + '.' + subKey}  time={messages[i].time} />);
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

                let tempi = i;
                retArr.push(<SystemMessage key={key} render={() => <div>{renderSystemMessage(messages[tempi].content)}</div>} />);

                key = i + 1;
            }
        }
        else if (messages[i].from === RHSName) {
            if (messages[i - 1].from !== RHSName && messages[i-1].from !== 'system')  {
                if (key > 0 && messages[key].time - messages[key - 1].time > TIMEGAP && i > 1) {
                    retArr.push(<SeperatingTime key={'st.' + key + '.'} time={messages[key].time} />);
                }
                let tempArr = [tempLeft[0]];
                let subKey = 0;
                for (let j = 1; j < tempLeft.length; j++) {
                    if (tempLeft[j].time - tempLeft[j - 1].time > TIMEGAP) {
                        retArr.push(<LHSMessageContainer messages={tempArr} key={key + '.' + subKey} id={key + '.' + subKey} avatarUrl={avatarUrl}/>);
                        retArr.push(<SeperatingTime key={'st.' + key + '.' + subKey}  id={'st.' + key + '.' + subKey}  time={messages[key + j].time} />);
                        tempArr = [];
                        subKey = j;
                    }
                    tempArr.push(tempLeft[j]);
                }
        
                if (tempArr.length !== 0) {
                    retArr.push(<LHSMessageContainer messages={tempArr} key={key + '.' + subKey} id={key + '.' + subKey} avatarUrl={avatarUrl}/>);
                }
        
                tempLeft = [];
                key = i;
            }

            tempRight.push({ ...messages[i] });
        } else {
            if (messages[i - 1].from === RHSName) {
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
            }
            tempLeft.push({ ...messages[i] });
        }
    }
    
    i--;


    if (tempLeft.length !== 0) {
        if (i > 1 && messages[i].time - messages[i - 1].time > TIMEGAP) {
            retArr.push(<SeperatingTime key={'st.' + key + '.'} time={messages[key].time} />);
        }
        let tempArr = [tempLeft[0]];

        let subKey = 0;
        for (let j = 1; j < tempLeft.length; j++) {
            if (tempLeft[j].time - tempLeft[j - 1].time > TIMEGAP) {
                retArr.push(<LHSMessageContainer messages={tempArr} key={key + '.' + subKey} id={key + '.' + subKey} avatarUrl={avatarUrl} />);
                retArr.push(<SeperatingTime key={'st.' + key + '.' + subKey}  id={'st.' + key + '.' + subKey}  time={messages[key + j].time} />);
                tempArr = [];
                subKey = j;
            }
            tempArr.push(tempLeft[j]);
        }

        if (tempArr.length !== 0) {
            retArr.push(<LHSMessageContainer messages={tempArr} key={key + '.' + subKey} id={key + '.' + subKey} avatarUrl={avatarUrl} />);
            key++;
        }
    }

    if (tempRight.length !== 0) {
        if (i > 1 && messages[i].time - messages[i - 1].time > TIMEGAP) {
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

    return retArr;
}