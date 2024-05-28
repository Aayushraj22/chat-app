import React from 'react'
import { FaSearch } from "react-icons/fa";

import User from '../user/User'
import './navbar.styles.css'

function Navbar({makeSearchAreaVisible}) {
  return (
    <nav className='navbar'>
      <User />

      {/* searchIconContainer */}
      <div className="searchIconContainer">
        <FaSearch className='iconStyle' onClick={() => makeSearchAreaVisible(true)}/>
      </div>
    </nav>
  )
}

export default Navbar