"use client";
import React from "react";
import "./canvas.css"; // Custom CSS file
import Dashboard from "../components/Dashboard";
import LinkToDocuments from "../components/LinkToDocuments";
import ProfessionalDevelopment from "../components/ProfessionalDevelopment";
import PersonalDevelopment from "../components/PersonalDevelopment";
import Miscelaneous from "../components/Miscelaneous";
import PillButton from "@/components/PillButton";
import { withPageAuthRequired } from "@auth0/nextjs-auth0/client";

const Home = withPageAuthRequired(() => {
  return (
    <>
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
        <LinkToDocuments />
        <ProfessionalDevelopment />
        <PersonalDevelopment />
        <Miscelaneous />
      </div>
    </>
  );
});

export default Home;
