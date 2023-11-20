import React from 'react';
import './Home.css'; // Custom CSS file
import { FaLink, FaHeartbeat, FaBriefcase, FaUniversity, FaBookOpen, FaPiggyBank, FaAsterisk } from 'react-icons/fa'; // Importing icons
import { RiDashboard3Line } from "react-icons/ri";

const Home = () => {
  return (
    <div className="home-container">
      <h1>My Main Idea File</h1>

      <div className="card">
        <RiDashboard3Line className="icon" />
        <h2>Personal Dashboard</h2>
        <p>Overview of current focuses, events, deadlines.</p>
      </div>

      <div className="card">
        <FaLink className="icon" />
        <h2>Links to Key Documents</h2>
        <ul>
          <li><a href="#budget">Budget</a></li>
          <li><a href="#weekly-schedule">Weekly Schedule</a></li>
          <li><a href="#goals">Goals</a></li>
          <li><a href="#projects">Projects</a></li>
          <li><a href="#to-do-lists">To-Do Lists</a></li>
          <li><a href="#important-contacts">Important Contacts</a></li>
        </ul>
      </div>

      <div className="card">
        <FaHeartbeat className="icon" />
        <h2>Health and Wellness</h2>
        <ul>
          <li><a href="#fitness-plan">Fitness Plan</a></li>
          <li><a href="#meal-plans">Meal Plans</a></li>
          <li><a href="#medical-records">Medical Records</a></li>
        </ul>
      </div>

      <div className="card">
        <FaBriefcase className="icon" />
        <h2>Professional Development</h2>
        <ul>
          <li><a href="#career-goals">Career Goals</a></li>
          <li><a href="#skill-development">Skill Development</a></li>
          <li><a href="#resume-cv">Resume/CV</a></li>
        </ul>
      </div>

      <div className="card">
        <FaUniversity className="icon" />
        <h2>Personal Development</h2>
        <ul>
          <li><a href="#reading-list">Reading List</a></li>
          <li><a href="#learning-goals">Learning Goals</a></li>
          <li><a href="#journal-reflections">Journal/Reflections</a></li>
        </ul>
      </div>

      <div className="card">
        <FaPiggyBank className="icon" />
        <h2>Financial Planning</h2>
        <ul>
          <li><a href="#investment-portfolio">Investment Portfolio</a></li>
          <li><a href="#retirement-plan">Retirement Plan</a></li>
          <li><a href="#debt-management">Debt Management</a></li>
        </ul>
      </div>

      <div className="card">
        <FaAsterisk className="icon" />
        <h2>Miscellaneous</h2>
        <ul>
          <li><a href="#travel-plans">Travel Plans</a></li>
          <li><a href="#wish-list">Wish List</a></li>
          <li><a href="#important-dates">Important Dates</a></li>
        </ul>
      </div>
    </div>
  );
};

export default Home;
