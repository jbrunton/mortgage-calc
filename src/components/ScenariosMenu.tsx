import React from "react";
import { Scenario } from "../hooks/useSelectedScenario";

type ScenariosMenuProps = {
  scenarios: Scenario[];
  selectedScenario: Scenario | undefined;
  onSaveClick: () => void;
  onLoadClick: (scenario: Scenario) => void;
};

export const ScenariosMenu: React.FC<ScenariosMenuProps> = ({
  scenarios,
  selectedScenario,
  onSaveClick,
  onLoadClick,
}) => {
  return (
    <div className="uk-flex uk-flex-right uk-flex-between uk-margin-bottom">
      {selectedScenario ? (
        <span className="uk-text-lead">
          Scenario: {selectedScenario.description}
        </span>
      ) : (
        <span></span>
      )}

      <div>
        <button onClick={onSaveClick} className="uk-button uk-button-default">
          Save Scenario
        </button>

        <button className="uk-button uk-button-default" type="button">
          Load Scenario
        </button>
        <div data-uk-dropdown="pos: bottom-right">
          <ul className="uk-nav uk-dropdown-nav">
            {scenarios.map((scenario, index) => (
              <li
                key={`scenario-${index}`}
                className={
                  scenario === selectedScenario ? "uk-active" : undefined
                }
              >
                <a href="#" onClick={() => onLoadClick(scenario)}>
                  {scenario.description}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};
