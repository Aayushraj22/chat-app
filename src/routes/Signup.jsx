import React, { useState } from 'react'

import './routes.style.css'
import Input from '../components/customInput/Input'
import { signupUser, userAuthenticationForm, validateUserFormData } from './utility'
import { Link, useNavigate } from 'react-router-dom';
import Loader from '../components/loader/Loader';

function Signup() {
  const {updateUserData, getUserData} = userAuthenticationForm('signup');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  
  async function submitForm(e){
    e.preventDefault();
    const formData = getUserData();

    setIsLoading(true);

    if(!validateUserFormData(formData)){
      setIsLoading(false);
      return;
    }

    // create new user then send to login 
    await signupUser(formData);
    setIsLoading(false);
    navigate('/signin');
  }

  return (
    <div className='signup'>
      {isLoading && <Loader />}
      <h1>Join Us </h1>
      <form onSubmit={submitForm}>
        <Input name='username' type='text' placeholder='Enter Your Username' updateUserData={updateUserData} />
        <Input name='email' type='email' placeholder='Enter Your Email' updateUserData={updateUserData} />
        <Input name='password' type='password' placeholder='******' updateUserData={updateUserData} />
        <button type="submit" className='btn'>{isLoading ? 'creating' : 'SignUp'}</button>  
      </form>
      <p>Already Have Account ?<Link to='/signin' className='linkStyle'>SignIn</Link> </p>
    </div>
  )
}

export default Signup