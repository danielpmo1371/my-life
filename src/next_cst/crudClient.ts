import { Dispatch, SetStateAction } from "react";
import { stringifyJSON } from "./util";

const output = (output: unknown, enableConsoleLogging: boolean) => {
  enableConsoleLogging && console.log(output);
};

export function getCrudFor<T>(
  apiRoute: string,
  enableOutputs: boolean = false
) {
  const BASE_URL = process.env.NEXT_PUBLIC_API_URL;
  const getProjectsUrl = `${BASE_URL}api/${apiRoute}`;

  return {
    BASE_URL,
    getProjectsUrl,
    getData: async function (setData: Dispatch<SetStateAction<T[]>>) {
      output(`starting getData`, enableOutputs);
      output(`starting call to ${getProjectsUrl}`, enableOutputs);
      return await fetch(getProjectsUrl).then(async (response) => {
        output(`response: ${stringifyJSON(response)}.`, enableOutputs);
        output(`parsing JSON.`, enableOutputs);
        return await response.json().then((data) => {
          output(`JSON received from ${stringifyJSON(data)}`, enableOutputs);
          output(`setting data`, enableOutputs);
          setData(data);
        });
      });
    },
    saveDataAndRefresh: async function (
      newEntity: T,
      setData: Dispatch<SetStateAction<T[]>>
    ) {
      output(`starting saveDataAndRefresh`, enableOutputs);
      output(`starting call to ${getProjectsUrl}`, enableOutputs);
      return await fetch(getProjectsUrl, {
        method: "POST",
        body: JSON.stringify(newEntity),
      }).then(async (response) => {
        output(`response: ${JSON.stringify(response)}.`, enableOutputs);
        output(`parsing JSON.`, enableOutputs);
        return await response.json().then((data) => {
          output(`JSON received from ${JSON.stringify(data)}`, enableOutputs);
          output(`setting data`, enableOutputs);
          setData(data);
          return data;
        });
      });
    },

    deleteAndRefresh: async function (
      projToDelete: T,
      setData: Dispatch<SetStateAction<T[]>>
    ) {
      output(`starting deleteAndRefresh`, enableOutputs);
      output(`starting call to ${getProjectsUrl}`, enableOutputs);
      return await fetch(getProjectsUrl, {
        method: "DELETE",
        body: JSON.stringify(projToDelete),
      }).then(async (response) => {
        output(`response: ${JSON.stringify(response)}.`, enableOutputs);
        output(`parsing JSON.`, enableOutputs);
        return await response.json().then((data) => {
          output(`JSON received from ${JSON.stringify(data)}`, enableOutputs);
          output(`setting data`, enableOutputs);
          setData(data);
          return data;
        });
      });
    },
  };
}
