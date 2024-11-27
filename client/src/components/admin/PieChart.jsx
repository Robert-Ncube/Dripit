import React from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Title, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Title, Tooltip, Legend);

const PieChart = ({
  productCategoryData,
  title,
  colorScheme,
  legendPosition,
}) => {
  if (!productCategoryData) {
    return <div>Loading...</div>;
  }

  const pieData = {
    labels: productCategoryData?.map((item) => item?.name),
    datasets: [
      {
        label: title,
        data: productCategoryData.map((item) => item?.value),
        backgroundColor: colorScheme,
        hoverBackgroundColor: colorScheme.map((color) =>
          color.replace("0.5", "1")
        ), // Making hover color a bit darker
      },
    ],
  };

  const options = {
    plugins: {
      legend: {
        position: legendPosition || "top",
      },
      title: {
        display: true,
        text: title,
      },
    },
  };

  return (
    <div className="w-full h-full flex items-center justify-center">
      <Pie data={pieData} options={options} />
    </div>
  );
};

export default PieChart;
