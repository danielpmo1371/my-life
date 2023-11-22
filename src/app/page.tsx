"use client";
import React, { useState } from "react";
import "./Home.css"; // Custom CSS file
import {
  FaLink,
  FaHeartbeat,
  FaBriefcase,
  FaUniversity,
  FaPiggyBank,
  FaAsterisk,
  FaCross,
  FaTrash,
} from "react-icons/fa"; // Importing icons
import { RiDashboard3Line } from "react-icons/ri";
import Link from "next/link";
import useFocusStore from "./stores/focusStore";
import useStore from "./stores/useStore";

const Home = () => {
  const [newItem, updateNewItem] = useState("new focus");
  // const focusStore = useFocusStore();
  const focusState = useStore(useFocusStore, (state) => state);

  return (
    <>
      <h1>Brain context canvas</h1>
      <div className="home-container">
        <div className="card dashboard">
          <RiDashboard3Line className="icon" />
          <h2>Personal Dashboard</h2>
          <p>Overview of current focuses, events, deadlines.</p>
          <ul>
            <li>Focus items</li>
            {focusState?.focusItems.map((i) => (
              <li key={i}>
                {i}
                <span
                  style={{ margin: "5px" }}
                  onClick={() => focusState.removeItem(i)}
                >
                  <FaTrash />
                </span>
              </li>
            ))}
          </ul>
          <input
            type="text"
            onChange={(e) => updateNewItem(e.currentTarget.value)}
            value={newItem}
          />
          <button type="button" onClick={() => focusState?.addItem(newItem)}>
            Add
          </button>
        </div>

        <div className="card doclinks">
          <FaLink className="icon" />
          <h2>Links to Key Documents</h2>
          <ul>
            <li>
              <Link href="#budget">Budget</Link>
            </li>
            <li>
              <Link href="#weekly-schedule">Weekly Schedule</Link>
            </li>
            <li>
              <Link href="#goals">Goals</Link>
            </li>
            <li>
              <Link href="#projects">Projects</Link>
            </li>
            <li>
              <Link href="#to-do-lists">To-Do Lists</Link>
            </li>
            <li>
              <Link href="#important-contacts">Important Contacts</Link>
            </li>
          </ul>
        </div>

        <div className="card health">
          <FaHeartbeat className="icon" />
          <h2>Health and Wellness</h2>
          <ul>
            <li>
              <Link href="#fitness-plan">Fitness Plan</Link>
            </li>
            <li>
              <Link href="#meal-plans">Meal Plans</Link>
            </li>
            <li>
              <Link href="#medical-records">Medical Records</Link>
            </li>
          </ul>
        </div>

        <div className="card profdev">
          <FaBriefcase className="icon" />
          <h2>Professional Development</h2>
          <ul>
            <li>
              <Link href="#career-goals">Career Goals</Link>
            </li>
            <li>
              <Link href="#skill-development">Skill Development</Link>
            </li>
            <li>
              <Link href="#resume-cv">Resume/CV</Link>
            </li>
          </ul>
        </div>

        <div className="card personaldev">
          <FaUniversity className="icon" />
          <h2>Personal Development</h2>
          <ul>
            <li>
              <Link href="#reading-list">Reading List</Link>
            </li>
            <li>
              <Link href="#learning-goals">Learning Goals</Link>
            </li>
            <li>
              <Link href="#journal-reflections">Journal/Reflections</Link>
            </li>
          </ul>
        </div>

        <div className="card finplan">
          <FaPiggyBank className="icon" />
          <h2>Financial Planning</h2>
          <ul>
            <li>
              <Link href="#investment-portfolio">Investment Portfolio</Link>
            </li>
            <li>
              <Link href="#retirement-plan">Retirement Plan</Link>
            </li>
            <li>
              <Link href="#debt-management">Debt Management</Link>
            </li>
          </ul>
        </div>

        <div className="card miscsection">
          <FaAsterisk className="icon" />
          <h2>Miscellaneous</h2>
          <ul>
            <li>
              <Link href="#travel-plans">Travel Plans</Link>
            </li>
            <li>
              <Link href="#wish-list">Wish List</Link>
            </li>
            <li>
              <Link href="#important-dates">Important Dates</Link>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Home;
