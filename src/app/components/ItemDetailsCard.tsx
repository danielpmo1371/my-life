"use client";

import { getApiCrudClientFor } from "@/next_cst/crudClient";
import { BaseDBType } from "@/next_cst/types";
import { RiDashboard3Line } from "react-icons/ri";
import { useQuery } from "react-query";
import { Routes } from "../common/types";

export default function ItemDetailsCard({
  id,
  apiRoute,
}: {
  id: string;
  apiRoute: Routes;
}) {
  const crudClient = getApiCrudClientFor<BaseDBType>(apiRoute, true);
  const { getData } = crudClient;

  const { data: item, isLoading } = useQuery({
    queryFn: () => getData(id),
  });
  return (
    <div className="card dashboard">
      {!isLoading && (
        <>
          <RiDashboard3Line className="icon" />
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <div>
              <h2 style={{ marginBottom: 0 }}>Details</h2>
              <h3>Title: {item[0].title}</h3>
              {Object.keys(item[0]).map((key) => (
                <div key={key}>
                  <h3 style={{ display: "inline" }}>
                    {key.charAt(0).toUpperCase() + key.slice(1)}:
                  </h3>
                  <span>{(item[0] as any)[key]}</span>
                </div>
              ))}
              <small style={{ margin: 0, padding: 0 }}></small>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                alignSelf: "center",
                scale: 0.6,
                flexWrap: "wrap",
              }}
            ></div>
          </div>
        </>
      )}
    </div>
  );
}
