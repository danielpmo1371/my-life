import React from "react";

const Home = () => {
  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h1 style={{ textAlign: "center" }}>My Main Idea File</h1>

      <section>
        <h2>Personal Dashboard</h2>
        <p>Overview of current focuses, events, deadlines.</p>
      </section>

      <section>
        <h2>Links to Key Documents</h2>
        <ul>
          <li>
            <a href="#budget">Budget</a>
          </li>
          <li>
            <a href="#weekly-schedule">Weekly Schedule</a>
          </li>
          <li>
            <a href="#goals">Goals</a>
          </li>
          <li>
            <a href="#projects">Projects</a>
          </li>
          <li>
            <a href="#to-do-lists">To-Do Lists</a>
          </li>
          <li>
            <a href="#important-contacts">Important Contacts</a>
          </li>
        </ul>
      </section>

      <section>
        <h2>Health and Wellness</h2>
        <ul>
          <li>
            <a href="#fitness-plan">Fitness Plan</a>
          </li>
          <li>
            <a href="#meal-plans">Meal Plans</a>
          </li>
          <li>
            <a href="#medical-records">Medical Records</a>
          </li>
        </ul>
      </section>

      <section>
        <h2>Professional Development</h2>
        <ul>
          <li>
            <a href="#career-goals">Career Goals</a>
          </li>
          <li>
            <a href="#skill-development">Skill Development</a>
          </li>
          <li>
            <a href="#resume-cv">Resume/CV</a>
          </li>
        </ul>
      </section>

      <section>
        <h2>Personal Development</h2>
        <ul>
          <li>
            <a href="#reading-list">Reading List</a>
          </li>
          <li>
            <a href="#learning-goals">Learning Goals</a>
          </li>
          <li>
            <a href="#journal-reflections">Journal/Reflections</a>
          </li>
        </ul>
      </section>

      <section>
        <h2>Financial Planning</h2>
        <ul>
          <li>
            <a href="#investment-portfolio">Investment Portfolio</a>
          </li>
          <li>
            <a href="#retirement-plan">Retirement Plan</a>
          </li>
          <li>
            <a href="#debt-management">Debt Management</a>
          </li>
        </ul>
      </section>

      <section>
        <h2>Miscellaneous</h2>
        <ul>
          <li>
            <a href="#travel-plans">Travel Plans</a>
          </li>
          <li>
            <a href="#wish-list">Wish List</a>
          </li>
          <li>
            <a href="#important-dates">Important Dates</a>
          </li>
        </ul>
      </section>
    </div>
  );
};

export default Home;
