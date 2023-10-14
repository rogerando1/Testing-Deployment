import React, { Component, useEffect, useState } from 'react';
import './StudentViewCourse.css'

export const StudentViewCourse = () => {
    const [count, setCount] = useState(0);
    const [checked, setChecked] = useState(0);
    const [percentage, setPercentage] = useState(0);
  
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
        
        <div class = "ready"></div>
      </div>
    );
  }
  