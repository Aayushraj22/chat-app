import React, { useEffect, useState } from 'react'
import { MdClose } from "react-icons/md";
import { MdDownloadDone } from "react-icons/md";


import './home.styles.css'
import Navbar from '../../components/navbar/Navbar'
import Input from '../../components/customInput/Input'
import { Search, findUser } from '../utility';
import User from '../../components/user/User';
import { getUser } from '../../firebase/user.firestore';
import Chatarea from '../../components/chatArea/Chatarea';

function Home() {
  const [isVisibleSearchArea, setIsVisibleSearchArea] = useState(false);
  const [isSearchTextDeleted, setIsSearchTextDeleted] = useState(false);
  const [searchedUser, setSearchedUser] = useState('')
  const [activeUserId, setActiveUserId] = useState('')
  const [searchNotFound, setSearchNotFound] = useState('')
  const [myUserChatList, setMyUserChatList] = useState('');

  const accountHolder = localStorage.getItem('userID');
  const {getSearchedValue, updateSearchedValue} = Search();
  
 
  

  async function displaySearchedUser(){
    searchNotFound && setSearchNotFound('');

    const text = getSearchedValue();
    updateSearchedValue('');
    setIsSearchTextDeleted(true);

    const user = await findUser(text);
    user.id === undefined ? setSearchNotFound(user.errorMsg) : setSearchedUser(user);
    setIsSearchTextDeleted(false);
    
  }

  async function rearrangeUserChatList(userId){
    let currentUser = undefined;

    let modifiedUserChatList = myUserChatList.filter((user) => {
      if(user.id === userId){
        currentUser = {...user,}
        return;
      }

      return user;
    })

    if(currentUser === undefined){
      const userDoc = await getUser(userId);
      currentUser = {...userDoc, id: userId};
    }

    modifiedUserChatList = [currentUser,...modifiedUserChatList];
    setMyUserChatList(modifiedUserChatList);
  }

  function selectUserToChat(userId){
    setActiveUserId(userId);

    if(userId === searchedUser?.id){
      setSearchedUser('');
      handleCloseSearchedBox();
    }

    rearrangeUserChatList(userId);
  }

  function handleCloseSearchedBox(){
    setIsVisibleSearchArea(false); 
    setSearchNotFound('');
  }


  useEffect(() => {
    const myUserID = accountHolder;
    getUser(myUserID).then((data) => {
      const {chat} = data;

      const chatList = [];
      for(let key in chat){
        chatList.push({
          msg: [...chat[key]],
          id: key,
        })
      }
      setMyUserChatList(chatList);
    })  
  }, [])
  
  return (
    <main className='home'>
      {/* leftside for display user, searchbar, and account holder profile */}
      <section className='homeLeftSection'>
        <Navbar id={accountHolder} makeSearchAreaVisible={setIsVisibleSearchArea}/>
        <div className='usersContainer'> 
          {isVisibleSearchArea && (
            <div className='searchBoxContainer'>
              <Input type='search' placeholder='Search...' updateSearchedValue={updateSearchedValue} deleted={isSearchTextDeleted} />
              <span onClick={displaySearchedUser}>
                <MdDownloadDone />
              </span>
            </div>)
          }
          <div className='userList'>
            {/* current user friend list shown but if isVisibleSearchArea===true -> then searched result should be shown here */}
            {isVisibleSearchArea ? (
              <>
                <span className='close' onClick={handleCloseSearchedBox}
                >
                  <MdClose />
                </span>

                {searchedUser && (<User userDoc={searchedUser} selectUserToChat={selectUserToChat}/>)}
                {searchNotFound && <p className='errorMsg'>{searchNotFound}</p>}   
              </>
                ) : (
              <>
                {myUserChatList && myUserChatList?.map((user) => 
                  <User id={user.id} key={user.id} selectUserToChat={selectUserToChat}/>)
                }
              </>)
            }
          </div>
        </div>
      </section>

      {/* rightside for chat area */}
      <section className='homeRightSection'>
        {activeUserId ? (
          <Chatarea chatID={activeUserId}/>
            ) : (
          <>
            <h2>Select user to Chat from chatList</h2>
          </>)}
        
      </section>
    </main>
  )
}

export default Home