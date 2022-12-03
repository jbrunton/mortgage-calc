import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { SaveScenarioDialog } from "./SaveScenarioDialog";

describe("SaveScenarioDialog", () => {
  it("has a Cancel button", async () => {
    const onSubmit = jest.fn();
    const onClose = jest.fn();

    render(
      <SaveScenarioDialog show={true} onClose={onClose} onSubmit={onSubmit} />
    );

    await userEvent.click(screen.getByText("Cancel"));

    expect(onClose).toHaveBeenCalled();
    expect(onSubmit).not.toHaveBeenCalled();
  });

  it("has a Submit button", async () => {
    const onSubmit = jest.fn();
    const onClose = jest.fn();

    render(
      <SaveScenarioDialog show={true} onClose={onClose} onSubmit={onSubmit} />
    );

    await userEvent.type(
      screen.getByPlaceholderText("Scenario Name"),
      "My Scenario"
    );
    await userEvent.click(screen.getByText("Save"));

    expect(onClose).toHaveBeenCalled();
    expect(onSubmit).toHaveBeenCalledWith("My Scenario");
  });
});
