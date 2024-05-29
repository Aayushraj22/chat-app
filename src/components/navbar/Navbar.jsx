import React, { useRef } from 'react'
import { FaSearch } from "react-icons/fa";
import { IoEllipsisVerticalSharp } from "react-icons/io5";

import User from '../user/User'
import './navbar.styles.css'
import { signout } from '../../routes/utility';

function Navbar({id, makeSearchAreaVisible}) {
  const dropdownRef = useRef(null)
  const accountHolder = localStorage.getItem('userID');

  function handleToggleDropdown() {
    const targetElement = dropdownRef.current;
    targetElement.classList.toggle('hideDropdown')
  }

  function handleToLogout(){
    handleToggleDropdown();
    signout();
  }
  return (
    <nav className='navbar'>
      <User id={id} />

      {/* searchIconContainer */}
      {makeSearchAreaVisible instanceof Function && 
        (<div className="searchIconContainer">
          <FaSearch className='iconStyle' onClick={() => makeSearchAreaVisible(true)}/>
        </div>)
      }

    {/* display only for account holder */}
    {id === accountHolder && (
      <span className='threeDot'>
        <IoEllipsisVerticalSharp onClick={handleToggleDropdown}/>
        <div className="dropdown hideDropdown" ref={dropdownRef}>
          <button onClick={handleToLogout}>Logout</button>
        </div>
      </span>
    )}
    
    </nav>
  )
}

export default Navbar