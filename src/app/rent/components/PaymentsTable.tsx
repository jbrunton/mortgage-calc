import React from "react";
import { Table, Thead, Tbody, Tr, Th, Td, chakra } from "@chakra-ui/react";
import { CurrencyAmount } from "@components/CurrencyAmount";
import { RentPayment } from "@entities/rent";

type RentPaymentsTableProps = {
  payments: RentPayment[];
};

const StickyTh = chakra(Th, {
  baseStyle: {
    position: "sticky",
    top: "-0.5rem",
    backgroundColor: "#fff",
  },
});

export const RentPaymentsTable: React.FC<RentPaymentsTableProps> = ({
  payments,
}) => (
  <Table variant="striped">
    <Thead>
      <Tr>
        <StickyTh>Month</StickyTh>

        <StickyTh textAlign="right">Amount</StickyTh>
        <StickyTh textAlign="right">Cumulative Amount</StickyTh>
      </Tr>
    </Thead>
    <Tbody>
      {payments.map((row) => (
        <Tr key={row.month}>
          <Td>{row.month}</Td>

          <Td textAlign="right">
            <CurrencyAmount amount={row.amount} />
          </Td>
          <Td textAlign="right">
            <CurrencyAmount amount={row.cumulativeRent} />
          </Td>
        </Tr>
      ))}
    </Tbody>
  </Table>
);
