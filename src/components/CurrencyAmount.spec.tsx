import { render, screen } from "@testing-library/react";
import { IntlProvider } from "react-intl";
import { CurrencyAmount } from "./CurrencyAmount";

describe("CurrencyAmount", () => {
  const renderAmount = (amount: number) =>
    render(
      <IntlProvider locale={"en"}>
        <span data-testid="amount">
          <CurrencyAmount amount={amount} />
        </span>
      </IntlProvider>,
    );

  it("formats currency values", () => {
    renderAmount(150000);
    expect(screen.getByTestId("amount")).toHaveTextContent("150,000");
  });

  it("formats to 0 significant figures", () => {
    renderAmount(99.9);
    expect(screen.getByTestId("amount")).toHaveTextContent("100");
  });
});
