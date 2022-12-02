import { Repayment } from "@entities/repayments";
import { calculateRepayments } from "./calculate_repayments";

describe("calculateRepayments", () => {
  const params = { loan: 1000, rate: 4, term: 2 };

  it("returns summary statistics", () => {
    const { totalInterest, monthlyAmount } = calculateRepayments(params);
    expect(totalInterest).toBeCloseTo(40.49);
    expect(monthlyAmount).toBeCloseTo(45.24);
  });

  it("returns payments for the term", () => {
    const { repayments } = calculateRepayments(params);
    expect(repayments.length).toEqual(23);
  });

  it("calculates repayments and interest", () => {
    const { repayments } = calculateRepayments(params);
    const firstRepayments = repayments.slice(0, 3);
    const lastRepayments = repayments.slice(-2);

    assertRepaymentsEqual(firstRepayments, [
      {
        month: 1,

        amount: 45.24,
        interest: 3.33,
        principal: 41.91,

        cumulativeInterest: 3.33,
        remainingPrincipal: 958.09,
      },
      {
        month: 2,

        amount: 45.24,
        interest: 3.19,
        principal: 42.04,

        remainingPrincipal: 916.05,
        cumulativeInterest: 6.53,
      },
      {
        month: 3,

        amount: 45.24,
        interest: 3.05,
        principal: 42.19,

        remainingPrincipal: 873.86,
        cumulativeInterest: 9.58,
      },
    ]);

    assertRepaymentsEqual(lastRepayments, [
      {
        month: 22,

        amount: 45.24,
        interest: 0.3,
        principal: 44.94,

        cumulativeInterest: 40.34,
        remainingPrincipal: 45.09,
      },
      {
        month: 23,

        amount: 45.24,
        interest: 0.15,
        principal: 45.09,

        cumulativeInterest: 40.49,
        remainingPrincipal: 0,
      },
    ]);
  });
});

const assertRepaymentsEqual = (
  actualRepayments: Repayment[],
  expectedRepayments: Repayment[]
) => {
  expect(actualRepayments.length).toEqual(expectedRepayments.length);

  actualRepayments.forEach((actual, index) => {
    const expected = expectedRepayments[index];

    expect(actual.month).toEqual(expected.month);

    expect(actual.amount).toBeCloseTo(expected.amount);
    expect(actual.principal).toBeCloseTo(expected.principal);
    expect(actual.interest).toBeCloseTo(expected.interest);

    expect(actual.remainingPrincipal).toBeCloseTo(expected.remainingPrincipal);
    expect(actual.cumulativeInterest).toBeCloseTo(expected.cumulativeInterest);
  });
};
