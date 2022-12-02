import { RepaymentsSummary } from "@usecases/repayments/calculate_repayments";
import { Params } from "./repayments";

export type Scenario = {
  params: Params;
  summary: Pick<RepaymentsSummary, "monthlyAmount" | "totalInterest">;
  description: string;
};
