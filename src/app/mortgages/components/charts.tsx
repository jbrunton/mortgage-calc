import React from "react";
import * as R from "ramda";
import { Repayment } from "@entities/mortgages";
import { PaymentsChart } from "@app/shared/PaymentsChart";

export const MonthlyRepaymentsChart: React.FC<{ repayments: Repayment[] }> = ({
  repayments,
}) => {
  const principalData = R.pluck("principal", repayments);
  const interestData = R.pluck("interest", repayments);
  const data = {
    labels: R.pluck("month", repayments),
    datasets: [
      {
        label: "Principal",
        data: principalData,
        fill: "origin",
        pointRadius: 0,
        backgroundColor: "rgba(63, 167, 214, 0.5)",
        borderColor: "rgb(63, 167, 214)",
      },
      {
        label: "Interest",
        data: interestData,
        fill: 0,
        pointRadius: 0,
        backgroundColor: "rgba(255, 99, 132, 0.5)",
        borderColor: "rgb(255, 99, 132)",
      },
    ],
  };
  return <PaymentsChart data={data} title="Monthly Repayments" />;
};

export const DebtChart: React.FC<{ repayments: Repayment[] }> = ({
  repayments,
}) => {
  const principalData = R.pluck("remainingPrincipal", repayments);
  const data = {
    labels: R.pluck("month", repayments),
    datasets: [
      {
        label: "Remaining Debt",
        data: principalData,
        fill: "origin",
        pointRadius: 0,
        backgroundColor: "rgba(63, 167, 214, 0.5)",
        borderColor: "rgb(63, 167, 214)",
      },
    ],
  };
  return <PaymentsChart data={data} title="Debt by Month" />;
};
