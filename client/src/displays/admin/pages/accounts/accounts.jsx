import "./accounts.css";
import Sidebar from "../sidebar/sidebar";
import Navbar from "../../../../components/navbar/navbar";

import Table from "../../../../components/table/table";
import Product from "../../../../components/product/product";
import { BiSearchAlt2 } from "react-icons/bi";

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Close";
import { GridActionsCellItem, GridRowModes } from "@mui/x-data-grid";

import React, { useCallback } from "react";
import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../../../context/AuthContext";
import { useForm } from "react-hook-form";
import axios from "axios";
import moment from "moment";

export default function AccountManagement() {
  const { token, user } = useContext(AuthContext);
  const height = 615;
  const [rowModesModel, setRowModesModel] = React.useState({});

  const [showCreate, setShowCreate] = useState(false);
  const [errorUsername, setErrorUsername] = useState(false);
  const [rows, setRows] = useState([]);

  const toggleShowCreate = () => {
    setShowCreate(!showCreate);
  };

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm({
    mode: "onTouched",
  });

  const getAllAccount = useCallback(async () => {
    try {
      const res = await axios.get(
        "http://localhost:8080/api/account/getAllAccount",
        {
          headers: {
            Authorization: "Bearer " + user.token,
          },
        }
      );
      setRows(res.data);
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    getAllAccount();
  }, []);

  const onSubmitCreate = async (data) => {
    for (var i = 0; i < rows.length; i++) {
      if (rows[i].username === data.username) {
        setErrorUsername(true);
        return;
      } else {
        setErrorUsername(false);
      }
    }
    console.log(errorUsername);
    console.log(data);
    setShowCreate(!showCreate);
    try {
      if (errorUsername === false) {
        const res = await axios.post(
          "http://localhost:8080/api/account/create",
          data,
          {
            headers: {
              Authorization: "Bearer " + user.token,
            },
          }
        );
        console.log(res);
        console.log("gui dlieu");
        getAllAccount();
        setShowCreate(false);
        alert("Create account success");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const processRowUpdate = async (newRow) => {
    console.log(newRow);
    // try {
    //   const res = await axios.put(
    //     "http://localhost:8000/api/toyProduct/",
    //     newRow
    //   );
    //   console.log(res.data);
    // } catch (error) {
    //   console.log(error);
    // }

    const updatedRow = { ...newRow, isNew: false };
    setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)));
    return updatedRow;
  };

  const handleEditClick = (row) => () => {
    // console.log(row.id);
    setRowModesModel({
      ...rowModesModel,
      [row.id]: { mode: GridRowModes.Edit },
    });
  };

  const handleSaveClick = (row) => () => {
    // console.log(row);
    setRowModesModel({
      ...rowModesModel,
      [row.id]: { mode: GridRowModes.View },
    });
  };

  const handleDeleteClick = (row) => () => {
    // console.log(row);
    const id = row.id;
    setRows(rows.filter((row) => row._id !== id));
  };

  const handleCancelClick = (row) => () => {
    const id = row.id;
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
    { headerName: "Id", field: "id", width: 40, editable: true },
    { headerName: "Username", field: "username", width: 175, editable: true },
    { headerName: "Password", field: "password", width: 175, editable: true },
    { headerName: "Role", field: "role", width: 175, editable: true },
    {
      headerName: "createdAt",
      field: "createdAt",
      width: 175,
      editable: true,
      renderCell: (params) => {
        if (params.row.createdAt == null) {
          return "Null";
        } else {
          return moment(params.row?.createdAt).format("DD-MM-YYYY");
        }
      },
    },
    {
      headerName: "updatedAt",
      field: "updatedAt",
      width: 175,
      editable: true,
      renderCell: (params) => {
        if (params.row.updatedAt == null) {
          return "Null";
        } else {
          return moment(params.row?.updatedAt).format("DD-MM-YYYY");
        }
      },
    },
    {
      field: "actions",
      type: "actions",
      headerName: "Actions",
      width: 100,
      cellClassName: "actions",
      getActions: ({ row }) => {
        const isInEditMode = rowModesModel[row.id]?.mode === GridRowModes.Edit;
        if (isInEditMode) {
          return [
            <GridActionsCellItem
              icon={<SaveIcon />}
              label="Save"
              onClick={handleSaveClick(row)}
            />,
            <GridActionsCellItem
              icon={<CancelIcon />}
              label="Cancel"
              className="textPrimary"
              onClick={handleCancelClick(row)}
              color="inherit"
            />,
          ];
        }

        return [
          <GridActionsCellItem
            icon={<EditIcon />}
            label="Edit"
            className="textPrimary"
            onClick={handleEditClick(row)}
            color="inherit"
          />,
          <GridActionsCellItem
            icon={<DeleteIcon />}
            label="Delete"
            onClick={handleDeleteClick(row)}
            color="inherit"
          />,
        ];
      },
    },
  ];

  return (
    <div className="accounts">
      <Sidebar />
      <div className="wrapper">
        <Navbar />
        <div className="mainAccount">
          <div className="navAccount">
            <button className="createAccount" onClick={toggleShowCreate}>
              Create Account
            </button>
          </div>
          <Table {...{ columns, rows, setRows, height, processRowUpdate }} />
        </div>
      </div>

      {showCreate && (
        <div className="model">
          <div onClick={toggleShowCreate} className="overlay"></div>
          <form className="content" onSubmit={handleSubmit(onSubmitCreate)}>
            <label className="row">
              Username
              <input
                {...register("username", { required: true })}
                placeholder="enter username"
              />
              <small>{errors.username && "This field is required"}</small>
              {errorUsername && <small>{"Username must be unique"}</small>}
            </label>
            <label className="row">
              Password
              <input
                {...register("password", { required: true, minLength: 6 })}
                placeholder="enter password"
              />
              <small>
                {errors.password?.type === "required" &&
                  "This field is required"}
              </small>
              <small>
                {errors.password?.type === "minLength" &&
                  "password minium 6 characters"}
              </small>
            </label>
            <label className="row">
              Name
              <input
                {...register("name", { required: true })}
                placeholder="enter name"
              />
              <small>{errors.name && "This field is required"}</small>
            </label>
            <label className="row">
              Address
              <input
                {...register("address", { required: true })}
                placeholder="enter address"
              />
              <small>{errors.address && "This field is required"}</small>
            </label>
            <label className="row">
              Phone
              <input
                {...register("phone", { required: true })}
                placeholder="enter phone"
              />
              <small>{errors.phone && "This field is required"}</small>
            </label>
            <label className="row">
              Role
              <select {...register("role")}>
                <option value="admin">Admin</option>
                <option value="store">Store</option>
                <option value="factory">Factory</option>
                <option value="guarantee">Guarantee</option>
              </select>
            </label>
            <input type="submit" className="submitAccount" />
          </form>
        </div>
      )}
    </div>
  );
}
