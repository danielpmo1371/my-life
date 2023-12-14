"use client";
import React from "react";
import "./Home.css"; // Custom CSS file
import { useUser } from "@auth0/nextjs-auth0/client";
import Link from "next/link";
import ProfileClient from "./components/ProfileClient";
import Image from "next/image";
import homeImg from "../../public/home_img.jpg";

const Home = () => {
  const { user } = useUser();
  const center: React.CSSProperties = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",
    flexDirection: "column",
  };

  return (
    <div style={center}>
      <h1>Brain context canvas</h1>

      {!user && <a href="/api/auth/login">Login</a>}
      {user && <Link href="/canvas">Canvas</Link>}
      <div className="home-container">
        <Image
          src={homeImg}
          alt="Canvas ilustration"
          width={600}
          height={600}
        />
      </div>
    </div>
  );
};

export default Home;
