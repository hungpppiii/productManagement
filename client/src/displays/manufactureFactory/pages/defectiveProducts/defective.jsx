import "./defective.css";
import Sidebar from "../sidebar/sidebar";
import Navbar from "../../../../components/navbar/navbar";
import Table from "../../../../components/table/table";


import Looks3Icon from '@mui/icons-material/Looks3';
import Looks4Icon from '@mui/icons-material/Looks4';
import Looks5Icon from '@mui/icons-material/Looks5';
import Looks2Icon from '@mui/icons-material/LooksTwo';
import Looks1Icon from '@mui/icons-material/LooksOne';
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Close";
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import AutoFixHighIcon from '@mui/icons-material/AutoFixHigh';


import { GridActionsCellItem, GridRowModes } from "@mui/x-data-grid";

import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
export default function Warehouse() {
    const height = 631;
    const [rowModesModel, setRowModesModel] = React.useState({});
    const [rows, setRows] = useState([]);
    useEffect(() => {
      const getAllProduct = async () => {
        try {
          const res = await axios.post("http://localhost:8000/api/toyProduct/getDefectiveProduct",JSON.parse(localStorage.user));
          setRows(res.data);
        } catch (error) {
          console.log(error);
        }
      };
      getAllProduct();
    }, []);

    if(rows !== null){

      for(var i = 0; i < rows.length; i++){
        rows[i].name = rows[i].idProductLine.name
      }
      }
      if(rows !== null){

        for(var i = 0; i < rows.length; i++){
          rows[i].id = rows[i]._id
        }
        }

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
    const handleDelClick = (id) => () => {
      var index = 0;
      for(let i = 0; i < rows.length; i++){
          if(rows[i]._id == id){
              index = i
      }
      console.log("http://localhost:8000/api/toyProduct/"+ rows[index]._id)
      }

      var update = axios.delete("http://localhost:8000/api/toyProduct/"+ rows[index]._id);
      setRows(rows.filter((row) => row.id !== id));
  }
    const columns = [
      { title: "id", field: "id", width: 300, editable: false },
      { title: "name", field: "name", width: 120, editable: false },
      { title: "status", field: "status", width: 210, editable: false },
      {
        field: "actions",
        type: "actions",
        headerName: "Actions",
        width: 300,
        cellClassName: "actions",
        getActions: ({ id }) => {
          const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;
          return [
            <GridActionsCellItem
              icon={<AutoFixHighIcon />}
              label="Add"
              className="textPrimary"
              onClick={handleDelClick(id)}
              color="inherit"
            />,
            <GridActionsCellItem
              icon={<DeleteForeverIcon />}
              label="Add"
              className="textPrimary"
              onClick={handleDelClick(id)}
              color="inherit"
            />,
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
  