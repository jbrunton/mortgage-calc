import { RepaymentsSummary } from "@usecases/repayments/calculate_repayments";
import { FormattedNumber } from "react-intl";
import { Table, Tbody, Tr, Th, Td } from "@chakra-ui/react";

type SummaryTableProps = {
  summary: RepaymentsSummary;
};

export const SummaryTable: React.FC<SummaryTableProps> = ({ summary }) => (
  <Table>
    <Tbody>
      <Tr>
        <Th p="0">MonThly Repayment</Th>
        <Td>
          <FormattedNumber
            value={summary.monthlyAmount}
            maximumFractionDigits={0}
          />
        </Td>
        <Td></Td>
      </Tr>
      <Tr>
        <Th p="0">Total Repayments</Th>
        <Td>
          <FormattedNumber
            value={summary.totalRepayment}
            maximumFractionDigits={0}
          />
        </Td>
        <Td></Td>
      </Tr>
      <Tr>
        <Th p="0">Interest</Th>
        <Td>
          <FormattedNumber
            value={summary.totalInterest}
            maximumFractionDigits={0}
          />
        </Td>
        <Td>
          (
          <FormattedNumber
            value={(summary.totalInterest / summary.params.loan) * 100}
            maximumFractionDigits={0}
          />
          % of loan value)
        </Td>
      </Tr>
    </Tbody>
  </Table>
);
