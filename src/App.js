import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'

import './App.css'

function App() {

  if(!localStorage.getItem('userID')){
    return <Navigate to='/signin' />
  }

  return (
    <div className='app'>
      <Outlet />
    </div>
  )
}

export default App