type Params = {
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

export type RepaymentsSummary = {
  repayments: Repayment[];
  totalCost: number;
};

export const calculateRepayments = ({
  loan,
  rate,
  term,
}: Params): RepaymentsSummary => {
  let remainingPrincipal = loan;
  let month = 0;
  let cumulativeInterest = 0;

  const monthlyRate = rate / 100 / 12;

  const repayments: Repayment[] = [];

  while (remainingPrincipal > 0.01) {
    ++month;

    const remainingTerm = term * 12 - month;

    const ln = Math.pow(1 + monthlyRate, remainingTerm);
    const amount = remainingPrincipal / ((1 - 1 / ln) / monthlyRate);

    const interest = remainingPrincipal * monthlyRate;
    cumulativeInterest += interest;

    const principal = amount - interest;
    remainingPrincipal -= principal;

    repayments.push({
      month,

      amount,
      principal,
      interest,

      remainingPrincipal,
      cumulativeInterest,
    });
  }

  return {
    repayments,
    totalCost: cumulativeInterest,
  };
};
