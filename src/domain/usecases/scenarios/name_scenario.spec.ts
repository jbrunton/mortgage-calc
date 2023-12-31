import { MortgageParams } from "@entities/mortgages";
import { getDefaultScenarioName } from "./name_scenario";
import { RentParams } from "@entities/rent";

describe("getDefaultScenarioName", () => {
  it("generates a default name for mortgages", () => {
    const params: MortgageParams = { loan: 150_000, rate: 4, term: 20 };
    expect(getDefaultScenarioName(params)).toEqual("Mortgage: 150k, 4%, 20yrs");
  });

  it("generates a default name for rent", () => {
    const params: RentParams = { monthlyRent: 1000, interestRate: 2, term: 20 };
    expect(getDefaultScenarioName(params)).toEqual("Rent: 1000/m, 2%, 20yrs");
  });
});
