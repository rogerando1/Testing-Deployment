import React, { Component, useEffect, useState } from 'react';
import './StudentViewCourse.css'
import { useNavigate } from 'react-router-dom';
import axios from 'axios'

export const StudentViewCourse = () => {
    const [count, setCount] = useState(0);
    const [checked, setChecked] = useState(0);
    const [percentage, setPercentage] = useState(0);
    const [courses, getCourses] = useState([]);

  
    useEffect(() => {
      countBoxes();
      countChecked();
    }, []);
  
    function countBoxes() {
      const checkboxes = document.querySelectorAll("input[type='checkbox']");
      setCount(checkboxes.length);
    }
  
    function countChecked() {
      const checkedCheckboxes = document.querySelectorAll("input:checked");
      setChecked(checkedCheckboxes.length);
      const calculatedPercentage = parseInt((checkedCheckboxes.length / count) * 100, 10);
      setPercentage(calculatedPercentage);
    }
  

    useEffect( ()=>{
      axios.get('http://localhost:3002/getStudentAddcourses')
      .then(courses => getCourses(courses.data))
      .catch( err => console.log(err))
  },[])

  
    return (
      <div>
            <input type="checkbox" onChange={countBoxes} onClick={countChecked} />
            <input type="checkbox" onChange={countBoxes} onClick={countChecked}/>
            <input type="checkbox"onChange={countBoxes} onClick={countChecked} />
            <input type="checkbox" onChange={countBoxes} onClick={countChecked}/>
            <input type="checkbox" onChange={countBoxes} onClick={countChecked}/>

        <div class="progressbar-container">
            <div className="progressbar-bar" style={{ width: `${percentage}%` }}></div>
            <div className="progressbar-label">{percentage}%</div>
        </div>

        <div className='titles1'>
                    <a href='courseviewpage'>
                        {courses.course_title}
                    </a>  
                </div>
        
        <div class = "ready"></div>
      </div>
    );
  }
  