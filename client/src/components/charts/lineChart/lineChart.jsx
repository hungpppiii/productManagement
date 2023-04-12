import "./lineChart.css";
import React from "react";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const lineChart = ({ title, data }) => {
  return (
    <div className="chart">
      <LineChart
        width={500}
        height={600}
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line
          type="monotone"
          dataKey="Camry"
          stroke="#8884d8"
          activeDot={{ r: 8 }}
        />
        <Line type="monotone" dataKey="Fortuner" stroke="#82ca9d" />
        <Line type="monotone" dataKey="Raize" stroke="#83ca9d" />
        <Line type="monotone" dataKey="Altis" stroke="#82ca9d" />
        <Line type="monotone" dataKey="Vios" stroke="#82ca9d" />
        <Line type="monotone" dataKey="Yaris" stroke="#82ca9d" />
      </LineChart>
      <div>{title}</div>
    </div>
  );
};

export default lineChart;
