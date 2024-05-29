import React, { useEffect, useState } from 'react'

import './user.styles.css';
import { getUser } from '../../firebase/user.firestore';

function User({id, userDoc, selectUserToChat}) {
    const [userData, setUserData] = useState('');
    const {imgurl, username} = userData;
    

    function handleOnClickUser(){
      selectUserToChat instanceof Function && selectUserToChat(id || userDoc?.id);
    }


    useEffect(() => {
      if(id!==undefined){ 
        getUser(id).then((data) => {
          setUserData({
            ...data,
            id: id,
            });
        })
      }else{
        setUserData(userDoc)
      }

    }, [id,userDoc])


  return (
    <div className={`user ${selectUserToChat && 'activeUser'}`} onClick={handleOnClickUser}>
        <div className='userImgContainer'>
            <img src={imgurl || 'https://banner2.cleanpng.com/20180627/wio/kisspng-computer-icons-user-profile-avatar-jain-icon-5b332c5add9336.0201786915300803469076.jpg'} alt={username || 'profile-photo'} />
        </div>

        <div className='userDetailsContainer'>
            <span>{username || 'Guest User'}</span>
        </div>
    </div>
  )
}

export default User