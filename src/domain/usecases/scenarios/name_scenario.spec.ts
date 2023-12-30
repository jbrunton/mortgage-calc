import { MortgageParams } from "@entities/mortgages";
import { getDefaultScenarioName } from "./name_scenario";

describe("getDefaultScenarioName", () => {
  it("generates a default name", () => {
    const params: MortgageParams = { loan: 150_000, rate: 4, term: 20 };
    expect(getDefaultScenarioName(params)).toEqual("150k, 4%, 20yrs");
  });
});
