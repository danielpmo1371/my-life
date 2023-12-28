import { Dispatch, SetStateAction } from "react";
import { stringifyJSON } from "./util";

const output = (output: unknown, enableConsoleLogging: boolean) => {
  enableConsoleLogging && console.log(output);
};

export function getApiCrudClientFor<T extends { id?: string }>(
  apiRoute: string,
  enableOutputs: boolean = true
) {
  const getProjectsUrl = `/api/${apiRoute}`;

  return {
    apiRoute,
    getProjectsUrl,
    getData: async function (
      setData: Dispatch<SetStateAction<T[]>>,
      id?: string
    ) {
      output(`starting getData`, enableOutputs);
      const getUrl = getProjectsUrl + (id ? `?id=${id}` : "");
      output(`starting call to ${getUrl}`, enableOutputs);
      return await fetch(getUrl).then(async (response) => {
        output(`response: ${stringifyJSON(response)}.`, enableOutputs);
        output(`parsing JSON.`, enableOutputs);
        return await response.json().then((data) => {
          output(`JSON received from ${stringifyJSON(data)}`, enableOutputs);
          output(`setting data`, enableOutputs);
          setData(data);
          return data;
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
      entityToDelete: T,
      setData: Dispatch<SetStateAction<T[]>>
    ) {
      output(`starting deleteAndRefresh`, enableOutputs);
      output(`starting call to ${getProjectsUrl}`, enableOutputs);
      return await fetch(getProjectsUrl, {
        method: "DELETE",
        body: JSON.stringify(entityToDelete),
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
