import "./warehouse.css";
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

import { GridActionsCellItem, GridRowModes } from "@mui/x-data-grid";

import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
export default function Warehouse() {
    const height = 631;
    const [rowModesModel, setRowModesModel] = React.useState({});
    const [rows, setRows] = useState([]);
    const [Dis, setDis] = useState([])
    useEffect(() => {
      const getAllProduct = async () => {
        try {
          const res = await axios.post("http://localhost:8000/api/toyProduct/getInLocation",JSON.parse(localStorage.user));
          const res2 = await axios.get("http://localhost:8000/api/account/getAllDistributor")
          setDis(res2.data)
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

    console.log(Dis[0])
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
    const handleChooseClick1 = (id) => () => {
        var Item ={
            _id: id,
            idDistributor: Dis[1]._id,
            located:Dis[1]._id
        }
        var update = axios.put("http://localhost:8000/api/toyProduct/",Item);
        setRows(rows.filter((row) => row.id !== id));
    }
    const handleChooseClick2 = (id) => () => {
        var Item ={
            _id: id,
            idDistributor: Dis[0]._id,
            located:Dis[0]._id
        }
        var update = axios.put("http://localhost:8000/api/toyProduct/",Item);
        setRows(rows.filter((row) => row.id !== id));
    }
    const handleChooseClick3 = (id) => () => {
        var Item ={
            _id: id,
            idDistributor: Dis[2]._id,
            located:Dis[2]._id
        }
        var update = axios.put("http://localhost:8000/api/toyProduct/",Item);
        setRows(rows.filter((row) => row.id !== id));
    }
    const handleChooseClick4 = (id) => () => {
        var Item ={
            _id: id,
            idDistributor: Dis[3]._id,
            located:Dis[3]._id
        }
        var update = axios.put("http://localhost:8000/api/toyProduct/",Item);
        setRows(rows.filter((row) => row.id !== id));
    }
    const handleChooseClick5 = (id) => () => {
        var Item ={
            _id: id,
            idDistributor: Dis[4]._id,
            located:Dis[4]._id
        }
        var update = axios.put("http://localhost:8000/api/toyProduct/",Item);
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
          if (isInEditMode) {
            return [
              <GridActionsCellItem
                icon={<CancelIcon />}
                label="Cancel"
                className="textPrimary"
                onClick={handleCancelClick(id)}
                color="inherit"
              />,
              <GridActionsCellItem
                  icon={<Looks1Icon />}
                  label="Cancel"
                  className="textPrimary"
                  onClick={handleChooseClick1(id)}
                  color="inherit"
                />,
                <GridActionsCellItem
                icon={<Looks2Icon />}
                label="Cancel"
                className="textPrimary"
                onClick={handleChooseClick2(id)}
                color="inherit"
              />,
              <GridActionsCellItem
                icon={<Looks3Icon />}
                label="Cancel"
                className="textPrimary"
                onClick={handleChooseClick3(id)}
                color="inherit"
              />,
              <GridActionsCellItem
                icon={<Looks4Icon />}
                label="Cancel"
                className="textPrimary"
                onClick={handleChooseClick4(id)}
                color="inherit"
              />,
              <GridActionsCellItem
                icon={<Looks5Icon />}
                label="Cancel"
                className="textPrimary"
                onClick={handleChooseClick5(id)}
                color="inherit"
              />,
            ];
          }

          return [
            <GridActionsCellItem
              icon={<LocalShippingIcon />}
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
  