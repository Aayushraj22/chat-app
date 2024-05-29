import { doc, getDoc } from "firebase/firestore";
import { db } from "./config";

async function getUser(id){
    const docRef = await getDoc(doc(db,'users',id));
    
    return docRef.data();
  }

  export {getUser};