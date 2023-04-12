import "./products.css";
import Sidebar from "../sidebar/sidebar";
import Navbar from "../../../../components/navbar/navbar";
import Table from "../../../../components/table/table";

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Close";
import { GridActionsCellItem, GridRowModes } from "@mui/x-data-grid";

import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";

export default function Products() {
  const height = 631;
  const [rowModesModel, setRowModesModel] = React.useState({});

  const [rows, setRows] = useState([]);
  useEffect(() => {
    const getAllProduct = async () => {
      try {
        const res = await axios.get(
          "http://localhost:8000/api/toyProduct/getAll"
        );
        setRows(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getAllProduct();
  }, []);

  console.log(rows);

  if (rows !== null) {
    for (var i = 0; i < rows.length; i++) {
      let nameO = rows[i].owner.name;
      rows[i].Owner = nameO;
    }
  }
  if (rows !== null) {
    for (var i = 0; i < rows.length; i++) {
      let nameD = rows[i].idDistributor.name;
      rows[i].Distributor = nameD;
    }
  }
  if (rows !== null) {
    for (var i = 0; i < rows.length; i++) {
      let nameF = rows[i].idFactory.name;
      rows[i].Factory = nameF;
    }
  }
  if (rows !== null) {
    for (var i = 0; i < rows.length; i++) {
      let nameL = rows[i].idProductLine.name;
      rows[i].ProductLine = nameL;
    }
  }
  if (rows !== null) {
    for (var i = 0; i < rows.length; i++) {
      let nameL = rows[i].located.name;
      rows[i].Location = nameL;
    }
  }

  // console.log(rows);

  const handleEditClick = (id) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
  };

  const handleSaveClick = (id) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
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
    {
      title: "id",
      headerName: "ID",
      field: "_id",
      width: 230,
      editable: false,
    },
    {
      title: "ProductLine",
      headerName: "ProductLine",
      field: "ProductLine",
      width: 120,
      editable: true,
    },
    {
      title: "Factory",
      headerName: "Factory",
      field: "Factory",
      width: 120,
      editable: true,
    },
    {
      title: "Distributor",
      headerName: "Distributor",
      field: "Distributor",
      width: 110,
      editable: true,
    },
    {
      title: "Status",
      headerName: "Status",
      field: "status",
      type: "singleSelect",
      valueOptions: [
        "New",
        "Selling",
        "Out Warranty",
        "Warranty",
        "Warranty Complete",
        "Recall",
      ],
      width: 150,
      editable: true,
    },
    {
      title: "Location",
      headerName: "Location",
      field: "Location",
      width: 120,
      editable: true,
    },
    {
      title: "Owner",
      headerName: "Owner",
      field: "Owner",
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
        if (isInEditMode) {
          return [
            <GridActionsCellItem
              icon={<SaveIcon />}
              label="Save"
              onClick={handleSaveClick(id)}
            />,
            <GridActionsCellItem
              icon={<CancelIcon />}
              label="Cancel"
              className="textPrimary"
              onClick={handleCancelClick(id)}
              color="inherit"
            />,
          ];
        }

        return [
          <GridActionsCellItem
            icon={<EditIcon />}
            label="Edit"
            className="textPrimary"
            onClick={handleEditClick(id)}
            color="inherit"
          />,
          <GridActionsCellItem
            icon={<DeleteIcon />}
            label="Delete"
            onClick={handleDeleteClick(id)}
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
