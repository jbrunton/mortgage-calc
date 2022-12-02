import { RepaymentsSummary } from "@usecases/repayments/calculate_repayments";
import { FormattedNumber } from "react-intl";

type SummaryTableProps = {
  summary: RepaymentsSummary;
};

export const SummaryTable: React.FC<SummaryTableProps> = ({ summary }) => (
  <table className="uk-table uk-table-divider">
    <tbody>
      <tr>
        <th>Monthly Repayment</th>
        <td>
          <FormattedNumber
            value={summary.monthlyAmount}
            maximumFractionDigits={0}
          />
        </td>
        <td></td>
      </tr>
      <tr>
        <th>Total Repayments</th>
        <td>
          <FormattedNumber
            value={summary.totalRepayment}
            maximumFractionDigits={0}
          />
        </td>
        <td></td>
      </tr>
      <tr>
        <th>Interest</th>
        <td>
          <FormattedNumber
            value={summary.totalInterest}
            maximumFractionDigits={0}
          />
        </td>
        <td>
          (
          <FormattedNumber
            value={(summary.totalInterest / summary.params.loan) * 100}
            maximumFractionDigits={0}
          />
          % of loan value)
        </td>
      </tr>
    </tbody>
  </table>
);
