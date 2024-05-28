import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'

import './App.css'


function App() {
  
  const curUserId = localStorage.getItem('userID');

  if(!curUserId){
    return <Navigate to='/signin' />
  }

  return (
    <div className='app'>
      <Outlet />
    </div>
  )
}

export default App