"use client";
import React from "react";
import "./Home.css"; // Custom CSS file
import { useUser } from "@auth0/nextjs-auth0/client";
import Link from "next/link";
import Image from "next/image";
import homeImg from "../../public/home_img.jpg";
import PillButton from "@/components/PillButton";

const Home = () => {
  const { user } = useUser();
  const center: React.CSSProperties = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",
    flexDirection: "column",
  };
  const pillBtnStyle = { ...center, height: "30px", margin: "10px" };

  return (
    <div style={center}>
      <h1>Brain context canvas</h1>

      {!user && (
        <PillButton style={pillBtnStyle}>
          <a href="/api/auth/login">Login</a>
        </PillButton>
      )}
      {user && (
        <PillButton style={pillBtnStyle}>
          <Link href="/canvas">Open your canvas</Link>
        </PillButton>
      )}
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
