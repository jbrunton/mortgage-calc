import { useState } from "react";
import { Params } from "../repayments";

export type Scenario = {
  params: Params;
  description: string;
};

export const useSelectedScenarios = (currentParams: Params) => {
  const [scenarios, setScenarios] = useState<Scenario[]>(() => {
    const scenarios = localStorage.getItem("scenarios");
    return scenarios ? JSON.parse(scenarios) : [];
  });

  const [selectedScenario, setSelectedScenario] = useState<Scenario>();

  const saveScenario = () => {
    if (!currentParams) return;

    const params = currentParams;
    const scenario: Scenario = {
      params,
      description: `Loan: ${params.loan}, Rate: ${params.rate}, Term: ${params.term}`,
    };
    const updatedScenarios = [...scenarios, scenario];
    setScenarios(updatedScenarios);
    localStorage.setItem("scenarios", JSON.stringify(updatedScenarios));

    setSelectedScenario(scenario);
  };

  return {
    scenarios,
    selectedScenario,
    loadScenario: setSelectedScenario,
    saveScenario,
  };
};
