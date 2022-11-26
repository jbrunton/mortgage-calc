import { calculateRepayments, Repayment } from ".";

describe("calculateRepayments", () => {
  const params = { loan: 1000, rate: 4, term: 2 };

  it("returns the total cost", () => {
    const { totalCost } = calculateRepayments(params);
    expect(totalCost).toBeCloseTo(40.49);
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
        monthlyRepayment: 45.24,
        monthlyInterest: 3.33,
        cumulativeInterest: 3.33,
        principal: 958.09,
      },
      {
        month: 2,
        monthlyRepayment: 45.24,
        monthlyInterest: 3.19,
        cumulativeInterest: 6.53,
        principal: 916.05,
      },
      {
        month: 3,
        monthlyRepayment: 45.24,
        monthlyInterest: 3.05,
        cumulativeInterest: 9.58,
        principal: 873.86,
      },
    ]);

    assertRepaymentsEqual(lastRepayments, [
      {
        month: 22,
        monthlyRepayment: 45.24,
        monthlyInterest: 0.30,
        cumulativeInterest: 40.34,
        principal: 45.09,
      },
      {
        month: 23,
        monthlyRepayment: 45.24,
        monthlyInterest: 0.15,
        cumulativeInterest: 40.49,
        principal: 0,
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
    expect(actual.monthlyRepayment).toBeCloseTo(expected.monthlyRepayment);
    expect(actual.monthlyInterest).toBeCloseTo(expected.monthlyInterest);
    expect(actual.cumulativeInterest).toBeCloseTo(expected.cumulativeInterest);
    expect(actual.principal).toBeCloseTo(expected.principal);
  });
};
