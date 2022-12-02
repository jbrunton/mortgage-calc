import React from "react";
import { FormattedNumber } from "react-intl";

type CurrencyAmountProps = {
  amount: number;
};

export const CurrencyAmount: React.FC<CurrencyAmountProps> = ({ amount }) => (
  <FormattedNumber value={amount} maximumFractionDigits={0} />
);
