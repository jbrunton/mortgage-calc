export type RentParams = {
  monthlyRent: number;
  term: number;
  interestRate: number;
};

export type RentPayment = {
  month: number;
  amount: number;
  cumulativeRent: number;
};

export type RentSummary = {
  params: RentParams;
  payments: RentPayment[];
  finalMonthlyRent: number;
  totalRent: number;
};
