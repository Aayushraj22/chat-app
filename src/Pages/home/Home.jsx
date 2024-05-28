import React, { useEffect, useState } from 'react'
import { MdClose } from "react-icons/md";


import './home.styles.css'
import Navbar from '../../components/navbar/Navbar'
import Input from '../../components/customInput/Input'
import { Search } from '../utility';
import User from '../../components/user/User';

function Home() {
  const [isVisibleSearchArea, setIsVisibleSearchArea] = useState(false);

  const {getSearchedValue, updateSearchedValue} = Search();

  useEffect(() => {
    
    
  }, [])
  
  return (
    <main className='home'>
      {/* leftside for display user, searchbar, and account holder profile */}
      <section className='usersContainer'>
        <Navbar makeSearchAreaVisible={setIsVisibleSearchArea}/>
        <div className='userSubContainer'> 
          {isVisibleSearchArea && (<Input type='search' placeholder='Search...' updateSearchedValue={updateSearchedValue} />)}
          <div className='userList'>
            {/* current user friend list shown but if isVisibleSearchArea===true -> then searched result should be shown here */}
            {isVisibleSearchArea ? (<>
              <span className='close' onClick={() => setIsVisibleSearchArea(false)}><MdClose /></span>
                   
            </>) : (<></>)}
          </div>
        </div>
      </section>

      {/* rightside for chat area */}
      <section className='chatContainer'>
        <Navbar />
      </section>
    </main>
  )
}

export default Home