import React from 'react'


import './routes.style.css'
import Input from '../components/customInput/Input'
import { userAuthenticationForm, validateUserFormData } from './utility';
import { Link } from 'react-router-dom';

function Signin() {
  
  const {updateUserData, getUserData} = userAuthenticationForm()

  function submitForm(e){
    e.preventDefault();

    const formData = getUserData();
    if(!validateUserFormData(formData))
      return;

    // get user signin and send to home page
  }

  return (
    <div className='signin'>
      <h1>Welcome 🙏🏻</h1>
      <form onSubmit={submitForm}>
        <Input type='email' name='email' placeholder='Enter Your Email' updateUserData={updateUserData} />
        <Input type='password' name='password' placeholder='******' updateUserData={updateUserData} />
        <button type="submit" className='btn'>SignIn</button>
      </form>
      <p>No Account ?<Link to='/signup' className='linkStyle'>SignUp</Link> </p>
    </div>
  )
}

export default Signin