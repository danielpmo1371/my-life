import React, { ChangeEvent, useState } from "react";

const GenericEditComponent = ({ inputObject }: { inputObject: object }) => {
  const [formData, setFormData] = useState(inputObject);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.currentTarget) return;
    setFormData({ ...formData, [e.currentTarget.name]: e.currentTarget.value });
  };

  const handleSubmit = async () => {
    // Call the update API (stub)
    try {
      await updateAPI(formData);
      //   onUpdate(); // Callback to inform parent component of update
    } catch (error) {
      console.error("Error updating data:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {Object.keys(inputObject).map((key) => (
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
      <button type="button">Update</button>
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
