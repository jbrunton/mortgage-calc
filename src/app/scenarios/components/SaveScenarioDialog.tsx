import { ModalDialog } from "@components/ModalDialog";
import React, { useState } from "react";
import { Input } from "@chakra-ui/react";

type SaveDialogProps = {
  show: boolean;
  defaultName: string;
  onClose: () => void;
  onSubmit: (description: string) => void;
};

export const SaveScenarioDialog: React.FC<SaveDialogProps> = ({
  show,
  defaultName,
  onClose,
  onSubmit,
}) => {
  const [newScenarioName, setNewScenarioName] = useState<string>(defaultName);
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
      <Input
        type="text"
        placeholder="Scenario Name"
        aria-label="Input"
        value={newScenarioName}
        onChange={(e) => setNewScenarioName(e.target.value)}
      />
    </ModalDialog>
  );
};
