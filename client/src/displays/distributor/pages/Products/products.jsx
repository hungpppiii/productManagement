import Sidebar from "../Sidebar/sidebar";
import NavBar from "../../../../components/navbar/navbar";
import "./products.css";
import Table from "../../../../components/table/table";

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Close";
import { GridActionsCellItem, GridRowModes } from "@mui/x-data-grid";

import { useForm } from "react-hook-form";
import axios from "axios";
import React, { useCallback, useEffect } from "react";
import { useState, useContext } from "react";
import { AuthContext } from "../../../../context/AuthContext";
import moment from "moment";

const Products = () => {
  const { user } = useContext(AuthContext);
  const height = 631;
  const [rowModesModel, setRowModesModel] = React.useState({});
  const [rows, setRows] = useState([]);
  const [showCreate, setShowCreate] = useState(false);
  const [errorUsername, setErrorUsername] = useState(false);

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
      const res = await axios.get(
        "http://localhost:8080/api/product/getAllProducts/distributed",
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
          warrantyPeriod: temp[i].Product.ProductLine.warrantyPeriod,
          description: temp[i].Product.ProductLine.description,
          price: temp[i].Product.ProductLine.price,
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

  const toggleShowCreate = () => {
    setShowCreate(!showCreate);
  };

  const onSellProduct = async (data) => {
    const customer = {
      name: data.name,
      address: data.address,
      phone: data.phone,
    };
    try {
      const res = await axios.patch(
        "http://localhost:8080/api/product/sold/" + data.productID,
        customer,
        {
          headers: {
            Authorization: "Bearer " + user.token,
          },
        }
      );
      console.log(res.data);
      getAllProduct();
      setShowCreate(false);
      alert("Sell success");
    } catch (error) {
      console.log(error);
    }
  };

  const columns = [
    {
      title: "id",
      headerName: "id",
      field: "id",
      width: 80,
      editable: false,
    },
    {
      title: "Name",
      headerName: "Name",
      field: "name",
      width: 200,
      editable: true,
    },
    {
      title: "Description",
      headerName: "Description",
      field: "description",
      width: 350,
      editable: true,
    },
    {
      title: "WarrantyPeriod",
      headerName: "WarrantyPeriod",
      field: "warrantyPeriod",
      width: 130,
      editable: true,
    },
    {
      title: "Status",
      headerName: "Status",
      field: "status",
      width: 150,
      editable: true,
    },
    {
      title: "Price",
      headerName: "Price",
      field: "price",
      width: 150,
      editable: true,
    },
  ];

  return (
    <div className="products">
      <Sidebar />
      <div className="wrapper">
        <NavBar />
        <div className="mainAccount">
          <div className="navAccount">
            <button className="createAccount" onClick={toggleShowCreate}>
              Sell products
            </button>
          </div>
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

      {showCreate && (
        <div className="model">
          <div onClick={toggleShowCreate} className="overlay"></div>
          <form className="content" onSubmit={handleSubmit(onSellProduct)}>
            <label className="row">
              Customer name
              <input
                {...register("name", { required: true })}
                placeholder="Enter customer name"
              />
              <small>{errors.name && "This field is required"}</small>
            </label>
            <label className="row">
              Address
              <input
                {...register("address", { required: true })}
                placeholder="Enter address"
              />
              <small>{errors.address && "This field is required"}</small>
            </label>
            <label className="row">
              Phone
              <input
                {...register("phone", { required: true })}
                placeholder="Enter phone"
              />
              <small>{errors.phone && "This field is required"}</small>
            </label>
            <label className="row">
              Product ID
              <select {...register("productID")}>
                {rows?.map((item, index) => {
                  return (
                    <option key={index} value={item.id}>
                      {item.id}
                    </option>
                  );
                })}
              </select>
            </label>
            <input type="submit" className="submitAccount" />
          </form>
        </div>
      )}
    </div>
  );
};

export default Products;
