export type MortgageParams = {
  propertyValue: number;
  firstTimeBuyer: boolean;
  interestOnly: boolean;
  loan: number;
  rate: number;
  term: number;
};

export type Repayment = {
  month: number;

  amount: number;
  interest: number;
  principal: number;

  remainingPrincipal: number;
  cumulativeInterest: number;
};

export type MortgageSummary = {
  params: MortgageParams;
  repayments: Repayment[];
  monthlyAmount: number;
  totalInterest: number;
  totalRepayment: number;
  totalCost: number;
  cashOutlay: number;
  deposit: number;
  stampDuty: number;
};
