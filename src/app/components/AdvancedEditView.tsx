import { getApiCrudClientFor } from "@/next_cst/crudClient";
import { useState } from "react";

export default function AdvancedEditView({
  originalValue,
  apiEntity,
}: {
  originalValue: any;
  apiEntity: string;
}) {
  const { saveDataAndRefresh } = getApiCrudClientFor(apiEntity, true);

  const [editVal, setEditVal] = useState(
    JSON.stringify(originalValue, null, 2)
  );

  const [loading, setLoading] = useState(false);

  const saveItem = () => {
    const output = JSON.parse(editVal);
    console.log(output);

    if (!output) return;

    setLoading(true);
    console.log("saving");
    saveDataAndRefresh(output, (d) => console.log("saved, response:", d)).then(
      () => setLoading(false)
    );
  };

  return (
    <>
      <textarea
        style={{
          width: "80%",
          height: "80%",
          boxSizing: "border-box",
          overflow: "scroll",
        }}
        rows={30}
        value={editVal}
        onChange={(e) => {
          return setEditVal(e.currentTarget.value);
        }}
      />

      {!loading && (
        <button
          type="button"
          className="button-10"
          role="button"
          onClick={saveItem}
          disabled={loading ? true : false}
        >
          Save
        </button>
      )}
      {loading && (
        <p
          className="flash"
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-end",
            alignSelf: "end",
            margin: "5px",
            marginLeft: "auto",
          }}
        >
          ...
        </p>
      )}
    </>
  );
}
