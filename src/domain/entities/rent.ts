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
