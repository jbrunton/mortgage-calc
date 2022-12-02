import { Scenario } from "@entities/scenarios";
import React, { useState } from "react";
import { ModalDialog } from "../../../components/ModalDialog";

type ScenariosMenuProps = {
  scenarios: Scenario[];
  selectedScenario: Scenario | undefined;
  saveScenario: (name: string | undefined) => void;
  loadScenaio: (scenario: Scenario) => void;
  deleteScenario: () => void;
};

type SaveDialogProps = {
  show: boolean;
  onClose: () => void;
  onSubmit: (description: string) => void;
};

const SaveDialog: React.FC<SaveDialogProps> = ({ show, onClose, onSubmit }) => {
  const [newScenarioName, setNewScenarioName] = useState<string>("");
  return (
    <ModalDialog
      title="Save Scenario"
      show={show}
      submitLabel="Save"
      onClose={onClose}
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

type DeleteDialogProps = {
  show: boolean;
  onClose: () => void;
  onSubmit: () => void;
};

const DeleteDialog: React.FC<DeleteDialogProps> = ({
  show,
  onClose,
  onSubmit,
}) => {
  return (
    <ModalDialog
      title="Delete Scenario"
      show={show}
      submitLabel="Delete"
      onClose={onClose}
      onSubmit={onSubmit}
    >
      <p>Delete scenario?</p>
    </ModalDialog>
  );
};

export const ScenariosMenu: React.FC<ScenariosMenuProps> = ({
  scenarios,
  selectedScenario,
  saveScenario,
  loadScenaio,
  deleteScenario,
}) => {
  const [showSaveDialog, setShowSaveDialog] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  return (
    <>
      <div id="offcanvas-slide" data-uk-offcanvas="flip: true">
        <div className="uk-offcanvas-bar">
          <ul className="uk-nav uk-nav-default">
            <li className="uk-nav-header">Scenarios</li>

            {scenarios.map((scenario, index) => (
              <li
                key={`scenario-${index}`}
                className={
                  scenario === selectedScenario ? "uk-active" : undefined
                }
              >
                <a href="#" onClick={() => loadScenaio(scenario)}>
                  <div>
                    {scenario.description}
                    <div className="uk-nav-subtitle">
                      Loan: {scenario.params.loan} &middot; Rate:{" "}
                      {scenario.params.rate} &middot; Term:{" "}
                      {scenario.params.term}
                    </div>
                  </div>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="uk-flex uk-flex-right uk-flex-between uk-margin-bottom">
        {selectedScenario ? (
          <span className="uk-text-lead">
            Scenario: {selectedScenario.description}
          </span>
        ) : (
          <span></span>
        )}

        <div>
          <ul className="uk-iconnav">
            {selectedScenario ? (
              <li>
                <a href="#" onClick={() => setShowDeleteDialog(true)}>
                  <span uk-icon="icon: trash"></span>Delete Scenario
                </a>
              </li>
            ) : (
              <li>
                <a href="#" onClick={() => setShowSaveDialog(true)}>
                  <span uk-icon="icon: bookmark"></span>Save Scenario
                </a>
              </li>
            )}
            <li>
              <a href="#" data-uk-toggle="target: #offcanvas-slide">
                <span uk-icon="icon: menu"></span>Scenarios
              </a>
            </li>
          </ul>
        </div>
      </div>

      <SaveDialog
        show={showSaveDialog}
        onClose={() => setShowSaveDialog(false)}
        onSubmit={saveScenario}
      />

      <DeleteDialog
        show={showDeleteDialog}
        onClose={() => setShowDeleteDialog(false)}
        onSubmit={deleteScenario}
      />
    </>
  );
};
