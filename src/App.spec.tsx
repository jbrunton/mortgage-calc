import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "./App";

jest.mock("@app/mortgages/components/charts", () => ({
  DebtChart: () => <div>DebtChart</div>,
  MonthlyRepaymentsChart: () => <div>MonthlyRepaymentsChart</div>,
}));

jest.mock("@app/rent/components/charts", () => ({
  RentPaymentsChart: () => <div>RentPaymentsChart</div>,
  CumulativeRentChart: () => <div>CumulativeRentChart</div>,
}));

describe("App", () => {
  it("calculates repayments", async () => {
    const user = userEvent.setup();
    render(<App />);

    const loanInput = screen.getByTestId("loan");
    await user.type(loanInput, "150000", {
      initialSelectionStart: 0,
      initialSelectionEnd: 6,
    });

    const rateInput = screen.getByTestId("rate");
    await user.type(rateInput, "3", {
      initialSelectionStart: 0,
      initialSelectionEnd: 3,
    });

    const termInput = screen.getByTestId("term");
    await user.type(termInput, "25", {
      initialSelectionStart: 0,
      initialSelectionEnd: 2,
    });

    fireEvent.blur(termInput);

    expect(screen.getByTestId("monthly-repayment")).toHaveTextContent("713");
    expect(screen.getByTestId("total-repayments")).toHaveTextContent("213,162");
    expect(screen.getByTestId("total-interest")).toHaveTextContent("63,162");
  });
});
