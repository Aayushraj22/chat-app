import { doc, getDoc } from "firebase/firestore";
import { db } from "./config";

async function getUser(id){
    const docRef = await getDoc(doc(db,'users',id));
    
    return docRef.data();
}

async function getChatOfUser(userID, chatID){
    const document = await getUser(userID);
    return document?.chat[chatID] || [];
}



  export {getUser,getChatOfUser};