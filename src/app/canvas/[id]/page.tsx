"use client";
import React from "react";
import "../canvas.css"; // Custom CSS file
import Dashboard from "@/app/components/Dashboard";
import LinkToDocuments from "@/app/components/LinkToDocuments";
import Miscelaneous from "@/app/components/Miscelaneous";
import { Modal } from "@/app/components/Modal";
import PersonalDevelopment from "@/app/components/PersonalDevelopment";
import ProfessionalDevelopment from "@/app/components/ProfessionalDevelopment";
import PillButton from "@/components/PillButton";
import { withPageAuthRequired } from "@auth0/nextjs-auth0/client";
import { FaHome } from "react-icons/fa";
import Link from "next/link";
import { useRouter } from "next/navigation";

type ItemCCProps = {
  params: {
    id: string;
  };
};

const ItemContextCanvas = withPageAuthRequired(({ params }: ItemCCProps) => {
  const id = params.id;

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
        <h1>Item context canvas</h1>
        <h2>{id}</h2>
        <PillButton>
          <Link href="/canvas">
            <FaHome />
          </Link>
        </PillButton>
        <PillButton>
          <a href="/api/auth/logout">Logout</a>
        </PillButton>
      </div>
      <div className="home-container">
        <Dashboard parentId={id} />
      </div>
    </>
  );
});

export default ItemContextCanvas;
