import React, { ChangeEvent, useState } from "react";
import "./GenericEditComponent.css";
import { getApiCrudClientFor } from "@/next_cst/crudClient";
import { Routes } from "../common/types";

const GenericEditComponent = ({
  originalValue,
  apiEntity,
}: {
  originalValue: any;
  apiEntity: Routes;
}) => {
  const { saveItem } = getApiCrudClientFor(apiEntity, true);
  const [formData, setFormData] = useState(originalValue);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.currentTarget) return;
    setFormData({ ...formData, [e.currentTarget.name]: e.currentTarget.value });
  };

  const handleSubmit = async () => {
    // Call the update API (stub)
    try {
      setLoading(true);
      console.log("saving");
      saveItem(formData).then(() => setLoading(false));
      //   onUpdate(); // Callback to inform parent component of update
    } catch (error) {
      console.error("Error updating data:", error);
    }
  };

  return (
    <form className="generic-edit-form">
      {Object.keys(originalValue).map((key) => (
        <div key={key}>
          <label>
            {key.charAt(0).toUpperCase() + key.slice(1)}:
            <input
              type="text"
              name={key}
              value={(formData as any)[key] || ""}
              onChange={handleChange}
            />
          </label>
        </div>
      ))}

      {!loading && (
        <button type="button" onClick={handleSubmit}>
          Update
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
    </form>
  );
};

// API update function stub
const updateAPI = async (data: any) => {
  console.log("Updating data:", data);
  // Replace with actual API call
  return new Promise((resolve) => setTimeout(resolve, 1000));
};

export default GenericEditComponent;
