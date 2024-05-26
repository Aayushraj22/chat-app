import React from 'react'


import './home.styles.css'
import Navbar from '../../components/navbar/Navbar'

function Home() {
  return (
    <main className='home'>
      {/* leftside for display user, searchbar, and account holder profile */}
      <section className='usersContainer'>
        <Navbar />
      </section>

      {/* rightside for chat area */}
      <section className='chatContainer'>
        <Navbar />
      </section>
    </main>
  )
}

export default Home