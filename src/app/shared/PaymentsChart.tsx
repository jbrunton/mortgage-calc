import { AspectRatio } from "@chakra-ui/react";
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
  ChartData,
  ChartOptions,
} from "chart.js";
import React from "react";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
);

type PaymentsChartProps = {
  title: string;
  data: ChartData<"line", number[]>;
};

export const PaymentsChart: React.FC<PaymentsChartProps> = ({
  title,
  data,
}) => {
  const options: ChartOptions<"line"> = {
    maintainAspectRatio: false,
    plugins: {
      title: {
        display: true,
        text: title,
      },
      tooltip: {
        mode: "index",
        intersect: false,
        bodyAlign: "right",
        callbacks: {
          title(items) {
            const item = items[0];
            const year = Math.floor(item.dataIndex / 12) + 1;
            const month = (item.dataIndex % 12) + 1;
            return `Year ${year} month ${month}`;
          },
          label(ctx) {
            return Math.round(ctx.raw as number).toLocaleString();
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
  return (
    <AspectRatio ratio={1.2} width={"100%"}>
      <Line options={options} data={data} />
    </AspectRatio>
  );
};
