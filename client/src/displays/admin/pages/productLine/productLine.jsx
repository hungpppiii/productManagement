import "./productLine.css";
import Sidebar from "../sidebar/sidebar";
import Navbar from "../../../../components/navbar/navbar";

import Table from "../../../../components/table/table";
import { useState, useEffect } from "react";
import axios from "axios";
import { GridActionsCellItem, GridRowModes } from "@mui/x-data-grid";
import SaveIcon from "@mui/icons-material/Save";

export default function ProductLine() {
  const height = 631;
  const [rows, setRows] = useState([]);
  // const axiosOptions = {
  //   headers: {
  //     "x-access-token": token,
  //   },
  // };

  // console.log(rows);
  useEffect(() => {
    const getAllProductLine = async () => {
      try {
        console.log("fetch");
        const res = await axios.get(
          "http://localhost:8080/api/productLine/getAllProductLine",
          {
            headers: {
              Authorization:
                "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhY2NvdW50SWQiOjgsImlhdCI6MTY4MTk5ODY1Mn0.Jp6tPrCmpuaR51LaToHHag_vJsvmLv-3iX_A86RK3z4",
            },
          }
        );
        console.log(res.data);
        setRows(res.data);
      } catch (error) {
        console.log("loi");
        console.log(error);
      }
    };
    getAllProductLine();
  }, []);

  const columns_ = [
    { headerName: "Id", field: "id", width: 250, editable: true },
    { headerName: "Name", field: "name", width: 120, editable: true },
    { headerName: "Size", field: "size", width: 200, editable: true },
    { headerName: "Price", field: "price", width: 120, editable: true },
    { headerName: "Seats", field: "seats", width: 120, editable: true },
    { headerName: "Engine", field: "engine", width: 120, editable: true },
    { headerName: "Xylanh", field: "xylanh", width: 120, editable: true },
    { headerName: "Hp", field: "hp", width: 120, editable: true },
  ];

  const handleClick = (id) => () => {
    console.log(id);
    // setRows(rows.filter((row) => row.id !== id));
  };
  const handleClickother = (id) => () => {
    console.log(id);
    // setRows(rows.filter((row) => row.id !== id));
  };
  const [rowModesModel, setRowModesModel] = useState({});

  const columns = [
    { headerName: "Id", field: "id", width: 20, editable: true },
    { headerName: "Name", field: "name", width: 275, editable: true },
    { headerName: "Price", field: "price", width: 120, editable: true },
    {
      headerName: "warrantyPeriod",
      field: "warrantyPeriod",
      width: 120,
      editable: true,
    },
    {
      headerName: "Description",
      field: "description",
      width: 40,
      editable: true,
    },
    { headerName: "createdAt", field: "createdAt", width: 120, editable: true },
    { headerName: "updatedAt", field: "updatedAt", width: 120, editable: true },
    {
      field: "actions",
      type: "actions",
      headerName: "Actions",
      width: 100,
      cellClassName: "actions",
      getActions: ({ id }) => {
        return [
          <GridActionsCellItem
            icon={<SaveIcon />}
            label="Edit"
            className="textPrimary"
            onClick={handleClick(id)}
            color="inherit"
          />,
          <GridActionsCellItem
            icon={<SaveIcon />}
            label="Edit"
            className="textPrimary"
            onClick={handleClickother(id)}
            color="inherit"
          />,
        ];
      },
    },
  ];

  const data = [
    {
      id: 1,
      name: "điện thoại samsung a73",
      price: 10000000,
      warrantyPeriod: 12,
      description: "dòng điện thoại phân khúc tầm trung của samsung",
      createdAt: "2023-04-12T00:00:00.000Z",
      updatedAt: "2023-04-12T00:00:00.000Z",
    },
    {
      id: 2,
      name: "điện thoại samsung s50 ultra",
      price: 25000000,
      warrantyPeriod: 24,
      description: "dòng điện thoại phân khúc cao cấp của samsung",
      createdAt: "2023-04-12T00:00:00.000Z",
      updatedAt: "2023-04-12T00:00:00.000Z",
    },
    {
      id: 3,
      name: "điện thoại xiaomi redmi 10x",
      price: 5700000,
      warrantyPeriod: 12,
      description: "dòng điện thoại giá rẻ hiệu năng mạnh của xiaomi",
      createdAt: "2023-04-12T00:00:00.000Z",
      updatedAt: "2023-04-12T00:00:00.000Z",
    },
    {
      id: 4,
      name: "điện thoại iphone13",
      price: 10000000,
      warrantyPeriod: null,
      description: "dòng điện thoại phân khúc cao của iphone",
      createdAt: "2023-04-16T04:34:00.000Z",
      updatedAt: "2023-04-16T04:44:12.000Z",
    },
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
