"use client";
import React from "react";
import "./Home.css"; // Custom CSS file
import Dashboard from "./Dashboard";
import LinkToDocuments from "./LinkToDocuments";
import ProfessionalDevelopment from "./ProfessionalDevelopment";
import PersonalDevelopment from "./PersonalDevelopment";
import Miscelaneous from "./Miscelaneous";

const Home = () => {
  return (
    <>
      <h1>Brain context canvas</h1>
      <div className="home-container">
        <Dashboard />
        <LinkToDocuments />
        <ProfessionalDevelopment />
        <PersonalDevelopment />
        <Miscelaneous />
      </div>
    </>
  );
};

export default Home;
