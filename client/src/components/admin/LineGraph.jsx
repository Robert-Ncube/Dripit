import React from "react";
import { useSelector } from "react-redux";
import { Line } from "react-chartjs-2";
import moment from "moment";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const LineGraph = () => {
  const { orderList } = useSelector((state) => state.AdminOrder);

  // Process data to count unique users per month and sum revenue per month
  const metricsByMonth = orderList.reduce((acc, order) => {
    const monthYear = moment(order.createdAt).format("MM-YYYY");
    if (!acc[monthYear]) {
      acc[monthYear] = { uniqueUsers: new Set(), revenue: 0, orderCount: 0 };
    }
    acc[monthYear].uniqueUsers.add(order.userId);
    acc[monthYear].revenue += order.totalAmount;
    acc[monthYear].orderCount += 1;
    return acc;
  }, {});

  // Convert to arrays of metrics
  const labels = Object.keys(metricsByMonth).sort(
    (a, b) => moment(a, "MM-YYYY") - moment(b, "MM-YYYY")
  );
  const uniqueUsers = labels.map(
    (label) => metricsByMonth[label].uniqueUsers.size
  );
  const revenues = labels.map((label) => metricsByMonth[label].revenue);
  const orderCounts = labels.map((label) => metricsByMonth[label].orderCount);

  const data = {
    labels,
    datasets: [
      {
        label: "Unique Users per Month",
        data: uniqueUsers,
        fill: false,
        backgroundColor: "rgba(75, 192, 192, 0.5)",
        borderColor: "rgba(75, 192, 192, 1)",
      },
      {
        label: "Monthly Revenue",
        data: revenues,
        fill: false,
        backgroundColor: "rgba(54, 162, 235, 0.5)",
        borderColor: "rgba(54, 162, 235, 1)",
      },
      {
        label: "Number of Orders per Month",
        data: orderCounts,
        fill: false,
        backgroundColor: "rgba(255, 99, 132, 0.5)",
        borderColor: "rgba(255, 99, 132, 1)",
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Monthly Order Metrics",
      },
    },
  };

  return (
    <div className="w-full h-full">
      <Line data={data} options={options} />
    </div>
  );
};

export default LineGraph;
