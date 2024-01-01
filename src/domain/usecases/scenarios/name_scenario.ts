import { InputParams, isMortgageParams } from "@entities/inputs";

export const getDefaultScenarioName = (params: InputParams): string => {
  return isMortgageParams(params)
    ? `Mortgage: ${params.loan / 1000}k, ${params.rate}%, ${params.term}yrs, ${
        params.propertyValue / 1000
      }k property, ${params.firstTimeBuyer ? "first home" : "next home"}`
    : `Rent: ${params.monthlyRent}/m, ${params.interestRate}%, ${params.term}yrs`;
};
