export type MortgageParams = {
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
