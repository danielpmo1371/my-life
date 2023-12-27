import React, { useState } from "react";
import AdvancedEditView from "./AdvancedEditView";
import "./TabbedEditComponent.css";
import GenericEditComponent from "./GenericEditComponent";

const TabbedEditComponent = ({
  originalValue,
  apiEntity,
}: {
  originalValue: any;
  apiEntity: string;
}) => {
  const [activeTab, setActiveTab] = useState("edit");

  const renderTabContent = () => {
    switch (activeTab) {
      case "edit":
        return <GenericEditComponent inputObject={originalValue} />;
      case "advanced":
        return (
          <AdvancedEditView
            originalValue={originalValue}
            apiEntity={apiEntity}
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
