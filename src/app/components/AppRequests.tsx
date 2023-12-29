"use client";

import { RiHeartPulseLine } from "react-icons/ri";
import PillListOfItems from "./PillListOfItems";
import { getApiCrudClientFor } from "@/next_cst/crudClient";
import { useUser } from "@auth0/nextjs-auth0/client";
import { useState } from "react";

type AppRequest = {
  id?: string;
  title: string;
  order: string;
  ownerEmail: string;
};

export default function AppRequests({ parentId }: { parentId?: string }) {
  const { user } = useUser();

  const state = useState<AppRequest[]>([]);
  const crudClient = getApiCrudClientFor<AppRequest>("apprequests", true);

  if (!user) return;

  return (
    <div className="card dashboard">
      {/* <FaRegQuestionCircle className="icon" /> */}
      <RiHeartPulseLine className="icon" />
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <div>
          <h2 style={{ marginBottom: 0 }}>App Requests</h2>
          <small style={{ margin: 0, padding: 0 }}>
            Feature requests, bug reports, etc.
          </small>
        </div>
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          flexWrap: "wrap",
        }}
        className="dashboard-sections"
      >
        <PillListOfItems<AppRequest>
          crudClient={crudClient}
          user={user}
          state={state}
          typeOfListItem="apprequests"
          parentId={parentId}
          isGlobal={true}
        />
      </div>
    </div>
  );
}
