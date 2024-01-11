import React, { useState } from "react";
import AdvancedEditView from "./AdvancedEditView";
import "./TabbedEditComponent.css";
import GenericEditComponent from "./GenericEditComponent";
import { Routes } from "../common/types";

const TabbedEditComponent = ({
  originalValue,
  apiEntity,
  onSave,
}: {
  originalValue: any;
  apiEntity: Routes;
  onSave: () => void;
}) => {
  const [activeTab, setActiveTab] = useState("edit");

  const renderTabContent = () => {
    switch (activeTab) {
      case "edit":
        return (
          <GenericEditComponent
            originalValue={originalValue}
            apiEntity={apiEntity}
            onSave={onSave}
          />
        );
      case "advanced":
        return (
          <AdvancedEditView
            originalValue={originalValue}
            apiEntity={apiEntity}
            onSave={onSave}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div>
      <div className="tab-navigation">
        <button
          onClick={() => setActiveTab("edit")}
          className={activeTab === "edit" ? "active" : ""}
        >
          Edit
        </button>
        <button
          onClick={() => setActiveTab("advanced")}
          className={activeTab === "advanced" ? "active" : ""}
        >
          Advanced
        </button>
      </div>
      <div className="tab-content">{renderTabContent()}</div>
    </div>
  );
};

// Placeholder components
const Edit = () => <div>Edit Component Content</div>;

export default TabbedEditComponent;
