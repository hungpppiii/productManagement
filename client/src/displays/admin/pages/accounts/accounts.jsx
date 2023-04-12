import "./accounts.css";
import Sidebar from "../sidebar/sidebar";
import Navbar from "../../../../components/navbar/navbar";

import Table from "../../../../components/table/table";
import Product from "../../../../components/product/product";
import { BiSearchAlt2 } from "react-icons/bi";

import React from "react";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";

export default function AccountManagement() {
  const height = 615;
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

  const onSubmit = async (data) => {
    for (var i = 0; i < rows.length; i++) {
      if (rows[i].username === data.username) {
        setErrorUsername(true);
        break;
      } else {
        setErrorUsername(false);
      }
    }
    console.log(errorUsername);
    try {
      if (errorUsername === false) {
        const res = await axios.post(
          "http://localhost:8000/api/account/add",
          data
        );
        console.log(res);
        console.log("gui dlieu");
      }
    } catch (error) {
      console.log(error);
    }

    // try {
    //   const res = axios.post("http://localhost:8000/api/account/add", data);
    //   // if (res.data.status === "Account already exists") {
    //   //   setErrorUsername(true);
    //   // } else {
    //   //   alert("dang ky thanh cong");
    //   // }
    //   console.log(res);
    // } catch (error) {
    //   console.log(error);
    // }
  };

  // http://localhost:8000/api/account/add
  useEffect(() => {
    const getAllProductLine = async () => {
      try {
        const res = await axios.get(
          "http://localhost:8000/api/account/getAllAccount"
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
    { headerName: "Username", field: "username", width: 120, editable: true },
    { headerName: "Password", field: "password", width: 120, editable: true },
    { headerName: "Name", field: "name", width: 120, editable: true },
    {
      headerName: "Type Account",
      field: "typeAccount",
      width: 150,
      editable: true,
    },
    { headerName: "Location", field: "location", width: 200, editable: true },
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
          <Table {...{ columns, rows, setRows, height }} />
        </div>
      </div>

      {showCreate && (
        <div className="model">
          <div onClick={toggleShowCreate} className="overlay"></div>
          <form className="content" onSubmit={handleSubmit(onSubmit)}>
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
              Location
              <input
                {...register("location", { required: true })}
                placeholder="enter location"
              />
              <small>{errors.location && "This field is required"}</small>
            </label>
            <label className="row">
              Type Account
              <select {...register("typeAccount")}>
                <option value="Admin">Admin</option>
                <option value="Distributor">Distributor</option>
                <option value="Factory">Factory</option>
                <option value="Servicecenter">Service center</option>
              </select>
            </label>
            <input type="submit" className="submitAccount" />
          </form>
        </div>
      )}
    </div>
  );
}
