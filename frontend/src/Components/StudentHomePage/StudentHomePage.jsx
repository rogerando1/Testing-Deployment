import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './StudentHomePage.css';
import  './addlogo.png';
import axios from 'axios'

export const StudentHomePage = () => 
{
  const navigate  = useNavigate();
//jwt
  axios.defaults.withCredentials = true;
  useEffect(()=> {
    axios.get('http://localhost:3002/studenthomepage')
    .then(result => {console.log(result)
        if(result.data !== "Success")
        {
            navigate('/loginsignup')
        }
    })
    .catch(err=> console.log(err))
  }, [])
//jwt
  return(
     <div className='studenthomepage'>
       <nav className='navHomepage'>
          <div class ="app-logo1">
            <img src = "logo.png" alt= "Cour-Cert" height={160} width={100}></img>
          </div>
          <div class = "searchBar2">
            <input type = "search" id="search-input" placeholder="Search here"></input>
            <button id="search-button">Search</button>
          </div>
          <div class ="nav-link2">
            <ul>
              <li><a href = "./studentviewcourse"> My Course</a> </li>
              <li><a href = "#"> Certifications</a> </li>
              <li><a href = "#"> Support</a> </li>
              <li><a href = "./profilepage"> My Profile</a> </li>
              <li><a href = "./"> Signout</a> </li>
             </ul>
           </div>
       </nav>
       <div class ="addcoursebutton">
          <button id="addbutton"  onClick={() => navigate('/allcourselist')}></button>
       </div>
     </div>     
  );
}

