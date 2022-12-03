import { ModalDialog } from "@components/ModalDialog";
import React, { useState } from "react";

type SaveDialogProps = {
  show: boolean;
  onClose: () => void;
  onSubmit: (description: string) => void;
};

export const SaveScenarioDialog: React.FC<SaveDialogProps> = ({
  show,
  onClose,
  onSubmit,
}) => {
  const [newScenarioName, setNewScenarioName] = useState<string>("");
  return (
    <ModalDialog
      title="Save Scenario"
      show={show}
      submitLabel="Save"
      onClose={() => {
        setNewScenarioName("");
        onClose();
      }}
      onSubmit={() => onSubmit(newScenarioName)}
    >
      <div className="uk-margin">
        <input
          className="uk-input"
          type="text"
          placeholder="Scenario Name"
          aria-label="Input"
          value={newScenarioName}
          onChange={(e) => setNewScenarioName(e.target.value)}
        />
      </div>
    </ModalDialog>
  );
};
