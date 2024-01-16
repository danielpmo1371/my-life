"use client";
import { useState } from "react";
import { useUser } from "@auth0/nextjs-auth0/client";
import { getApiCrudClientFor } from "@/next_cst/crudClient";
import PillListOfItems from "./PillListOfItems";
import { Tooltip } from "react-tooltip";
import { BaseDBType } from "@/next_cst/types";

type DoItNextItem = {
  id?: string;
  title: string;
  order: string;
  ownerEmail: string;
  todoId?: string;
};

export default function DoItNextItems({ parentId }: { parentId?: string }) {
  const { user } = useUser();

  const state = useState<DoItNextItem[]>([]);
  const crudClient = getApiCrudClientFor<DoItNextItem>("doItNextItems", true);

  const getDataCallBack = () =>
    crudClient.getData(parentId).then((x: BaseDBType[]) => {
      console.log(x.filter((y) => y.createdAt));
      return x;
    });

  return (
    user && (
      <div style={{ flex: 1 }}>
        <h4>Do It Next</h4>
        <h6 className="text-with-hidden-explanation" id="wish-list-items-are">
          Absolute focus on this for now and forget the rest until...
          <Tooltip anchorSelect="#wish-list-items-are" place="top">
            <p style={{ maxWidth: "250px", fontSize: "14px" }}>
              you have ticked some boxes and you&#39;re ready to chase more.
            </p>
          </Tooltip>
        </h6>
        <PillListOfItems<DoItNextItem>
          crudClient={crudClient}
          user={user}
          state={state}
          typeOfListItem="doItNext"
          parentId={parentId}
          getDataCallBack={getDataCallBack}
        />
      </div>
    )
  );
}
