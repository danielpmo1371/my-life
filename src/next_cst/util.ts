export const stringifyJSON = (data: any): string | undefined => {
  if (data === undefined) return undefined;
  else if (data === null) return "null";
  else if (typeof data === "string")
    return '"' + data.replace(/"/g, '\\"') + '"';
  else if (typeof data === "number") return String(data);
  else if (typeof data === "boolean") return data ? "true" : "false";
  else if (Array.isArray(data))
    return (
      "[ " +
      data
        .reduce((acc: string[], v: any) => {
          if (v === undefined) return [...acc, "null"];
          else return [...acc, stringifyJSON(v)];
        }, [])
        .join(", ") +
      " ]"
    );
  else if (data.constructor === Object)
    return (
      "{ " +
      Object.keys(data)
        .reduce((acc: string[], k: string) => {
          if (data[k] === undefined) return acc;
          else return [...acc, stringifyJSON(k) + ":" + stringifyJSON(data[k])];
        }, [])
        .join(", ") +
      " }"
    );
  else return "{}";
};
