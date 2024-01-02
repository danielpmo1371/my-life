"use client";
import React, { useEffect, useState } from "react";
import "../../canvas.css"; // Custom CSS file
import Dashboard from "@/app/components/Dashboard";
import { Modal } from "@/app/components/Modal";
import PillButton from "@/components/PillButton";
import { withPageAuthRequired } from "@auth0/nextjs-auth0/client";
import { FaHome } from "react-icons/fa";
import Link from "next/link";
import { getApiCrudClientFor } from "@/next_cst/crudClient";
import { Routes } from "@/app/common/types";
import { BaseDBType } from "@/next_cst/types";

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

  const id = params.id;

  const crudClient = getApiCrudClientFor<BaseDBType>(apiRoute, true);
  const { getData } = crudClient;
  const [item, setItem] = useState<BaseDBType>({} as BaseDBType);

  useEffect(() => {
    getData(id).then((x) => {
      setItem(x.find((y: BaseDBType) => y.id === id)!);
    });
  }, []);

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
        <h3>Title: {item.title}</h3>
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
