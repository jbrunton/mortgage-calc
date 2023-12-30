import { useState } from "react";
import { Params } from "@entities/repayments";
import { Scenario } from "@entities/scenarios";
import { RepaymentsSummary } from "@usecases/repayments/calculate_repayments";

export const useSelectedScenarios = (
  currentParams: Params,
  currentSummary: RepaymentsSummary | undefined,
) => {
  const [scenarios, setScenarios] = useState<Scenario[]>(() => {
    const scenarios = localStorage.getItem("scenarios");
    return scenarios ? JSON.parse(scenarios) : [];
  });

  const [selectedScenario, setSelectedScenario] = useState<Scenario>();

  const saveScenario = (description: string | undefined) => {
    if (!currentSummary) return;

    const params = currentParams;
    const { monthlyAmount, totalInterest } = currentSummary;
    const scenario: Scenario = {
      params,
      summary: { monthlyAmount, totalInterest },
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
      (scenario) => scenario !== selectedScenario,
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
