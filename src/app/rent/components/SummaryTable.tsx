import { FormattedNumber } from "react-intl";
import { Table, Tbody, Tr, Th, Td } from "@chakra-ui/react";
import { RentSummary } from "@usecases/rent/calculate_rent";

type SummaryTableProps = {
  summary: RentSummary;
};

export const SummaryTable: React.FC<SummaryTableProps> = ({ summary }) => (
  <Table>
    <Tbody>
      <Tr>
        <Th p="0">Final Monthly Rent</Th>
        <Td data-testid="monthly-rent">
          <FormattedNumber
            value={summary.finalMonthlyRent}
            maximumFractionDigits={0}
          />
        </Td>
        <Td></Td>
      </Tr>
      <Tr>
        <Th p="0">Total Payments</Th>
        <Td data-testid="total-payments">
          <FormattedNumber
            value={summary.totalRent}
            maximumFractionDigits={0}
          />
        </Td>
        <Td></Td>
      </Tr>
      <Tr>
        <Th p="0">Interest Rate</Th>
        <Td data-testid="interest-rate">
          <FormattedNumber
            value={summary.params.interestRate}
            maximumFractionDigits={0}
          />
        </Td>
        <Td></Td>
      </Tr>
    </Tbody>
  </Table>
);
