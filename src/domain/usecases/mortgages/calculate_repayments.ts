import {
  MortgageParams,
  MortgageSummary,
  Repayment,
} from "@entities/mortgages";
import { min, sum } from "ramda";

export const calculateRepayments = (
  params: MortgageParams,
): MortgageSummary => {
  const { monthlyAmount, monthlyRate } = calculateMonthlyRepayment(params);

  const { loan, term } = params;

  let remainingPrincipal = loan;
  let month = 0;
  let totalInterest = 0;

  const repayments: Repayment[] = [];

  while (month < term * 12) {
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

  const stampDuty = calculateStampDuty(
    params.propertyValue,
    params.firstTimeBuyer,
  );

  const deposit = params.propertyValue - params.loan;

  return {
    params,
    repayments,
    monthlyAmount,
    totalInterest,
    totalRepayment: loan + totalInterest,
    stampDuty,
    totalCost: totalInterest + stampDuty,
    deposit,
    cashOutlay: stampDuty + deposit,
  };
};

const calculateMonthlyRepayment = ({
  loan,
  rate,
  term,
  interestOnly,
}: MortgageParams) => {
  const monthlyRate = rate / 100 / 12;

  if (interestOnly) {
    const monthlyAmount = loan * monthlyRate;
    return { monthlyAmount, monthlyRate };
  }

  const ln = Math.pow(1 + monthlyRate, term * 12);
  const monthlyAmount = loan / ((1 - 1 / ln) / monthlyRate);
  return { monthlyAmount, monthlyRate };
};

// as of 2023-24
const stampDutyBands = [
  {
    threshold: 250_000,
    rate: 0,
  },
  {
    threshold: 925_000,
    rate: 0.05,
  },
  {
    threshold: 1_500_000,
    rate: 0.1,
  },
  {
    rate: 0.12,
  },
];

const firstTimeBuyerBands = [
  {
    threshold: 425_000,
    rate: 0,
  },
  {
    rate: 0.05,
  },
];

const calculateStampDuty = (
  propertyValue: number,
  firstTimeBuyer: boolean,
): number => {
  const bands =
    firstTimeBuyer && propertyValue <= 625_000
      ? firstTimeBuyerBands
      : stampDutyBands;

  const stampDuty = sum(
    bands.map((band, index) => {
      const prevBand = bands[index - 1];

      const portionStart = prevBand?.threshold ?? 0;
      const portionEnd = band.threshold;

      const portion =
        min(portionEnd ?? propertyValue, propertyValue) -
        min(portionStart, propertyValue);

      return portion * band.rate;
    }),
  );

  return stampDuty;
};
