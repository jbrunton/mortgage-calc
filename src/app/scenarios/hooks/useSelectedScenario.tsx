import { useState } from "react";
import { MortgageScenario, RentScenario, Scenario } from "@entities/scenarios";
import { isMortgageParams } from "@entities/inputs";

type MortgageScenarioDefinition = Omit<
  MortgageScenario,
  "description" | "summary"
> &
  Partial<Pick<MortgageScenario, "summary">>;
type RentScenatioDefinition = Omit<RentScenario, "description" | "summary"> &
  Partial<Pick<RentScenario, "summary">>;
type ScenarioDefinition = MortgageScenarioDefinition | RentScenatioDefinition;

const isMortgageScenarioDefinition = (
  definition: ScenarioDefinition,
): definition is MortgageScenarioDefinition => {
  return isMortgageParams(definition.params);
};

export const useSelectedScenarios = (currentScenario?: ScenarioDefinition) => {
  const [scenarios, setScenarios] = useState<Scenario[]>(() => {
    const scenarios = localStorage.getItem("scenarios");
    return scenarios ? JSON.parse(scenarios) : [];
  });

  const [selectedScenario, setSelectedScenario] = useState<Scenario>();

  const saveScenario = (description: string | undefined) => {
    if (!currentScenario?.summary) {
      return;
    }

    if (isMortgageScenarioDefinition(currentScenario)) {
      const { monthlyAmount, totalInterest } = currentScenario.summary;
      const params = currentScenario.params;

      const scenario: MortgageScenario = {
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
    } else {
      const { totalRent, finalMonthlyRent } = currentScenario.summary;
      const params = currentScenario.params;

      const scenario: RentScenario = {
        params,
        summary: { totalRent, finalMonthlyRent },
        description:
          description ??
          `Monthly Rent: ${params.monthlyRent}, Interest Rate: ${params.interestRate}, Term: ${params.term}`,
      };

      const updatedScenarios = [...scenarios, scenario];

      setScenarios(updatedScenarios);
      localStorage.setItem("scenarios", JSON.stringify(updatedScenarios));
      setSelectedScenario(scenario);
    }
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
