import { MortgageParams, MortgageSummary } from "./mortgages";
import { RentParams, RentSummary } from "./rent";
import { isMortgageParams } from "./inputs";

export type MortgageScenario = {
  params: MortgageParams;
  summary: Pick<MortgageSummary, "monthlyAmount" | "totalInterest">;
  description: string;
};

export type RentScenario = {
  params: RentParams;
  summary: Pick<RentSummary, "totalRent" | "finalMonthlyRent">;
  description: string;
};

export type Scenario = MortgageScenario | RentScenario;

export const isMortgageScenario = (
  scenario: Scenario,
): scenario is MortgageScenario => {
  return isMortgageParams(scenario.params);
};
