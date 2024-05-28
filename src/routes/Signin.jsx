import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';

import './routes.style.css'
import Input from '../components/customInput/Input'
import { signinUser, userAuthenticationForm, validateUserFormData } from './utility';
import Loader from '../components/loader/Loader';

function Signin() {

  const {updateUserData, getUserData} = userAuthenticationForm()
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  async function submitForm(e){
    e.preventDefault();

    setIsLoading(true);

    const formData = getUserData();
    if(!validateUserFormData(formData)){
      setIsLoading(false);
      return;
    }
    // get user signin and send to home page
    await signinUser(formData);
    setIsLoading(false);
    navigate('/');
  }

  return (
    <div className='signin'>
      {isLoading && <Loader />}
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