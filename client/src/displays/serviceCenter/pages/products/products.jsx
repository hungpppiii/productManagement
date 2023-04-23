import "./products.css";
import Sidebar from "../sidebar/sidebar";
import Navbar from "../../../../components/navbar/navbar";
import Table from "../../../../components/table/table";

import EditIcon from "@mui/icons-material/Edit";
import FactoryIcon from "@mui/icons-material/Factory";
import DoneIcon from "@mui/icons-material/Done";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import { GridActionsCellItem, GridRowModes } from "@mui/x-data-grid";
import axios from "axios";
import React, { useEffect, useContext, useCallback } from "react";
import { AuthContext } from "../../../../context/AuthContext";
import { useState } from "react";
import { useForm } from "react-hook-form";
import moment from "moment";

export default function Warehouse() {
  const { user } = useContext(AuthContext);
  const height = 631;
  const [rowModesModel, setRowModesModel] = React.useState({});
  const [rows, setRows] = useState([]);
  const [ShowFormMove, setShowFormMove] = useState(false);
  const [productMove, setProductMove] = useState({});

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm({
    mode: "onTouched",
  });

  const getAllProduct = useCallback(async () => {
    try {
      console.log("fetch");
      const res = await axios.get(
        "http://localhost:8080/api/product/getAllProducts/warranty",
        {
          headers: {
            Authorization: "Bearer " + user.token,
          },
        }
      );
      console.log(res.data.data);
      const temp = res.data.data;
      let result = [];
      for (let i = 0; i < temp.length; i++) {
        let Obj = {
          id: temp[i].Product.id,
          name: temp[i].Product.ProductLine.name,
          status: temp[i].Product.status,
          warranty_start_time: temp[i].warrantyStartTime,
          // warranty_end_time
          customer_name: temp[i].Customer.name,
          factory: temp[i].Product.Factory.name,
        };
        result.push(Obj);
      }
      console.log(result);
      setRows(result);
    } catch (error) {
      console.log("loi");
      console.log(error);
    }
  }, []);

  useEffect(() => {
    getAllProduct();
  }, []);

  const processRowUpdate = async (newRow) => {
    console.log(newRow);
    // const data = {
    //   warrantyStatus: "error",
    // };
    // try {
    //   const res = await axios.patch(
    //     "http://localhost:8080/api/product/return/" + newRow.id,
    //     data,
    //     {
    //       headers: {
    //         Authorization: "Bearer " + user.token,
    //       },
    //     }
    //   );
    //   console.log(res.data);
    // } catch (error) {
    //   console.log(error);
    // }

    // const updatedRow = { ...newRow, isNew: false };
    // setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)));
    // return updatedRow;
  };

  const handleEditClick = (row) => async () => {
    const data = {
      warrantyStatus: "error",
    };
    try {
      const res = await axios.patch(
        "http://localhost:8080/api/product/return/" + row.id,
        data,
        {
          headers: {
            Authorization: "Bearer " + user.token,
          },
        }
      );
      console.log(res.data);
      getAllProduct();
    } catch (error) {
      console.log(error);
    }
  };

  const handleSaveClick = (row) => () => {
    // console.log(row);
    setRowModesModel({
      ...rowModesModel,
      [row.id]: { mode: GridRowModes.View },
    });
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

  const handleDeleteClick = (row) => async () => {
    const data = {
      warrantyStatus: "sold",
    };
    try {
      const res = await axios.patch(
        "http://localhost:8080/api/product/return/" + row.id,
        data,
        {
          headers: {
            Authorization: "Bearer " + user.token,
          },
        }
      );
      console.log(res.data);
      getAllProduct();
    } catch (error) {
      console.log(error);
    }
  };

  // const handleSubmitMove = (row) => () => {
  //   console.log(row);
  // };

  // const handleShowMove = (row) => () => {
  //   toggleShowMove();
  //   setMove(row);
  //   console.log(productMove);
  // };

  // const setMove = (product) => {
  //   setProductMove(product);
  // };

  // const toggleShowMove = () => {
  //   setShowFormMove(!ShowFormMove);
  // };

  const columns = [
    { title: "Id", field: "id", width: 40, editable: false },
    { title: "Name", field: "name", width: 250, editable: false },
    { title: "Status", field: "status", width: 175, editable: false },
    {
      title: "Start time",
      field: "warranty_start_time",
      width: 175,
      editable: false,
      renderCell: (params) =>
        moment(params.row.warranty_start_time).format("DD-MM-YYYY"),
    },
    // {
    //   title: "End time",
    //   field: "warranty_end_time",
    //   width: 175,
    //   editable: false,
    //   renderCell: (params) => {
    //     if (params.row.warranty_end_time == null) {
    //       return "Null";
    //     } else {
    //       return moment(params.row?.warranty_end_time).format("DD-MM-YYYY");
    //     }
    //   },
    // },
    { title: "Customer", field: "customer_name", width: 175, editable: false },
    { title: "Factory", field: "factory", width: 175, editable: false },

    {
      field: "actions",
      type: "actions",
      headerName: "Actions",
      width: 80,
      cellClassName: "actions",
      getActions: ({ row }) => {
        const id = row.id;
        // const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;
        // if (isInEditMode) {
        //   return [
        //     <GridActionsCellItem
        //       icon={<SaveIcon />}
        //       label="Save"
        //       onClick={handleSaveClick(row)}
        //     />,
        //     <GridActionsCellItem
        //       icon={<CancelIcon />}
        //       label="Cancel"
        //       className="textPrimary"
        //       onClick={handleCancelClick(row)}
        //       color="inherit"
        //     />,
        //   ];
        // }

        return [
          <GridActionsCellItem
            icon={<FactoryIcon />}
            label="Edit"
            className="textPrimary"
            onClick={handleEditClick(row)}
            color="inherit"
          />,
          <GridActionsCellItem
            icon={<DoneIcon />}
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
            processRowUpdate,
            rowModesModel,
            setRowModesModel,
          }}
        />
      </div>
      {/* 
      {ShowFormMove && (
        <div className="model">
          <div onClick={toggleShowMove} className="overlay"></div>
          <form className="content" onSubmit={handleSubmit(handleSubmitMove)}>
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
      )} */}
    </div>
  );
}
