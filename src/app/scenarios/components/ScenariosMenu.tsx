import { CurrencyAmount } from "@components/CurrencyAmount";
import { Scenario } from "@entities/scenarios";
import React, { useState } from "react";
import { DeleteScenarioDialog } from "./DeleteScenarioDialog";
import { SaveScenarioDialog } from "./SaveScenarioDialog";

type ScenariosMenuProps = {
  scenarios: Scenario[];
  selectedScenario: Scenario | undefined;
  saveScenario: (name: string | undefined) => void;
  loadScenaio: (scenario: Scenario) => void;
  deleteScenario: () => void;
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
                      Loan: <CurrencyAmount amount={scenario.params.loan} />{" "}
                      &middot; Rate: {scenario.params.rate} &middot; Term:{" "}
                      {scenario.params.term}
                      <br />
                      Monthly Repayment:{" "}
                      <CurrencyAmount
                        amount={scenario.summary.monthlyAmount}
                      />{" "}
                      &middot; Total Interest:{" "}
                      <CurrencyAmount amount={scenario.summary.totalInterest} />
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

      <SaveScenarioDialog
        show={showSaveDialog}
        onClose={() => setShowSaveDialog(false)}
        onSubmit={saveScenario}
      />

      <DeleteScenarioDialog
        show={showDeleteDialog}
        onClose={() => setShowDeleteDialog(false)}
        onSubmit={deleteScenario}
      />
    </>
  );
};
