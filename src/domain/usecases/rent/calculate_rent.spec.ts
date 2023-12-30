import { RentParams, RentPayment } from "@entities/rent";
import { calculateRent } from "./calculate_rent";

describe("calculateRepayments", () => {
  const params: RentParams = { monthlyRent: 1000, interestRate: 2, term: 2 };

  it("returns summary statistics", () => {
    const { totalRent, finalMonthlyRent } = calculateRent(params);
    expect(totalRent).toEqual(24240);
    expect(finalMonthlyRent).toEqual(1020);
  });

  it("returns payments for the term", () => {
    const { payments } = calculateRent(params);
    expect(payments.length).toEqual(24);
  });

  it("calculates rent based on annual interest rate", () => {
    const { payments } = calculateRent(params);
    const firstRepayments = payments.slice(0, 3);
    const lastRepayments = payments.slice(-2);

    assertPaymentsEqual(firstRepayments, [
      { month: 1, amount: 1000, cumulativeRent: 1000 },
      { month: 2, amount: 1000, cumulativeRent: 2000 },
      { month: 3, amount: 1000, cumulativeRent: 3000 },
    ]);

    assertPaymentsEqual(lastRepayments, [
      { month: 23, amount: 1020, cumulativeRent: 23220 },
      { month: 24, amount: 1020, cumulativeRent: 24240 },
    ]);
  });
});

const assertPaymentsEqual = (
  actualPayments: RentPayment[],
  expectedPayments: RentPayment[],
) => {
  expect(actualPayments.length).toEqual(expectedPayments.length);

  actualPayments.forEach((actual, index) => {
    const expected = expectedPayments[index];

    expect(actual.month).toEqual(expected.month);
    expect(actual.amount).toBeCloseTo(expected.amount);
    expect(actual.cumulativeRent).toBeCloseTo(expected.cumulativeRent);
  });
};
