"use client";
import { useRef, useState } from "react";
import { useUser } from "@auth0/nextjs-auth0/client";
import { getApiCrudClientFor } from "@/next_cst/crudClient";
import PillListOfItems from "./PillListOfItems";
import { Tooltip } from "react-tooltip";
import { BaseDBType } from "@/next_cst/types";
import { isUTCToday } from "@/next_cst/util";
import { UseQueryResult, useQuery } from "react-query";

type DoItNextItem = {
  id?: string;
  title: string;
  order: string;
  ownerEmail: string;
  todoId?: string;
} & BaseDBType;

export default function DoItNextItems({ parentId }: { parentId?: string }) {
  const { user } = useUser();

  const crudClient = getApiCrudClientFor<DoItNextItem>("doItNextItems", true);

  const getTodayItems = () =>
    crudClient.getData(parentId).then((x: BaseDBType[]) => {
      return x.filter((y) => isUTCToday(y.modifiedAt!));
    });

  const getOlderItems = () =>
    crudClient.getData(parentId).then((x: BaseDBType[]) => {
      return x.filter((y) => !isUTCToday(y.modifiedAt!));
    });

  // const todaysQuery = useQuery<DoItNextItem[]>(
  //   "doItNext",
  //   getTodayItems,
  //   { staleTime: 60 * 1000, cacheTime: 60 * 1000 } // 1 minute
  // );

  // const olderItemsQuery = useQuery<DoItNextItem[]>(
  //   "doItNext",
  //   getOlderItems,
  //   { staleTime: 60 * 1000, cacheTime: 60 * 1000 } // 1 minute
  // );

  // const getQueryData =
  //   useRef<UseQueryResult<DoItNextItem[], unknown>>(todaysQuery);

  const [getDataCallBack, setQueryDataCallBack] = useState(() => getTodayItems);
  const refetchSignal = useState(false);

  const isOlder = useRef(false);

  const handleOlder = () => {
    setQueryDataCallBack(() => getOlderItems);
    refetchSignal[1](true);
    isOlder.current = true;
  };

  const handleTodays = () => {
    setQueryDataCallBack(() => getTodayItems);
    refetchSignal[1](true);
    isOlder.current = false;
  };

  const reActivate = (item: DoItNextItem) => {
    crudClient.saveItem({ ...item, modifiedAt: new Date() });
  };

  const state = useState<DoItNextItem[]>([]);

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
        {!isOlder.current && (
          <button type="button" onClick={handleOlder}>
            Show Older
          </button>
        )}
        {isOlder.current && (
          <button type="button" onClick={handleTodays}>
            Show today&apos;s
          </button>
        )}
        <PillListOfItems<DoItNextItem>
          crudClient={crudClient}
          user={user}
          state={state}
          typeOfListItem="doItNext"
          parentId={parentId}
          getDataCallBack={getDataCallBack}
          refetchSignal={refetchSignal}
          viewItemComponent={(item) => {
            return (
              <>
                <h1>Do It Next</h1>
                <hr></hr>
                <p style={{ fontSize: "28px" }}>{item.title}</p>
                <button type="button" onClick={() => reActivate(item)}>
                  Re-activate
                </button>
              </>
            );
          }}
        />
      </div>
    )
  );
}
