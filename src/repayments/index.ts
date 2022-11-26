type Params = {
  loan: number;
  rate: number;
  term: number;
};

export type Repayment = {
  month: number;
  principal: number;
  monthlyRepayment: number;
  monthlyInterest: number;
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
  let principal = loan;
  let month = 0;
  let cumulativeInterest = 0;

  const monthlyRate = rate / 100 / 12;

  const repayments: Repayment[] = [];

  while (principal > 0.01) {
    ++month;

    const remainingTerm = term * 12 - month;

    const ln = Math.pow(1 + monthlyRate, remainingTerm);
    const monthlyRepayment = principal / ((1 - 1 / ln) / monthlyRate);

    const monthlyInterest = principal * monthlyRate;
    cumulativeInterest += monthlyInterest;

    principal -= monthlyRepayment - monthlyInterest;

    repayments.push({
      month,
      principal,
      monthlyRepayment,
      monthlyInterest,
      cumulativeInterest,
    });
  }

  return {
    repayments,
    totalCost: cumulativeInterest,
  };
};
