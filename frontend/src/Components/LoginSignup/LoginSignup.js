import React, { useState } from 'react';
import './LoginSignup.css';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import Navbar from '../LandingPage/components/Navbar';

import user_icon from '../Assets/person.png';
import email_icon from '../Assets/email.png';
import password_icon from '../Assets/password.png';
import eye_icon from '../Assets/hide.png';
import eye_slash_icon from '../Assets/view.png';

export const LoginSignup = () => {
  const [action, setAction] = useState("Login");
  const [userType, setUserType] = useState("student");
   // Initialize user type to "student"
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword); };
  const handleUserTypeChange = (type) => {
    setUserType(type);
  };

  const [email, setEmail] = useState()
  const [password, setPassword] = useState()
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault()
    if (userType === "student"){
      axios.post('http://localhost:3002/loginsignupstudent', { email, password})
    .then(result => {
      console.log(result)
      if(result.data === "Success") {  
        setTimeout(() => {
            navigate('/studenthomepage');
          
        }, 2000);   
      }
      else if (result.data === "Password is incorrect"){
        setErrorMessage("Incorrect password.");
      }
      else if (result.data === "No record existed"){
        setErrorMessage("No record existed.");
      }
      else {
        // Update the error message state
        setErrorMessage("Incorrect username or password.");
      }
    })
    .catch(err => {
      console.log(err);
      // Update the error message state for any other errors
      setErrorMessage("An error occurred. Please try again.");
    });}
    else if (userType === "teacher"){
      axios.post('http://localhost:3002/loginsignupteacher', { email, password})
    .then(result => {
      console.log(result)
      if(result.data === "Success") {  
        setTimeout(() => {
            navigate('/teacherhomepage');
        }, 2000);   
      }
      else if (result.data === "Password is incorrect"){
        setErrorMessage("Incorrect password.");
      }
      else if (result.data === "No record existed"){
        setErrorMessage("No record existed.");
      }
      else {
        // Update the error message state
        setErrorMessage("Incorrect username or password.");
      }
    })
    .catch(err => {
      console.log(err);
      // Update the error message state for any other errors
      setErrorMessage("An error occurred. Please try again.");
    });}
  }

  
  

  return (
    <div className='containers'>
      <Navbar/>
    <div className='container1' id="login">
      <div className="header">
        <div className="text">{action}</div>
        <div className="underline"></div>
      </div>
      <form onSubmit={handleSubmit}>
      <div className="inputs">

        {action === "Login" ? <div></div> : 
        <div className="input">
          <img src={user_icon} alt="" />
          <input type="text" placeholder='Name' />
        </div>}
        <div className="input1">
          <div className='email-icon'>
          <img src={email_icon} alt="" />
          </div>
          <input type="email" placeholder='Email' required onChange={(e) => setEmail(e.target.value)} />
        </div>

        <div className="input1">
          <div className='password-icon'>
            <img src={password_icon} alt="" />
          </div>
          
          <input
            type={showPassword ? 'text' : 'password'} // Toggle input type based on showPassword state
            placeholder='Password'  required onChange={(e) => setPassword(e.target.value)} 
          />
          <div className='password-viewer' onClick={togglePasswordVisibility}>
            <img src={showPassword ? eye_slash_icon : eye_icon} alt="Toggle Password" />
          </div>
        </div>
        
        {action === "Login" ? (
          <div className="user-type">
            <button
              className={userType === "student" ? "user-type-button active" : "user-type-button"}
               onClick={() => handleUserTypeChange("student")}
            >
              Login as Student
            </button>
            <button
              className={userType === "teacher" ? "user-type-button active" : "user-type-button"}
               onClick={() => handleUserTypeChange("teacher")}
            >
              Login as Teacher
            </button>
          </div>
        ) : null}
        {errorMessage && <div className="error-message">{errorMessage}</div>}
      </div>

      {action === "Login" ? (
          <div className="forgot-password"><span> Forgot Password?</span></div>
        ) : null}
      <div className="create-account">
      <p>Don't have an account yet? Create account as <a href='./teachersignup'>Teacher</a> or <a href='./studentsignup'>Student</a>.</p>
      </div> 
      
    </form> 
    </div>
    </div>
    
  );
}

