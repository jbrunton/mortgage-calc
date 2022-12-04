import { Params, Repayment } from "@entities/repayments";

export type RepaymentsSummary = {
  params: Params;
  repayments: Repayment[];
  monthlyAmount: number;
  totalInterest: number;
  totalRepayment: number;
};

export const calculateRepayments = (params: Params): RepaymentsSummary => {
  const { monthlyAmount, monthlyRate } = calculateMonthlyRepayment(params);

  const { loan } = params;

  let remainingPrincipal = loan;
  let month = 0;
  let totalInterest = 0;

  const repayments: Repayment[] = [];

  while (remainingPrincipal > 0.01) {
    ++month;

    const interest = remainingPrincipal * monthlyRate;
    totalInterest += interest;

    const principal = monthlyAmount - interest;
    remainingPrincipal -= principal;

    repayments.push({
      month,

      amount: monthlyAmount,
      principal,
      interest,

      remainingPrincipal,
      cumulativeInterest: totalInterest,
    });
  }

  return {
    params,
    repayments,
    monthlyAmount,
    totalInterest: totalInterest,
    totalRepayment: loan + totalInterest,
  };
};

const calculateMonthlyRepayment = ({ loan, rate, term }: Params) => {
  const monthlyRate = rate / 100 / 12;
  const ln = Math.pow(1 + monthlyRate, term * 12 - 1);
  const monthlyAmount = loan / ((1 - 1 / ln) / monthlyRate);
  return { monthlyAmount, monthlyRate };
};
