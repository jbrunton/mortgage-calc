import { MortgageParams, Repayment } from "@entities/mortgages";
import { calculateRepayments } from "./calculate_repayments";

describe("calculateRepayments", () => {
  const params: MortgageParams = {
    loan: 1000,
    rate: 4,
    term: 2,
    propertyValue: 500_000,
    firstTimeBuyer: false,
  };

  it("returns summary statistics", () => {
    const { totalInterest, monthlyAmount, stampDuty, totalCost } =
      calculateRepayments(params);
    expect(totalInterest).toBeCloseTo(42.2);
    expect(monthlyAmount).toBeCloseTo(43.42);
    expect(stampDuty).toBeCloseTo(12500);
    expect(totalCost).toBeCloseTo(12542.2);
  });

  it("returns payments for the term", () => {
    const { repayments } = calculateRepayments(params);
    expect(repayments.length).toEqual(24);
  });

  describe("calculates the cost of loan", () => {
    // checked against https://www.experian.co.uk/consumer/mortgages/calculators/mortgage-calculator.html on 1/1/24
    const examples = [
      {
        loan: 100_000,
        rate: 3.5,
        term: 20,
        monthlyAmount: 580,
        totalInterest: 39_190,
        totalRepayment: 139_190,
      },
      {
        loan: 200_000,
        rate: 4.5,
        term: 25,
        monthlyAmount: 1_112,
        totalInterest: 133_499,
        totalRepayment: 333_499,
      },
      {
        loan: 250_000,
        rate: 5.5,
        term: 30,
        monthlyAmount: 1_419,
        totalInterest: 261_010,
        totalRepayment: 511_010,
      },
    ];

    examples.forEach(
      ({ loan, rate, term, monthlyAmount, totalInterest, totalRepayment }) => {
        test(`cost of ${
          loan / 1000
        }k loan is ${totalInterest} when rate=${rate}, term=${term}`, () => {
          const summary = calculateRepayments({
            propertyValue: 500_000,
            firstTimeBuyer: false,
            loan,
            rate,
            term,
          });
          expect(summary.monthlyAmount).toBeCloseTo(monthlyAmount, 0);
          expect(summary.totalInterest).toBeCloseTo(totalInterest, 0);
          expect(summary.totalRepayment).toBeCloseTo(totalRepayment, 0);
        });
      },
    );
  });

  describe("calculates stamp duty", () => {
    // checked against https://www.moneysavingexpert.com/mortgages/stamp-duty/ on 1/1/24
    const examples = [
      { propertyValue: 250_000, firstTimeBuyer: false, stampDuty: 0 },
      { propertyValue: 500_000, firstTimeBuyer: false, stampDuty: 12_500 },
      { propertyValue: 600_000, firstTimeBuyer: false, stampDuty: 17_500 },
      { propertyValue: 700_000, firstTimeBuyer: false, stampDuty: 22_500 },
      { propertyValue: 1_000_000, firstTimeBuyer: false, stampDuty: 41_250 },
      { propertyValue: 1_500_000, firstTimeBuyer: false, stampDuty: 91_250 },
      { propertyValue: 2_000_000, firstTimeBuyer: false, stampDuty: 151_250 },
      { propertyValue: 250_000, firstTimeBuyer: true, stampDuty: 0 },
      { propertyValue: 500_000, firstTimeBuyer: true, stampDuty: 3_750 },
      { propertyValue: 600_000, firstTimeBuyer: true, stampDuty: 8_750 },
      { propertyValue: 700_000, firstTimeBuyer: true, stampDuty: 22_500 },
    ];

    examples.forEach(({ propertyValue, stampDuty, firstTimeBuyer }) => {
      test(`stamp duty on ${propertyValue} is ${stampDuty} when firstTimeBuyer=${firstTimeBuyer}`, () => {
        expect(
          calculateRepayments({ ...params, propertyValue, firstTimeBuyer })
            .stampDuty,
        ).toEqual(stampDuty);
      });
    });
  });

  it("calculates repayments and interest", () => {
    const { repayments } = calculateRepayments(params);
    const firstRepayments = repayments.slice(0, 3);
    const lastRepayments = repayments.slice(-2);

    assertRepaymentsEqual(firstRepayments, [
      {
        month: 1,
        amount: 43.424922170773044,
        principal: 40.09158883743971,
        interest: 3.3333333333333335,
        remainingPrincipal: 959.9084111625602,
        cumulativeInterest: 3.3333333333333335,
      },
      {
        month: 2,
        amount: 43.424922170773044,
        principal: 40.22522746689784,
        interest: 3.199694703875201,
        remainingPrincipal: 919.6831836956624,
        cumulativeInterest: 6.533028037208535,
      },
      {
        month: 3,
        amount: 43.424922170773044,
        principal: 40.359311558454166,
        interest: 3.0656106123188747,
        remainingPrincipal: 879.3238721372082,
        cumulativeInterest: 9.598638649527409,
      },
    ]);

    assertRepaymentsEqual(lastRepayments, [
      {
        month: 23,
        amount: 43.424922170773044,
        principal: 43.136863780417066,
        interest: 0.28805839035598013,
        remainingPrincipal: 43.28065332637697,
        cumulativeInterest: 42.05386325415697,
      },
      {
        month: 24,
        amount: 43.424922170773044,
        principal: 43.28065332635179,
        interest: 0.1442688444212566,
        remainingPrincipal: 2.518163455533795e-11,
        cumulativeInterest: 42.19813209857823,
      },
    ]);
  });
});

const assertRepaymentsEqual = (
  actualRepayments: Repayment[],
  expectedRepayments: Repayment[],
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
