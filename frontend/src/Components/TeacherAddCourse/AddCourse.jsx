import React, { useState } from 'react';
import './AddCourse.css';
import { useNavigate } from 'react-router-dom';
import { Textarea } from 'theme-ui'
import { NoSsr } from '@mui/material';

export const TeacherAddCourse = () => 
{
  const navigate = useNavigate();
  return(
    <div className='addcoursecontainer'>
        <nav className='first-nav'>
            <div class ="first-nav-logo">
                <img src = "Logo1.1.png" alt= "Cour-Cert"></img>
            </div>
            <div className='first-nav-title'>
                <p className='p1'> Course-Certification</p>
                <div className='first-nav-title1'>
                <p className='p2'> "Empowering Your Learning Journey"</p>
                </div>
            </div>
        </nav>
        <nav className='second-nav'>
        <div class ="second-nav-links">
            <ul>
              <li><a href = "./teacherviewcourse"> View Course</a> </li>
              <li><a href = "./teacherprofile"> Account Profile</a> </li>
              <li><a href = "./teacherviewcourse"> Back</a> </li>
             </ul>
           </div>
        </nav>
        <div className='details'>
            <div className='title'>
                <input 
                    type='text'
                    id='title' 
                    placeholder='Your Title'>
                </input>
            </div>
            <div className='description'>
            <Textarea placeholder='Course Description' />
                {/* <input 
                    type='text'
                     id='title' 
                    placeholder='Course Description'>
                </input> */}
            </div>

        </div>
        <div className='addcourse-row'>
            <div className='addcourse-col'>
                <div className='Forms'>
                
                    <input className='form-input1'
                        type='text' 
                        id='topicnumber' 
                        placeholder='Week #'>
                    </input>
                </div>
                <div className='addfile'>
                    <div className='callname'> Name of the file after adding the file
                    </div>
                    <div className='inputfile'>
                        <input 
                             type='file' id='filename'>
                        </input>
                    </div>
                </div>
            </div>
            <div className='butts'>
                <button className='add' type='add' > + Add new tile
                </button>
            </div>
        </div>
    </div>
  )
}
