import { Scenario } from "@entities/scenarios";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { IntlProvider } from "react-intl";
import { ScenariosMenu } from "./ScenariosMenu";

describe("ScenariosMenu", () => {
  const myScenario: Scenario = {
    description: "My Scenario",
    params: { loan: 150_000, rate: 4, term: 20 },
    summary: { totalInterest: 67_838, monthlyAmount: 911 },
  };

  const scenarios: Scenario[] = [
    myScenario,
    {
      description: "Another Scenario",
      params: { loan: 150_000, rate: 4, term: 25 },
      summary: { totalInterest: 87_196, monthlyAmount: 793 },
    },
  ];

  const saveScenario = jest.fn();
  const loadScenario = jest.fn();
  const deleteScenario = jest.fn();

  const setup = (selectedScenario?: Scenario) => {
    const user = userEvent.setup();
    render(
      <IntlProvider locale="en">
        <ScenariosMenu
          scenarios={scenarios}
          selectedScenario={selectedScenario}
          saveScenario={saveScenario}
          loadScenario={loadScenario}
          deleteScenario={deleteScenario}
        />
      </IntlProvider>
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
      "Monthly Repayment: 911 · Total Interest: "
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

      // menu link
      await user.click(screen.getByText("Delete Scenario"));

      // confirm dialog
      await user.click(screen.getByText("Delete"));

      expect(deleteScenario).toHaveBeenCalled();
    });
  });

  describe("when no scenario is selected", () => {
    it("lets the user save the scenario", async () => {
      const { user } = setup();

      // menu link
      await user.click(screen.getByText("Save Scenario"));
      await user.type(
        screen.getByPlaceholderText("Scenario Name"),
        "New Scenario"
      );

      // confirm dialog
      await user.click(screen.getByText("Save"));

      expect(saveScenario).toHaveBeenCalledWith("New Scenario");
    });
  });
});
