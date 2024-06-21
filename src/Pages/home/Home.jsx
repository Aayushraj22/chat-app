import React, { useEffect, useState } from 'react'
import { MdClose } from "react-icons/md";
import { IoSearchSharp } from "react-icons/io5";


import './home.styles.css'
import Navbar from '../../components/navbar/Navbar'
import Input from '../../components/customInput/Input'
import { Search, findUser } from '../utility';
import User from '../../components/user/User';
import { getUser } from '../../firebase/user.firestore';
import Chatarea from '../../components/chatArea/Chatarea';
import CustomButton from '../../components/customButton/CustomButton';

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

    const modifiedUserChatList = myUserChatList.filter((chatID) => {
      return chatID !== userId;
    })

    // selected user is new or already exits, it comes to firt position
    setMyUserChatList([userId , ...modifiedUserChatList]);
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

    assignInitialValueToState(accountHolder);

    async function assignInitialValueToState(userID){

      try {
        const {chat} = await getUser(userID);
        setMyUserChatList(Object.keys(chat));
      } catch (error) {
        alert('error occurs chatlist of user not found');
      }
    }
  }, [])
  
  return (
    <main className='home'>
      {/* leftside for display user, searchbar, and account holder profile */}
      <section className='homeLeftSection'>
        <Navbar id={accountHolder} makeSearchAreaVisible={setIsVisibleSearchArea}/>
        <div className='usersContainer'> 
          {isVisibleSearchArea && (
            <div className='searchBoxContainer'>
              <Input type='search'
                placeholder='Search...'
                updateSearchedValue={updateSearchedValue} deleted={isSearchTextDeleted} />
              <CustomButton onClick={displaySearchedUser} 
              bgColor='yellowBG' buttonWidth='40px' >
                <IoSearchSharp size={20}/>
              </CustomButton>
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
                {myUserChatList && myUserChatList?.map((chatID) => 
                  <User id={chatID} key={chatID} selectUserToChat={selectUserToChat}/>)
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