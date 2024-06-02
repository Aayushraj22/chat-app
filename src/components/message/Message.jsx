import React, { useEffect, useState } from 'react';

import './message.styles.css';
import { getMessageDoc, getTime } from '../../firebase/message.firestore';
import { getFileFromCloud } from '../../firebase/storage';

function Message({id}) {
    const [isLoading, setIsLoading] = useState(true)
    const [myMsg, setMyMsg] = useState('')
    const {createdBy, msg, timeStamp, imgurl} = myMsg;

    const time = getTime(timeStamp?.toMillis())
    const myID = localStorage.getItem('userID');

    async function structureMessage(msgObj){
        const {msg} = msgObj;

        let imgurl = undefined;
        if(msg.split('/')[0] === 'images'){
            imgurl = await getFileFromCloud(msg);
        }

        return {
            ...msgObj,
            msg: imgurl ? '' : msg,
            imgurl: imgurl ? imgurl : '',
        };
    }

    useEffect(() => {
       assignInitialValueToState(id);

        async function assignInitialValueToState(msgID){
            try {
                const msgObj = await getMessageDoc(msgID);
                const msgData = await structureMessage(msgObj);
                setMyMsg(msgData);
                setIsLoading(false);
            } catch (error) {
                setIsLoading(false);
            }
        }
        
    }, [id])

    if(isLoading)
        return <ShimmerMessage />
    
  return (
    <div className={`msgContainer ${createdBy === myID ? 'rightAligned' : ''}`}>
        {imgurl && <img src={imgurl} loading='lazy' alt='' />}
        {msg && <p className="msgText">{msg}</p>}
        <span className='timeBox'>{time}</span>
    </div>
  )
}

export default Message

function ShimmerMessage(){
    return (
        <div className='shimmerMsgContainer'>
            <p className='shimmerMsg'></p>
            <span className='shimmerTime'></span>
        </div>
    )
}