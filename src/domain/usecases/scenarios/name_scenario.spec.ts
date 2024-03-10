import { MortgageParams } from "@entities/mortgages";
import { getDefaultScenarioName } from "./name_scenario";
import { RentParams } from "@entities/rent";

describe("getDefaultScenarioName", () => {
  it("generates a default name for mortgages", () => {
    const params: MortgageParams = {
      loan: 150_000,
      rate: 4,
      term: 20,
      propertyValue: 500_000,
      firstTimeBuyer: true,
      interestOnly: false,
    };
    expect(getDefaultScenarioName(params)).toEqual(
      "Mortgage: 150k, 4%, 20yrs, 500k property, first home",
    );
  });

  it("generates a default name for interest only mortgages", () => {
    const params: MortgageParams = {
      loan: 150_000,
      rate: 4,
      term: 20,
      propertyValue: 500_000,
      firstTimeBuyer: false,
      interestOnly: true,
    };
    expect(getDefaultScenarioName(params)).toEqual(
      "Mortgage: 150k, 4%, 20yrs, 500k property, next home, interest only",
    );
  });

  it("generates a default name for rent", () => {
    const params: RentParams = { monthlyRent: 1000, interestRate: 2, term: 20 };
    expect(getDefaultScenarioName(params)).toEqual("Rent: 1000/m, 2%, 20yrs");
  });
});
