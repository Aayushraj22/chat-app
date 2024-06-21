import React, { useEffect, useState, useRef } from 'react'
import { FiPaperclip } from "react-icons/fi";
import { VscSend } from 'react-icons/vsc';

import './chatarea.styles.css'
import { MessageText } from '../../Pages/utility';
import Navbar from '../navbar/Navbar';
import { storeMessage } from '../../firebase/message.firestore'
import Input from '../customInput/Input';
import { getChatOfUser } from '../../firebase/user.firestore';
import Message from '../message/Message';
import { storeFileInCloud } from '../../firebase/storage';
import NavigateToBottom from '../navigateToBottom/NavigateToBottom';

function Chatarea({ chatID }) {
    const scrollToBottomRef = useRef(null)
    const inputRef = useRef(null);
    const [isMsgDeleted, setIsMsgDeleted] = useState(false);
    const [myChat, setMyChat] = useState('')
    const { getMessageText, updateMessage } = MessageText();
    const myID = localStorage.getItem('userID');


    async function sendMessage() {
        // msg sending initiated
        setIsMsgDeleted(true);

        let inputFile = inputRef.current.files[0];
        let msg = getMessageText();
        if(msg){
            updateMessage('');
        }else if(inputFile){
            const validImageType = ['image/jpg','image/jpeg','image/png','image/avif','image/webp','image/gif']
            // if fileType is image, then convert it into base64 or use service of firestore to store image in a bucket and get id of that place where image stored, then use that to send as msg and store in db('messages')
            
            if(!validImageType.includes(inputFile.type)){
                alert('Use Valid Image type')
                return;
            }

            inputFile = storeFileInCloud(inputFile);
        }else{  // no msg to send
            setIsMsgDeleted(false);
            return;
        }

        const msgID = await storeMessage(msg || inputFile, myID, chatID);
        setIsMsgDeleted(false)

        setMyChat([...myChat,msgID]);
    }


    function handleOpenFileSystem() {
        inputRef.current.click();
    }

    
    const scrollToBottom = () => {
        const element = scrollToBottomRef.current;
        element.scrollTo({
            top: element.scrollHeight,
            behavior: 'smooth',
        });
    }

    

    


    useEffect(() => {

        getChatOfUser(myID, chatID).then(data => setMyChat(data));
    }, [chatID])
    

    return (
        <>
            <Navbar id={chatID} />
            <div className="chatContainer">
                <div className='chatArea' ref={scrollToBottomRef}>
                    {myChat && myChat?.map((msgID) => <Message key={msgID} id={msgID}/>)}
                    <NavigateToBottom scrollToBottom={scrollToBottom} />
                </div>
                <div className='chatInputControl'>
                    <Input id={chatID} type='text' placeholder='write message ...' deleted={isMsgDeleted} updateMessage={updateMessage} />
                    <span className='controlIconStyle fileIconStyle' onClick={handleOpenFileSystem} >
                        <FiPaperclip /><input ref={inputRef} type='file' /></span>
                    <span id='sendTextMsg' className='controlIconStyle' onClick={sendMessage}><VscSend /></span>
                </div>
            </div>
        </>
    )
}

export default Chatarea