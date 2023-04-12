import React from "react";
import "./statistical.css";
import Sidebar from "../Sidebar/sidebar";
import NavBar from "../../../../components/navbar/navbar";
import LineChart from "../../../../components/charts/lineChart/lineChart";

import { useEffect, useState } from "react";

const Statistical = () => {
  const quarter = "Thống kê theo quý năm 2022";
  const year = "Thống kê theo năm";

  const dataQuarter = [
    {
      name: "Quý 1",
      Vios: 50,
      Fortuner: 100,
      Raize: 150,
      Altis: 125,
      Camry: 400,
      Yaris: 200,
    },
    {
      name: "Quý 2",
      Vios: 75,
      Fortuner: 115,
      Raize: 155,
      Altis: 140,
      Camry: 385,
      Yaris: 210,
    },
    {
      name: "Quý 3",
      Vios: 100,
      Fortuner: 130,
      Raize: 150,
      Altis: 120,
      Camry: 400,
      Yaris: 220,
    },
    {
      name: "Quý 4",
      Vios: 110,
      Fortuner: 135,
      Raize: 175,
      Altis: 100,
      Camry: 300,
      Yaris: 200,
    },
  ];

  const dataYear = [
    {
      name: "2018",
      Vios: 100,
      Fortuner: 200,
      Raize: 150,
      Altis: 500,
      Camry: 600,
      Yaris: 450,
    },
    {
      name: "2019",
      Vios: 150,
      Fortuner: 210,
      Raize: 170,
      Altis: 450,
      Camry: 550,
      Yaris: 400,
    },
    {
      name: "2020",
      Vios: 160,
      Fortuner: 220,
      Raize: 170,
      Altis: 500,
      Camry: 600,
      Yaris: 450,
    },
    {
      name: "2021",
      Vios: 165,
      Fortuner: 225,
      Raize: 155,
      Altis: 525,
      Camry: 620,
      Yaris: 455,
    },
    {
      name: "2022",
      Vios: 200,
      Fortuner: 170,
      Raize: 200,
      Altis: 515,
      Camry: 610,
      Yaris: 450,
    },
  ];
  return (
    <div className="statistical">
      <Sidebar />
      <div className="wrapper">
        <NavBar />
        <div className="mainStatistical">
          <LineChart {...{ title: quarter, data: dataQuarter }} />
          <LineChart {...{ title: year, data: dataYear }} />
        </div>
      </div>
    </div>
  );
};

export default Statistical;
