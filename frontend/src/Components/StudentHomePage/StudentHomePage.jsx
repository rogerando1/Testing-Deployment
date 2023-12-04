import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./StudentHomePage.css";
import "./addlogo.png";
import axios from "axios";
import { useUserDataAtom } from "../../hooks/user_data_atom";
import { Link } from "react-router-dom";

export const StudentHomePage = () => {
  const [userData, setUserData] = useUserDataAtom();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [searchButtonClicked, setSearchButtonClicked] = useState(false);
  const [initialRequestComplete, setInitialRequestComplete] = useState(false);
  console.log(userData);

  //jwt
  axios.defaults.withCredentials = true;
  useEffect(() => {
    axios
      .get("http://localhost:3002/studenthomepage")
      .then((result) => {
        console.log(result);
        
      console.log("Token: " +result.data);
        if (result.data !== "Success") {
          navigate("/loginsignup");
        }
      })
      .catch((err) => console.log(err))
      .finally(() => {
        setInitialRequestComplete(true);
      });
  }, []);

  const handleSearch = () => {
    axios
      .get(`http://localhost:3002/searchcourse?query=${searchQuery}`)
      .then((result) => {
        console.log(result);
        setSearchResults(result.data);
      })
      .catch((err) => console.log(err))
      .finally(() => {
        setSearchButtonClicked(true);
      })
  };

  if (!initialRequestComplete) {
    // Initial request still in progress
    return null; // or loading indicator if needed
  }

  return (
    <div className="studenthomepage">
      <nav className="navHomepage">
        <div className="app-logo1">
          <img src="logo.png" alt="Cour-Cert" height={160} width={100}></img>
        </div>
        <div className="searchBar2">
          <input
            type="search"
            id="search-input"
            placeholder="Search here"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          ></input>
          <button id="search-button" onClick={handleSearch}>
            Search
          </button>
        </div>
        {searchResults !== null && searchResults.length > 0 ? (
  <div className="search-results">
    <h2>Search Results:</h2>
    <ul>
      {searchResults.map((course) => (
        <li key={course.id}>
          <Link to={`/course/${course.id}`}>{course.course_title}</Link>
        </li>
      ))}
    </ul>
  </div>
) : (
  searchButtonClicked && searchResults.length === 0 && (
    <div className="no-results-found">
      <p>No results found</p>
    </div>
  )
)}
        <div className="nav-link2">
          <ul>
            <li>
              <Link to="/studentviewcourse">My Course</Link>
            </li>
            <li>
              <Link to="/">Certifications</Link>
            </li>
            <li>
              <Link to="/profilepage">My Profile</Link>
            </li>
            <li>
              <Link to="/">Signout</Link>
            </li>
          </ul>
        </div>
      </nav>
      <div className="addcoursebutton">
        <button id="addbutton" onClick={() => navigate("/allcourselist")}></button>
      </div>
    </div>
  );
};