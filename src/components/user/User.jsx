import React, { useEffect, useState } from 'react'

import './user.styles.css';

function User({id}) {
    const [userData, setUserData] = useState('');
    const {imgurl, name} = userData;


    useEffect(() => {
      
    }, [id])


  return (
    <div className='user'>
        <div className='userImgContainer'>
            <img src={imgurl || 'https://banner2.cleanpng.com/20180627/wio/kisspng-computer-icons-user-profile-avatar-jain-icon-5b332c5add9336.0201786915300803469076.jpg'} alt={name || 'profile-photo'} />
        </div>

        <div className='userDetailsContainer'>
            <span>{name || 'Guest User'}</span>
        </div>
    </div>
  )
}

export default User