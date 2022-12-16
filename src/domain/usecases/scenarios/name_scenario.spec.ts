import { Params } from "@entities/repayments";
import { getDefaultScenarioName } from "./name_scenario";

describe("getDefaultScenarioName", () => {
  it("generates a default name", () => {
    const params: Params = { loan: 150_000, rate: 4, term: 20 };
    expect(getDefaultScenarioName(params)).toEqual("150k, 4%, 20yrs");
  });
});
