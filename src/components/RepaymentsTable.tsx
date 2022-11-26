import React from "react";
import { Repayment } from "../repayments";
import { CurrencyAmount } from "./CurrencyAmount";
import "./RepaymentsTable.css";

type RepaymentsTableProps = {
  repayments: Repayment[];
};

export const RepaymentsTable: React.FC<RepaymentsTableProps> = ({
  repayments,
}) => (
  <table className="repayments-table uk-table uk-table-striped">
    <thead>
      <tr>
        <th>Month</th>

        <th className="uk-text-right">Amount</th>
        <th className="uk-text-right">Principal</th>
        <th className="uk-text-right">Interest</th>

        <th className="uk-text-right">Remaining Principal</th>
        <th className="uk-text-right">Cumulative Interest</th>
      </tr>
    </thead>
    <tbody>
      {repayments.map((row) => (
        <tr key={row.month}>
          <td>{row.month}</td>

          <td className="uk-text-right">
            <CurrencyAmount amount={row.amount} />
          </td>
          <td className="uk-text-right">
            <CurrencyAmount amount={row.principal} />
          </td>
          <td className="uk-text-right">
            <CurrencyAmount amount={row.interest} />
          </td>

          <td className="uk-text-right">
            <CurrencyAmount amount={row.remainingPrincipal} />
          </td>
          <td className="uk-text-right">
            <CurrencyAmount amount={row.cumulativeInterest} />
          </td>
        </tr>
      ))}
    </tbody>
  </table>
);
