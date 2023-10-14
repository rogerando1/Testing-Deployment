import React, { useEffect,useState } from 'react';
import './TeacherViewCourse.css';
import axios from 'axios'

export const TeacherViewCourse = () => 
{
    const [courses, getCourses] = useState([])

    useEffect( ()=>{
        axios.get('http://localhost:3002/getTeachercourses')
        .then(courses => getCourses(courses.data))
        .catch( err => console.log(err))
    },[])

    return(
        <div className='addcoursecontainer'>
            <nav className='first-nav'>
                <div class ="first-nav-logo">
                   <img src = "Logo1.1.png" alt=    "Cour-Cert"></img>
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
              <li><a href = "#"> View Course</a> </li>
              <li><a href = "./teacherprofile"> Account Profile</a> </li>
              <li><a href = "/teacherhomepage"> Back</a> </li>
             </ul>
           </div>
        </nav>

        <div className='detail'> 
            <div>
                List of courses
            </div>
            {courses.map(course => {
                return <div className='title1'>
                <a href='teacheraddcourse'> {course.course_title}
                </a>
            </div>
            })
        }
            {/* <div className='title1'>
                <a href='teacheraddcourse'> Title of the Course
                </a>
            </div> */}
        </div>
    </div>
  )
}
