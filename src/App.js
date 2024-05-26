import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'

import './App.css'


function App() {
  
  const authed = localStorage.getItem('chatAuth');

  if(!authed){
    return <Navigate to='/signin' />
  }

  return (
    <div className='app'>
      <Outlet />
    </div>
  )
}

export default App