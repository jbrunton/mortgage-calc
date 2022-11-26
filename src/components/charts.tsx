import React from "react";
import * as R from "ramda";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
  ChartOptions,
  ChartData,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { Repayment } from "../repayments";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend
);

type RepaymentsChartProps = {
  title: string;
  data: ChartData<"line", number[]>;
};

const RepaymentsChart: React.FC<RepaymentsChartProps> = ({ title, data }) => {
  const options: ChartOptions<"line"> = {
    maintainAspectRatio: true,
    plugins: {
      title: {
        display: true,
        text: title,
      },
      tooltip: {
        mode: "index",
        intersect: false,
        callbacks: {
          title(items) {
            const item = items[0];
            const year = Math.floor(item.dataIndex / 12) + 1;
            const month = (item.dataIndex % 12) + 1;
            return `Year ${year} month ${month}`;
          },
        },
      },
    },
    responsive: true,
    scales: {
      x: {
        ticks: {
          callback: function (_tick, index) {
            if (index % 12 === 0) {
              return `Year ${index / 12 + 1}`;
            }
            return null;
          },
        },
      },
      y: {
        stacked: true,
        min: 0,
      },
    },
  };
  return <Line options={options} data={data} height={180} />;
};

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
  return <RepaymentsChart data={data} title="Monthly Repayments" />;
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
  return <RepaymentsChart data={data} title="Monthly Repayments" />;
};
