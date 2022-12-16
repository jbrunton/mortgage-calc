import { Params } from "@entities/repayments";

export const getDefaultScenarioName = (params: Params): string => {
  return `${params.loan / 1000}k, ${params.rate}%, ${params.term}yrs`;
};
