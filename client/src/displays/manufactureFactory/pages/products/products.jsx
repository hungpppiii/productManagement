import "./products.css";
import Sidebar from "../sidebar/sidebar";
import Navbar from "../../../../components/navbar/navbar";
import Table from "../../../../components/table/table";

import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Close";
import { GridActionsCellItem, GridRowModes } from "@mui/x-data-grid";

import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
export default function Products() {
  const height = 631;
  const [rowModesModel, setRowModesModel] = React.useState({});
  const [rows, setRows] = useState([]);
  const [count, setCount] = useState([]);
  useEffect(() => {
    const getAllProduct = async () => {
      try {
        const res = await axios.get(
          "http://localhost:8000/api/toyProductLine/getAll"
        );
        const res2 = await axios.post(
          "http://localhost:8000/api/toyProduct/countQuantification",
          JSON.parse(localStorage.user)
        );
        setCount(res2.data);
        setRows(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getAllProduct();
  }, []);
  console.log("test", rows);
  let renameKeys = (keysMap, object) =>
    Object.keys(object).reduce(
      (acc, key) => ({
        ...acc,
        ...{ [keysMap[key] || key]: object[key] },
      }),
      {}
    );
  // if (rows.length !== null && rows !== null) {
  //   for (var i = 0; i < rows.length; i++) {
  //     rows[i] = renameKeys(
  //       {
  //         _id: "id",
  //       },
  //       rows[i]
  //     );
  //   }
  // }
  console.log("day", count);
  if (rows !== null) {
    for (var i = 0; i < rows.length; i++) {
      rows[i].quantification = count[i];
    }
  }
  const handleAddClick = (id) => () => {
    const Item = {
      idProductLine: id,
      idFactory: JSON.parse(localStorage.user)._id,
      idDistributor: "63ac7405f16230fc4346010b",
      status: "New",
      located: JSON.parse(localStorage.user)._id,
      owner: "63ac53dab19a7b82d7307565",
    };
    const add = axios.post("http://localhost:8000/api/toyProduct/add", Item);
    if (rows !== null) {
      for (var i = 0; i < rows.length; i++) {
        if (rows[i].id === id) {
          // console.log(typeof(rows[i].id))
          rows[i].quantification++;
        }
      }
    }
  };

  const handleSaveClick = (id) => () => {
    console.log(rowModesModel);
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
    //console.log(rowModesModel[id]);
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

  const columns = [
    { title: "name", field: "name", width: 120, editable: false },
    { title: "size", field: "size", width: 210, editable: false },
    { title: "price", field: "price", width: 120, editable: false },
    { title: "seats", field: "seats", width: 90, editable: false },
    { title: "engine", field: "engine", width: 120, editable: false },
    { title: "xylanh", field: "xylanh", width: 120, editable: false },
    { title: "hp", field: "hp", width: 90, editable: false },
    {
      title: "quantification",
      field: "quantification",
      width: 120,
      editable: true,
    },
    {
      field: "actions",
      type: "actions",
      headerName: "Actions",
      width: 100,
      cellClassName: "actions",
      getActions: ({ id }) => {
        const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;
        // if (isInEditMode) {
        //   return [
        //     <GridActionsCellItem
        //       icon={<SaveIcon />}
        //       label="Save"
        //       onClick={handleSaveClick(id)}
        //     />,
        //     <GridActionsCellItem
        //       icon={<CancelIcon />}
        //       label="Cancel"
        //       className="textPrimary"
        //       onClick={handleCancelClick(id)}
        //       color="inherit"
        //     />,
        //   ];
        // }

        return [
          <GridActionsCellItem
            icon={<AddIcon />}
            label="Add"
            className="textPrimary"
            onClick={handleAddClick(id)}
            color="inherit"
          />,
        ];
      },
    },
  ];

  const [showCreate, setShowCreate] = useState(false);

  const toggleShowCreate = () => {
    setShowCreate(!showCreate);
  };

  const { register, handleSubmit } = useForm();
  const onSubmit = (data) => {
    console.log(data);
  };

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
