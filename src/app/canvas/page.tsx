"use client";
import React from "react";
import "./canvas.css"; // Custom CSS file
import Dashboard from "../components/Dashboard";
import LinkToDocuments from "../components/LinkToDocuments";
import ProfessionalDevelopment from "../components/ProfessionalDevelopment";
import PersonalDevelopment from "../components/PersonalDevelopment";
import Miscelaneous from "../components/Miscelaneous";

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
