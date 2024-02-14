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
    height: "100%",
    width: "100vw",
    flexDirection: "column",
  };
  const pillBtnStyle = { ...center, height: "30px", margin: "10px" };

  return (
    <div style={center}>
      <h1>Brain context canvas</h1>

      {!user && (
        <a href="/api/auth/login">
          <div style={center}>
            <PillButton style={pillBtnStyle}>Login</PillButton>
            <div>
              <Image
                src={homeImg}
                alt="Canvas ilustration"
                width={600}
                height={600}
              />
            </div>
          </div>
        </a>
      )}
      {user && (
        <Link href="/canvas">
          <div style={center}>
            <PillButton style={pillBtnStyle}>Open your canvas</PillButton>
            <div className="home-container">
              <Image
                src={homeImg}
                alt="Canvas ilustration"
                width={600}
                height={600}
              />
            </div>
          </div>
        </Link>
      )}
    </div>
  );
};

export default Home;
