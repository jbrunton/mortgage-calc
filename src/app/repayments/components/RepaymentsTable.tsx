import React from "react";
import { Table, Thead, Tbody, Tr, Th, Td, chakra } from "@chakra-ui/react";
import { Repayment } from "@entities/repayments";
import { CurrencyAmount } from "@components/CurrencyAmount";

type RepaymentsTableProps = {
  repayments: Repayment[];
};

const StickyTh = chakra(Th, {
  baseStyle: {
    position: "sticky",
    top: "-0.5rem",
    backgroundColor: "#fff",
  },
});

export const RepaymentsTable: React.FC<RepaymentsTableProps> = ({
  repayments,
}) => (
  <Table variant="striped">
    <Thead>
      <Tr>
        <StickyTh>Month</StickyTh>

        <StickyTh textAlign="right">Amount</StickyTh>
        <StickyTh textAlign="right">Principal</StickyTh>
        <StickyTh textAlign="right">Interest</StickyTh>

        <StickyTh textAlign="right">Remaining Principal</StickyTh>
        <StickyTh textAlign="right">Cumulative Interest</StickyTh>
      </Tr>
    </Thead>
    <Tbody>
      {repayments.map((row) => (
        <Tr key={row.month}>
          <Td>{row.month}</Td>

          <Td textAlign="right">
            <CurrencyAmount amount={row.amount} />
          </Td>
          <Td textAlign="right">
            <CurrencyAmount amount={row.principal} />
          </Td>
          <Td textAlign="right">
            <CurrencyAmount amount={row.interest} />
          </Td>

          <Td textAlign="right">
            <CurrencyAmount amount={row.remainingPrincipal} />
          </Td>
          <Td textAlign="right">
            <CurrencyAmount amount={row.cumulativeInterest} />
          </Td>
        </Tr>
      ))}
    </Tbody>
  </Table>
);
