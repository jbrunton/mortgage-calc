import { FormattedNumber } from "react-intl";
import { Table, Tbody, Tr, Th, Td } from "@chakra-ui/react";
import { MortgageSummary } from "@entities/mortgages";

type SummaryTableProps = {
  summary: MortgageSummary;
};

export const SummaryTable: React.FC<SummaryTableProps> = ({ summary }) => {
  return (
    <Table>
      <Tbody>
        <Tr>
          <Th p="0">Monthly Repayment</Th>
          <Td data-testid="monthly-repayment">
            <FormattedNumber
              value={summary.monthlyAmount}
              maximumFractionDigits={0}
            />
          </Td>
          <Td></Td>
        </Tr>
        <Tr>
          <Th p="0">Total Repayments</Th>
          <Td data-testid="total-repayments">
            <FormattedNumber
              value={summary.totalRepayment}
              maximumFractionDigits={0}
            />
          </Td>
          <Td></Td>
        </Tr>
        <Tr>
          <Th p="0">Interest</Th>
          <Td data-testid="total-interest">
            <FormattedNumber
              value={summary.totalInterest}
              maximumFractionDigits={0}
            />
          </Td>
          <Td />
        </Tr>
        <Tr>
          <Th p="0">Stamp Duty</Th>
          <Td data-testid="stamp-duty">
            <FormattedNumber
              value={summary.stampDuty}
              maximumFractionDigits={0}
            />
          </Td>
          <Td />
        </Tr>
        <Tr>
          <Th p="0">Total Cost</Th>
          <Td data-testid="total-cost">
            <FormattedNumber
              value={summary.totalCost}
              maximumFractionDigits={0}
            />
          </Td>
          <Td>
            (
            <FormattedNumber
              value={(summary.totalCost / summary.params.loan) * 100}
              maximumFractionDigits={0}
            />
            % of loan value)
          </Td>
        </Tr>
      </Tbody>
    </Table>
  );
};
