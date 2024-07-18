import React from "react";
import { Chart } from "react-google-charts";

const Charts = () => {
  const barChartData = [
    ["Year", "Sales", "Purchase", "Profit"],
    ["2020", 1000, 400, 200],
    ["2021", 1170, 460, 250],
    ["2022", 660, 1120, 300],
    ["2023", 1030, 540, 350],
  ];

  const barChartOptions = {
    chart: {
      title: "Company Performance",
      subtitle: "Sales, Expenses, and Profit: 2020-2023",
    },
  };
  const columnChartData = [
    ["Element", "Density", { role: "style" }],
    ["Copper", 8.94, "#b87333"], // RGB value
    ["Silver", 10.49, "silver"], // English color name
    ["Gold", 19.3, "gold"],
    ["Platinum", 21.45, "color: #e5e4e2"], // CSS-style declaration
  ];

  const bieChartData = [
    ["Task", "Hours per Day"],
    ["Sales", 11],
    ["Purchase", 2],
    ["Orders", 2],
    ["Delivery", 2],
    ["Return", 7],
  ];
  const bieChartOptions = {
    title: "My Daily Activities",
    pieHole: 0.4,
    is3D: false,
  };

  const lineChartData = [
    ["x", "Sales", "Purchase"],
    [0, 0, 0],
    [1, 10, 5],
    [2, 23, 15],
    [3, 17, 9],
    [4, 18, 10],
    [5, 9, 5],
    [6, 11, 3],
    [7, 27, 19],
  ];

  const lineChartOptions = {
    hAxis: {
      title: "Time",
    },
    vAxis: {
      title: "Popularity",
    },
    series: {
      1: { curveType: "function" },
    },
  };
  return (
    <>
      <div className="flex flex-wrap gap-3 items-center justify-evenly ">
        <div className=" border px-1 py-1 rounded-sm">
          <Chart
            chartType="Bar"
            width="100%"
            height="250px"
            data={barChartData}
            options={barChartOptions}
          />
        </div>
        <div className=" border px-1 py-1 rounded-sm">
          <Chart
            chartType="PieChart"
            width="100%"
            height="250px"
            data={bieChartData}
            options={bieChartOptions}
          />
        </div>
        <div className=" border px-1 py-1 rounded-sm ">
          <Chart
            chartType="ColumnChart"
            width="100%"
            height="250px"
            data={columnChartData}
          />
        </div>
      </div>

      <div className="my-4 mx-4 border rounded-md  ">
        <Chart
          chartType="LineChart"
          width="100%"
          height="300px"
          data={lineChartData}
          options={lineChartOptions}
        />
      </div>
    </>
  );
};

export default Charts;
