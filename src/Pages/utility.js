import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../firebase/config";

function Search() {
    let searchedText = '';

    function updateSearchedValue(text) {
        searchedText = text;
    }

    function getSearchedValue() {
        return searchedText;
    }

    return { getSearchedValue, updateSearchedValue };
}


function MessageText(){
    let message = '';

    function updateMessage(msg){
      message = msg;
    }
    function getMessageText(){
      return message;
    }

    return {getMessageText, updateMessage};
  }


async function findUser(username){
    const userQuery = query(collection(db,'users'), where('username', '==', username));

    const querySnapshots = await getDocs(userQuery);
    if(querySnapshots.empty){
        return {errorMsg : 'User Not Found'};
    }else{
        let data = {};
        querySnapshots.forEach((doc) => {
            data = {
                ...doc.data(),
                id: doc.id,
            }
        })
        return data;
    }
}

export {Search, MessageText, findUser}