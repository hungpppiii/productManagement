import "./productLine.css";
import Sidebar from "../sidebar/sidebar";
import Navbar from "../../../../components/navbar/navbar";

import Table from "../../../../components/table/table";
import { useState, useEffect } from "react";
import axios from "axios";

export default function ProductLine() {
  const height = 631;
  const [rows, setRows] = useState([]);

  useEffect(() => {
    const getAllProductLine = async () => {
      try {
        const res = await axios.get(
          "http://localhost:8000/api/toyProductLine/getAll"
        );
        setRows(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getAllProductLine();
  }, []);

  const columns = [
    { headerName: "Id", field: "_id", width: 250, editable: true },
    { headerName: "Name", field: "name", width: 120, editable: true },
    { headerName: "Size", field: "size", width: 200, editable: true },
    { headerName: "Price", field: "price", width: 120, editable: true },
    { headerName: "Seats", field: "seats", width: 120, editable: true },
    { headerName: "Engine", field: "engine", width: 120, editable: true },
    { headerName: "Xylanh", field: "xylanh", width: 120, editable: true },
    { headerName: "Hp", field: "hp", width: 120, editable: true },
  ];
  return (
    <div className="productLine">
      <Sidebar />
      <div className="wrapper">
        <Navbar />
        <Table {...{ columns, rows, setRows, height }} />
      </div>
    </div>
  );
}
