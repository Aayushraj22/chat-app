import React, { useEffect, useRef, useState } from 'react'
import { FaSearch } from "react-icons/fa";
import { IoEllipsisVerticalSharp } from "react-icons/io5";
import { createPortal } from 'react-dom';

import User from '../user/User'
import './navbar.styles.css'
import { signout } from '../../routes/utility';
import EditUser from '../editUser/EditUser';
import Modal from '../modal/Modal';
import CustomButton from '../customButton/CustomButton';

function Navbar({id, makeSearchAreaVisible}) {
  const dropdownRef = useRef(null)
  const accountHolder = localStorage.getItem('userID');
  const [showModal, setShowModal] = useState(false)

  const handleToggleDropdown = () => {
    const targetElement = dropdownRef.current;
    targetElement.classList.toggle('hideDropdown')
  }

  const handleToLogout = () => {
    signout();
  }

  const handleToEditProfile = () => {
    setShowModal(true)
  }

  // function handleToSetting(){

  // }

  // hide dropdown when clicked other than 3-dot icon or any dropdown-button
  const handleClickOutsideOfThreeDot = () => {
    dropdownRef.current && dropdownRef.current.classList.add('hideDropdown');
  };

  useEffect(() => {
    document.addEventListener('click', handleClickOutsideOfThreeDot, true);
    return () => {
      document.removeEventListener('click', handleClickOutsideOfThreeDot, true);
    };
  }, [])
  

  return (
    <nav className='navbar'>
      <User id={id} />

      {/* searchIconContainer */}
      {makeSearchAreaVisible instanceof Function && 
        (<div className="searchIconContainer">
          <FaSearch className='searchIconStyle' onClick={() => makeSearchAreaVisible(true)}/>
        </div>)
      }

    {/* display only for account holder */}
    {id === accountHolder && (
      <span className='threeDot'>
        <IoEllipsisVerticalSharp onClick={handleToggleDropdown}/>
        <div className="dropdown hideDropdown" ref={dropdownRef}>
          {/* <CustomButton onClick={handleToSetting}>Setting</CustomButton> */}
          <CustomButton onClick={handleToEditProfile}>Edit Profile</CustomButton>
          {showModal && (createPortal(<Modal onClose={() => setShowModal(false)}><EditUser /></Modal>, document.getElementById('root')))}
          <CustomButton onClick={handleToLogout} bgColor='redBG'>Logout</CustomButton>
        </div>
      </span>
    )}
    
    </nav>
  )
}

export default Navbar