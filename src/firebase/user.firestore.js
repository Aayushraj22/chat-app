import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "./config";

async function getUser(id){
    const docRef = await getDoc(doc(db,'users',id));
    
    return docRef.data();
}

async function getChatOfUser(userID, chatID){
    const document = await getUser(userID);
    return document?.chat[chatID] || [];
}

// username can be updated after proper check that update value doesnot exits for any other user
async function updateUserDocField(fieldname,userID,value){
    await updateDoc(doc(db, 'users', userID),{
        [fieldname]: value,
    })
}



  export {getUser,getChatOfUser, updateUserDocField};