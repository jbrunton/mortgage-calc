import { InputParams, isMortgageParams } from "@entities/inputs";

export const getDefaultScenarioName = (params: InputParams): string => {
  return isMortgageParams(params)
    ? `Mortgage: ${params.loan / 1000}k, ${params.rate}%, ${params.term}yrs`
    : `Rent: ${params.monthlyRent}/m, ${params.interestRate}%, ${params.term}yrs`;
};
