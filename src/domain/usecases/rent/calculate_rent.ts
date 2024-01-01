import { RentParams, RentPayment, RentSummary } from "@entities/rent";

export const calculateRent = (params: RentParams): RentSummary => {
  const payments: RentPayment[] = [];
  let monthlyRent = params.monthlyRent;
  let cumulativeRent = 0;

  for (let month: number = 0; month < params.term * 12; ++month) {
    if (month > 0 && month % 12 === 0) {
      monthlyRent *= 1 + params.interestRate / 100;
    }

    cumulativeRent += monthlyRent;

    payments.push({
      month: month + 1,
      amount: monthlyRent,
      cumulativeRent,
    });
  }

  return {
    params,
    payments,
    finalMonthlyRent: monthlyRent,
    totalRent: cumulativeRent,
  };
};
