import { vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { SaveScenarioDialog } from "./SaveScenarioDialog";

describe("SaveScenarioDialog", () => {
  const onSubmit = vi.fn();
  const onClose = vi.fn();

  const setup = () => {
    const user = userEvent.setup();
    render(
      <SaveScenarioDialog
        show={true}
        defaultName="Default Name"
        onClose={onClose}
        onSubmit={onSubmit}
      />,
    );
    return { user };
  };

  it("has a Cancel button", async () => {
    const { user } = setup();

    await user.click(screen.getByText("Cancel"));

    expect(onClose).toHaveBeenCalled();
    expect(onSubmit).not.toHaveBeenCalled();
  });

  it("has a Submit button", async () => {
    const { user } = setup();
    const scenarioNameInput = screen.getByPlaceholderText("Scenario Name");

    expect(scenarioNameInput).toHaveValue("Default Name");

    await user.clear(scenarioNameInput);
    await user.type(scenarioNameInput, "My Scenario");

    await user.click(screen.getByText("Save"));

    expect(onClose).toHaveBeenCalled();
    expect(onSubmit).toHaveBeenCalledWith("My Scenario");
  });
});
