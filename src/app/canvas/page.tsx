"use client";
import React from "react";
import "./canvas.css"; // Custom CSS file
// import "../../components/Input.css";
import Dashboard from "../components/Dashboard";
import LinkToDocuments from "../components/LinkToDocuments";
import ProfessionalDevelopment from "../components/ProfessionalDevelopment";
import PersonalDevelopment from "../components/PersonalDevelopment";
import Miscelaneous from "../components/Miscelaneous";
import PillButton from "@/components/PillButton";
import { withPageAuthRequired } from "@auth0/nextjs-auth0/client";
import { Modal } from "../components/Modal";
import AppRequests from "../components/AppRequests";
import { FaTools } from "react-icons/fa";

const Home = withPageAuthRequired(() => {
  return (
    <>
      <Modal />
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "20px",
        }}
      >
        <h1>Brain context canvas</h1>
        <PillButton>
          <a href="/api/auth/logout">Logout</a>
        </PillButton>
      </div>
      <div className="home-container">
        <Dashboard />
        <AppRequests />
      </div>
      <div className="home-container">
        <div className="card doclinks">
          <FaTools className="icon" />
          <h3 style={{ color: "orange" }}>
            == The below sections are not functional yet ==
          </h3>
        </div>
      </div>
      <div className="home-container">
        <LinkToDocuments />
        <ProfessionalDevelopment />
        <PersonalDevelopment />
        <Miscelaneous />
      </div>
    </>
  );
});

export default Home;
