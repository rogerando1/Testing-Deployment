import React, { useEffect, useState } from 'react';
import './CourseViewPage.css'
import { Link, useLocation } from 'react-router-dom';
import axios from 'axios';
import Quiz from './Quiz';

export const CourseViewPage = () => {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const courseTitle = queryParams.get('title');
    const courseDescription = queryParams.get('description');
    const id = queryParams.get('id');
    const [allFiles, setAllFiles] = useState();

    const showPdf = (file) => {
        window.open(`http://localhost:3002/uploaded-files/${file}`, "_blank", "noreferrer");
    };

    useEffect(() => {
        const getPDF = async () => {
            try {
                const response = await axios.get('http://localhost:3002/getWeeklyTopics', {
                    params: {
                        id
                    }
                });
                setAllFiles(response.data); // Assuming response.data is an array of topics
            } catch (error) {
                console.error("Error fetching data: ", error);
            }
        };

        getPDF(); // Fetch data when the component mounts or 'id' changes
    }, [id]);

    return (
        <div className='addcoursecontainer1'>
            <nav className='first-nav1'>
                <div className="first-nav-logo1">
                    <Link to='/studenthomepage'>
                        <img src="Logo1.1.png" alt="Cour-Cert"></img>
                    </Link>
                </div>
                <div className='first-nav-title1'>
                    <p className='p1'> Course-Certification</p>
                    <div className='first-nav-title1'>
                        <p className='p3'> "Empowering Your Learning Journey"</p>
                    </div>
                </div>
            </nav>
            <nav className='second-nav2'>
                <div className="second-nav-links2">
                    <ul>
                        <li><Link to="/allcourselist"> View Course</Link> </li>
                        <li><Link to="/studentviewcourse"> Back</Link> </li>
                    </ul>
                </div>
            </nav>

            <div className='containerss'>
                <div className='coursetitle'>
                    {courseTitle}
                </div>
                <div className='coursedescriptions'>
                    <p>
                        {courseDescription}
                    </p>
                </div>
                {allFiles == null
                    ? ""
                    : (() => {
                        // Grouping files by week number
                        const groupedFiles = allFiles.reduce((acc, curr) => {
                            const existingWeek = acc.find(item => item.weekNumber === curr.weekNumber);
                            if (existingWeek) {
                                existingWeek.files.push(curr);
                            } else {
                                acc.push({
                                    weekNumber: curr.weekNumber,
                                    files: [curr],
                                });
                            }
                            return acc;
                        }, []);

                        // Sort the grouped files by week number
                        groupedFiles.sort((a, b) => parseInt(a.weekNumber) - parseInt(b.weekNumber));

                        return groupedFiles.map((weekData, index) => (
                            <div className='cotainerss' key={index}>
                                <div className='weeknumbers'>
                                    Week: {weekData.weekNumber}
                                </div>
                                {weekData.files.map((fileData, fileIndex) => (
                                    <div className='weeklyfiles' key={fileIndex} onClick={() => showPdf(fileData.file)}>
                                        {fileData.PDFdescription}
                                    </div>
                                ))}
                            </div>
                        ));
                    })()
                }
                <div>
                    <p>
                    <Quiz />
                    </p>
                </div>
            </div>
        </div>
    );
};
