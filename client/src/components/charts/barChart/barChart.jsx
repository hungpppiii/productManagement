import "./barChart.css";
import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

const barChart = ({ title, data, dataKey }) => {
  return (
    <div className="chart">
      <BarChart
        className="chartMain"
        width={570}
        height={280}
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
        barSize={25}
      >
        <XAxis dataKey="name" scale="point" padding={{ left: 10, right: 10 }} />
        <YAxis />
        <Tooltip />
        <Legend />
        <CartesianGrid strokeDasharray="3 3" />
        <Bar dataKey={dataKey} fill="#8884d8" background={{ fill: "#eee" }} />
      </BarChart>

      <div>{title}</div>
    </div>
  );
};

export default barChart;
