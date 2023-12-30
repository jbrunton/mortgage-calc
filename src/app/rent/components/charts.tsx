import React from "react";
import * as R from "ramda";
import { RentPayment } from "@entities/rent";
import { PaymentsChart } from "@app/shared/PaymentsChart";

export const RentPaymentsChart: React.FC<{ payments: RentPayment[] }> = ({
  payments,
}) => {
  const amountData = R.pluck("amount", payments);
  const data = {
    labels: R.pluck("month", payments),
    datasets: [
      {
        label: "Amount",
        data: amountData,
        fill: "origin",
        pointRadius: 0,
        backgroundColor: "rgba(63, 167, 214, 0.5)",
        borderColor: "rgb(63, 167, 214)",
      },
    ],
  };
  return <PaymentsChart data={data} title="Rent by Month" />;
};

export const CumulativeRentChart: React.FC<{ payments: RentPayment[] }> = ({
  payments,
}) => {
  const cumulativeData = R.pluck("cumulativeRent", payments);
  const data = {
    labels: R.pluck("month", payments),
    datasets: [
      {
        label: "Total rent",
        data: cumulativeData,
        fill: "origin",
        pointRadius: 0,
        backgroundColor: "rgba(63, 167, 214, 0.5)",
        borderColor: "rgb(63, 167, 214)",
      },
    ],
  };
  return <PaymentsChart data={data} title="Cumulative Rent" />;
};
