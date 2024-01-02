import { Dispatch, SetStateAction } from "react";
import { constructRelativeURL, stringifyJSON } from "./util";
import { CrudClientType } from "./types";
import { Routes } from "@/app/common/types";

const output = (output: unknown, enableConsoleLogging: boolean) => {
  enableConsoleLogging && console.log(output);
};

export function getApiCrudClientFor<T extends { id?: string }>(
  apiRoute: Routes,
  enableOutputs: boolean = true
): CrudClientType<T> {
  const getProjectsUrl = `/api/${apiRoute}`;

  const getData = async function (parentId?: string, global?: boolean) {
    output(`starting getData`, enableOutputs);

    let queryParams: { [key: string]: string } = {};
    if (global) queryParams["global"] = global.toString();
    if (parentId) queryParams["parentId"] = parentId.toString();
    const url = constructRelativeURL(getProjectsUrl, queryParams);

    output(`starting call to ${url}`, enableOutputs);
    return await fetch(url).then(async (response) => {
      output(`response: ${stringifyJSON(response)}.`, enableOutputs);
      output(`parsing JSON.`, enableOutputs);
      return await response.json().then((data) => {
        output(`JSON received from ${stringifyJSON(data)}`, enableOutputs);
        output(`setting data`, enableOutputs);
        return data;
      });
    });
  };

  const saveData = async function (newEntity: T) {
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
        return data;
      });
    });
  };

  const deleteAndRefresh = async function (entityToDelete: T) {
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
        return data;
      });
    });
  };

  return {
    apiRoute,
    getProjectsUrl,
    getData,
    saveData: saveData,
    delete: deleteAndRefresh,
  };
}
