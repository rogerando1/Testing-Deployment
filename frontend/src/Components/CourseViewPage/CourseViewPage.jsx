import React from 'react';
import './CourseViewPage.css'


export const CourseViewPage = () => 
{
    return(
        <div className='addcoursecontainer1'>
        <nav className='first-nav1'>
            <div class ="first-nav-logo1">
                <a href='/studenthomepage'>
                     <img src = "Logo1.1.png" alt=    "Cour-Cert"></img>
                </a>
         </div>
            <div className='first-nav-title1'>
                <p className='p1'> Course-Certification</p>
            <div className='first-nav-title1'>
            <p className='p3'> "Empowering Your Learning Journey"</p>
            </div>
        </div>
    </nav>
    <nav className='second-nav2'>
    <div class ="second-nav-links2">
        <ul>
          <li><a href = "/allcourselist"> View Course</a> </li>
          <li><a href = "/allcourselist"> Back</a> </li>
         </ul>
       </div>
    </nav>
    </div>
    )
}