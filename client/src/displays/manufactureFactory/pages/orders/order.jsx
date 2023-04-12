import Sidebar from "../sidebar/sidebar";
import Navbar from "../../../../components/navbar/navbar";
import Table from "../../../../components/table/table";

import "./order.css";
import Looks3Icon from '@mui/icons-material/Looks3';
import Looks4Icon from '@mui/icons-material/Looks4';
import Looks5Icon from '@mui/icons-material/Looks5';
import Looks2Icon from '@mui/icons-material/LooksTwo';
import Looks1Icon from '@mui/icons-material/LooksOne';
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Close";
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';


import { GridActionsCellItem, GridRowModes } from "@mui/x-data-grid";

import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
const Order = () => {
  const height = 631;
  const [rowModesModel, setRowModesModel] = React.useState({});
  const [rows, setRows] = useState([]);
  useEffect(() => {
    const getAllProduct = async () => {
      try {
        const res = await axios.post("http://localhost:8000/api/order/getInLocation",JSON.parse(localStorage.user));
        setRows(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getAllProduct();
  }, []);

  // if(rows !== null){

  //   for(var i = 0; i < rows.length; i++){
  //     rows[i].ProductLine = rows[i].idProductLine.name
  //   }
  //   }
    if(rows !== null){

      for(var i = 0; i < rows.length; i++){
        rows[i].Distributor = rows[i].idDistributor.name
      }
      }
    if(rows !== null){

      for(var i = 0; i < rows.length; i++){
        rows[i].id = rows[i]._id
      }
      }
      const Dis =0
  console.log(rows)
  const handleDelClick = (id) => () => {
    console.log(rowModesModel);
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
  };

  const handleDeleteClick = (id) => () => {
    console.log(id);
    setRows(rows.filter((row) => row.id !== id));
  };

  const handleCancelClick = (id) => () => {
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true },
    });

    const editedRow = rows.find((row) => row.id === id);
    if (editedRow.isNew) {
        setRows(rows.filter((row) => row.id !== id));
      }
  };
  const handleDoneClick = (id) => () => {
      var Item ={
          _id: id,
          status:"hoàn thành"
      }
      var update = axios.put("http://localhost:8000/api/order/",Item);
      setRows(rows.filter((row) => row.status = "hoàn thành" ));
  }
  // const handleDeleteClick2 = (id) => () => {
  //     var Item ={
  //         _id: id,
  //         idDistributor: Dis[0]._id,
  //         located:Dis[0]._id
  //     }
  //     var update = axios.put("http://localhost:8000/api/order/",Item);
  //     setRows(rows.filter((row) => row.id !== id));
  // }

  const columns = [
    { title: "id", field: "id", width: 250, editable: false },
    { title: "Distributor", field: "Distributor", width: 100, editable: false },
    { title: "ProductLine", field: "idProductLine", width: 250, editable: false },
    { title: "quantity", field: "quantity", width: 100, editable: false },
    { title: "status", field: "status", width: 160, editable: false },
    {
      field: "actions",
      type: "actions",
      headerName: "Actions",
      width: 100,
      cellClassName: "actions",
      getActions: ({ id }) => {
        const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

        return [
          <GridActionsCellItem
            icon={<DoneAllIcon />}
            label="Done"
            className="textPrimary"
            onClick={handleDoneClick(id)}
            color="inherit"
          />,
          // <GridActionsCellItem
          //   icon={<DeleteForeverIcon />}
          //   label="Delete"
          //   className="textPrimary"
          //   onClick={handleDeleteClick(id)}
          //   color="inherit"
          // />,
        ];
      },
    },
  ];


  return (
    <div className="products">
      <Sidebar />
      <div className="wrapper">
        <Navbar />
        <Table
          {...{
            columns,
            rows,
            setRows,
            height,

            rowModesModel,
            setRowModesModel,
          }}
        />
      </div>
    </div>
  );
}

export default Order;
