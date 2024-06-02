import React, { useEffect, useState } from 'react'

import './user.styles.css';
import { getUser } from '../../firebase/user.firestore';

function User({id, userDoc, selectUserToChat}) {
    const [isLoading, setIsLoading] = useState(true)
    const [userData, setUserData] = useState('');
    const {imgurl, username} = userData;
    

    function handleOnClickUser(){
      selectUserToChat instanceof Function && selectUserToChat(id || userDoc?.id);
    }


    useEffect(() => {
    
      assignInitialValueToState(id, userDoc);

      async function assignInitialValueToState(id, userDoc){
        try {
          if(id){
            const userData = await getUser(id);
            setUserData({
              ...userData,
              id: id,
            })
          }else{
            setUserData(userDoc);
          }

          setIsLoading(false);
        } catch (error) {
          setIsLoading(false)
        }
      }

    }, [id,userDoc])

    if(isLoading)
      return <SkeletonUser />

  return (
    <div className={`user ${selectUserToChat && 'activeUser'}`} onClick={handleOnClickUser}>
        <div className='userImgContainer'>
            <img src={imgurl || 'https://banner2.cleanpng.com/20180627/wio/kisspng-computer-icons-user-profile-avatar-jain-icon-5b332c5add9336.0201786915300803469076.jpg'} alt={username || 'profile-photo'} />
        </div>

        <div className='userDetailsContainer'>
            <span>{username?.slice(0,1).toUpperCase() + username?.slice(1) || 'Guest User'}</span>
        </div>
    </div>
  )
}


function SkeletonUser(){
  return (
  <div className="shimmerUser">
    <div className='imgShimmer'></div>
    <div className='textShimmer'></div>
  </div>)
}

export default User