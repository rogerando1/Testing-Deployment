import React from 'react';
import './TeacherProfile.css';
import { useNavigate } from 'react-router-dom';

export const TeacherProfile = () => 
{
  const navigate = useNavigate();
  return(
    <div className='profilepage'>
      <form>
        <div className='row-1'>
          <div className='prof-container'>
          <div className='user-avatar'> 
            <img src='./default_profile.webp' alt='default_profile'></img>           
          </div>
          <div className='user-about'> 
            <h1>About</h1>
          </div>
          <div className='about1'>
            <div className=''>
            </div>
          </div>
          </div>
          <div className='info-container'>
            <div className='label0'>
              <p> Personal Information</p>
            </div>
            <div className='col-1'>
              <p>First Name</p>
              <p>Last Name</p>
            </div>
            <div className='col-2'>
                <input type='name' id='firstname' placeholder='Enter first name'>
                </input>
                <input type='name' id='firstname' placeholder='Enter first name'>
                </input>
            </div>
            <div className='col-3'>
              <p>Email</p>
            </div>
            <div className='col-4'>
              <input type='email' id='email' placeholder='Enter email'>
              </input>
            </div>
            <div className='col-5'>
              <p>Password</p>
              <p>Confirm Password</p>
            </div>
            <div className='col-6'>
                <input type='name' id='firstname' placeholder='Enter password'>
                </input>
                <input type='name' id='firstname' placeholder='Enter confirm password'>
                </input>
            </div>
            <div className='col-7'>
              <div className='but1'>
                <button type='button' onClick={() => navigate('/teacherhomepage')}> Back
              </button>
              </div>
              <div className='but2'>
                <button type='submit' id='updatepassword'> Update
              </button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}