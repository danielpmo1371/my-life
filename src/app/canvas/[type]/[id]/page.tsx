"use client";
import React from "react";
import "../../canvas.css"; // Custom CSS file
import Dashboard from "@/app/components/Dashboard";
import { Modal } from "@/app/components/Modal";
import PillButton from "@/components/PillButton";
import { withPageAuthRequired } from "@auth0/nextjs-auth0/client";
import { FaHome } from "react-icons/fa";
import Link from "next/link";
import { Routes } from "@/app/common/types";
import ItemDetailsCard from "@/app/components/ItemDetailsCard";
import { QueryClient, QueryClientProvider } from "react-query";

type ItemCCProps = {
  params: {
    id: string;
    type: string;
  };
};

const ItemContextCanvas = withPageAuthRequired(({ params }: ItemCCProps) => {
  const type = params.type;
  const apiRoute = (
    type[type.length - 1] === "s" ? type : type + "s"
  ) as Routes;
  const queryClient = new QueryClient();

  const id = params.id;

  return (
    <>
      <QueryClientProvider client={queryClient}>
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
          <ItemDetailsCard id={id} apiRoute={apiRoute} />
          <Dashboard parentId={id} />
        </div>
      </QueryClientProvider>
    </>
  );
});

export default ItemContextCanvas;
