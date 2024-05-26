import React from 'react'

import './routes.style.css'
import Input from '../components/customInput/Input'
import { userAuthenticationForm, validateUserFormData } from './utility'
import { Link } from 'react-router-dom';

function Signup() {
  const {updateUserData, getUserData} = userAuthenticationForm('signup');
  function submitForm(e){
    e.preventDefault();
    const formData = getUserData();

    if(!validateUserFormData(formData))
      return;

    // create new user then send to login 
  }

  return (
    <div className='signup'>
      <h1>Join Us </h1>
      <form onSubmit={submitForm}>
        <Input name='username' type='text' placeholder='Enter Your Username' updateUserData={updateUserData} />
        <Input name='email' type='email' placeholder='Enter Your Email' updateUserData={updateUserData} />
        <Input name='password' type='password' placeholder='******' updateUserData={updateUserData} />
        <button type="submit" className='btn'>SignUp</button>  
      </form>
      <p>Already Have Account ?<Link to='/signin' className='linkStyle'>SignIn</Link> </p>
    </div>
  )
}

export default Signup