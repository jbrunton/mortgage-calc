import { vi } from "vitest";
import { MortgageParams } from "@entities/mortgages";
import { Scenario } from "@entities/scenarios";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { IntlProvider } from "react-intl";
import { ScenariosMenu } from "./ScenariosMenu";

describe("ScenariosMenu", () => {
  const currentParams: MortgageParams = {
    loan: 150_000,
    rate: 4,
    term: 20,
    propertyValue: 500_000,
    firstTimeBuyer: false,
    interestOnly: false,
  };

  const myScenario: Scenario = {
    description: "My Scenario",
    params: currentParams,
    summary: { totalInterest: 67_838, monthlyAmount: 911 },
  };

  const scenarios: Scenario[] = [
    myScenario,
    {
      description: "Another Scenario",
      params: { ...currentParams, term: 25 },
      summary: { totalInterest: 87_196, monthlyAmount: 793 },
    },
  ];

  const saveScenario = vi.fn();
  const loadScenario = vi.fn();
  const deleteScenario = vi.fn();

  const setup = (selectedScenario?: Scenario) => {
    const user = userEvent.setup();
    render(
      <IntlProvider locale="en">
        <ScenariosMenu
          currentParams={currentParams}
          scenarios={scenarios}
          selectedScenario={selectedScenario}
          saveScenario={saveScenario}
          loadScenario={loadScenario}
          deleteScenario={deleteScenario}
        />
      </IntlProvider>,
    );
    return { user };
  };

  it("shows saved scenarios", async () => {
    const { user } = setup();

    await user.click(screen.getByText("Scenarios"));

    expect(screen.getByText("My Scenario")).toBeVisible();
    expect(screen.getByText("Another Scenario")).toBeVisible();
  });

  it("shows scenario details", async () => {
    const { user } = setup();

    await user.click(screen.getByText("Scenarios"));

    const scenario = screen.getByText("My Scenario").closest("div");
    expect(scenario).toHaveTextContent("Loan: 150,000 · Rate: 4 · Term: 20");
    expect(scenario).toHaveTextContent(
      "Monthly Repayment: 911 · Total Interest: ",
    );
  });

  it("selects a clicked scenario", async () => {
    const { user } = setup();

    await user.click(screen.getByText("Scenarios"));
    await user.click(screen.getByText("My Scenario"));

    expect(loadScenario).toHaveBeenCalledWith(myScenario);
  });

  describe("when a scenario is selected", () => {
    it("shows the scenario name", () => {
      setup(myScenario);
      expect(screen.getByText("Scenario: My Scenario")).toBeVisible();
    });

    it("lets the user delete the scenario", async () => {
      const { user } = setup(myScenario);

      // open dialog
      await user.click(screen.getByText("Delete Scenario"));

      // confirm delete
      await user.click(screen.getByText("Delete"));

      expect(deleteScenario).toHaveBeenCalled();
    });
  });

  describe("when no scenario is selected", () => {
    it("lets the user save the scenario", async () => {
      const { user } = setup();
      const expectedScenarioName =
        "Mortgage: 150k, 4%, 20yrs, 500k property, next home";

      // open dialog
      await user.click(screen.getByText("Save Scenario"));

      expect(screen.getByPlaceholderText("Scenario Name")).toHaveValue(
        expectedScenarioName,
      );

      // confirm save
      await user.click(screen.getByText("Save"));

      expect(saveScenario).toHaveBeenCalledWith(expectedScenarioName);
    });
  });
});
