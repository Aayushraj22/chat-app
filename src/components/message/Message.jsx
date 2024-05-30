import React, { useEffect, useState } from 'react';

import './message.styles.css';
import { getMessageDoc, getTime } from '../../firebase/message.firestore';
import { getFileFromCloud } from '../../firebase/storage';

function Message({id}) {
    // console.log('message with id: ',id)
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
        getMessageDoc(id).then(
            msgData => {structureMessage(msgData).then((msgObj) => setMyMsg(msgObj))}
        );
    }, [id])
    
  return (
    <div className={`msgContainer ${createdBy === myID ? 'rightAligned' : ''}`}>
        {imgurl && <img src={imgurl} alt='' />}
        {msg && <p className="msgText">{msg}</p>}
        <span className='timeBox'>{time}</span>
    </div>
  )
}

export default Message