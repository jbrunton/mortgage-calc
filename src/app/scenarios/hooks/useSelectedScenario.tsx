import { useState } from "react";
import { Params } from "@entities/repayments";
import { Scenario } from "@entities/scenarios";

export const useSelectedScenarios = (currentParams: Params) => {
  const [scenarios, setScenarios] = useState<Scenario[]>(() => {
    const scenarios = localStorage.getItem("scenarios");
    return scenarios ? JSON.parse(scenarios) : [];
  });

  const [selectedScenario, setSelectedScenario] = useState<Scenario>();

  const saveScenario = (description: string | undefined) => {
    if (!currentParams) return;

    const params = currentParams;
    const scenario: Scenario = {
      params,
      description:
        description ??
        `Loan: ${params.loan}, Rate: ${params.rate}, Term: ${params.term}`,
    };

    const updatedScenarios = [...scenarios, scenario];

    setScenarios(updatedScenarios);
    localStorage.setItem("scenarios", JSON.stringify(updatedScenarios));

    setSelectedScenario(scenario);
  };

  const deleteScenario = () => {
    const updatedScenarios = scenarios.filter(
      (scenario) => scenario !== selectedScenario
    );

    setScenarios(updatedScenarios);
    localStorage.setItem("scenarios", JSON.stringify(updatedScenarios));

    setSelectedScenario(undefined);
  };

  return {
    scenarios,
    selectedScenario,
    loadScenario: setSelectedScenario,
    saveScenario,
    deleteScenario,
  };
};
