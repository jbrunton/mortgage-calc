import { vi } from "vitest";
import { RouterProvider, createMemoryHistory } from "@tanstack/react-router";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { buildRouter } from "../router";
import { IntlProvider } from "react-intl";
import { ChakraProvider } from "@chakra-ui/react";

vi.mock("@app/mortgages/components/charts", () => ({
  DebtChart: () => <div>DebtChart</div>,
  MonthlyRepaymentsChart: () => <div>MonthlyRepaymentsChart</div>,
}));

vi.mock("@app/rent/components/charts", () => ({
  RentPaymentsChart: () => <div>RentPaymentsChart</div>,
  CumulativeRentChart: () => <div>CumulativeRentChart</div>,
}));

describe("App", () => {
  it("calculates repayments", async () => {
    const user = userEvent.setup();
    const router = buildRouter(
      createMemoryHistory({
        initialEntries: ["/"],
      }),
    );
    render(
      <IntlProvider locale={"en"}>
        <ChakraProvider>
          <RouterProvider router={router} />
        </ChakraProvider>
      </IntlProvider>,
    );

    await waitFor(() => {
      expect(screen.getByText("Mortgage Calculator")).toBeVisible();
    });

    const loanInput = screen.getByTestId("loan");
    await user.type(loanInput, "150000", {
      initialSelectionStart: 0,
      initialSelectionEnd: 6,
    });

    const propertyValueInput = screen.getByTestId("property-value");
    await user.type(propertyValueInput, "600000", {
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

    expect(screen.getByTestId("deposit")).toHaveValue(450_000);
    expect(screen.getByTestId("monthly-repayment")).toHaveTextContent("711");
    expect(screen.getByTestId("total-repayments")).toHaveTextContent("213,395");
    expect(screen.getByTestId("total-interest")).toHaveTextContent("63,395");
    expect(screen.getByTestId("cash-outlay")).toHaveTextContent("467,500");
  });
});
