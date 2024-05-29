import { Timestamp, addDoc, arrayUnion, collection, doc, getDoc, updateDoc } from "firebase/firestore";

import {db} from './config';

// store message in db
async function storeMessage(msg,senderID,receiverID){
    const data = {
        msg: msg,
        createdBy: senderID,
        sendTo: receiverID,
        timeStamp: Timestamp.now(),
    }

    const docRef = await addDoc(collection(db, 'messages'), data);

    // adding msgId in sender.chat['receieverID'] property of document
    await addMessageIDInUser(senderID, receiverID, docRef.id);

    // adding msgId in receiver.chat['senderID'] property of document
    await addMessageIDInUser(receiverID, senderID, docRef.id);

}

// this method takes timeInMS and return time from that
function getTime(timeInMS){
    const date = new Date(timeInMS);
    return `${date.getHours()} : ${date.getMinutes()} : ${date.getSeconds()}`;
}

async function findUserFriend(senderID, receiverID){
    const docRef = await getDoc(doc(db,'users',senderID));
    
    const {chat} = docRef.data();
    console.log('chat: ',chat);

    return chat[receiverID];
}


// sender ke chat property me find krenge ki 'receiverID' key exist krta hai ya nhi
async function addMessageIDInUser(senderID, receiverID, msgId){
    const value = await findUserFriend(senderID,receiverID);

    const path = `chat.${receiverID}`

    if(value){
        await updateDoc(doc(db,'users',senderID),{
            [path]: arrayUnion(msgId),
        })
    }else{
        await updateDoc(doc(db,'users',senderID),{
            [path] : [msgId],
        })
        
    }
}



export {storeMessage}