import "./accounts.css";
import Sidebar from "../sidebar/sidebar";
import Navbar from "../../../../components/navbar/navbar";

import Table from "../../../../components/table/table";
import Product from "../../../../components/product/product";
import { BiSearchAlt2 } from "react-icons/bi";

import React, { useCallback } from "react";
import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../../../context/AuthContext";
import { useForm } from "react-hook-form";
import axios from "axios";

export default function AccountManagement() {
  const { token, user } = useContext(AuthContext);
  const height = 615;
  const [showCreate, setShowCreate] = useState(false);
  const [errorUsername, setErrorUsername] = useState(false);
  const [rows, setRows] = useState([]);

  console.log(rows);
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
      setRows(res.data.data);
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  }, []);

  const onSubmit = async (data) => {
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
    // try {
    //   if (errorUsername === false) {
    //     const res = await axios.post(
    //       "http://localhost:8000/api/account/add",
    //       data
    //     );
    //     console.log(res);
    //     console.log("gui dlieu");
    //     getAllAccount();
    //     setShowCreate(false);
    //     alert("Create account success");
    //   }
    // } catch (error) {
    //   console.log(error);
    // }
  };

  useEffect(() => {
    getAllAccount();
  }, []);

  const columns_ = [
    { headerName: "Id", field: "id", width: 250, editable: true },
    { headerName: "Username", field: "username", width: 120, editable: true },
    { headerName: "Password", field: "password", width: 120, editable: true },
    { headerName: "Name", field: "name", width: 200, editable: true },
    {
      headerName: "Type Account",
      field: "typeAccount",
      width: 150,
      editable: true,
    },
    { headerName: "Location", field: "location", width: 200, editable: true },
  ];
  const columns = [
    { headerName: "Id", field: "Account.id", width: 40, editable: true },
    // { headerName: "Username", field: "username", width: 175, editable: true },
    // { headerName: "Password", field: "password", width: 175, editable: true },
    // { headerName: "Role", field: "role", width: 175, editable: true },
    // {
    //   headerName: "createdAt",
    //   field: "createdAt",
    //   width: 175,
    //   editable: true,
    // },
    // { headerName: "updatedAt", field: "updatedAt", width: 175, editable: true },
  ];
  const data = [
    {
      id: 2,
      username: "cs",
      password: "abc",
      role: "factory",
      createdAt: "2023-04-12T00:00:00.000Z",
      updatedAt: "2023-04-12T00:00:00.000Z",
    },
    {
      id: 3,
      username: "dl",
      password: "abc",
      role: "store",
      createdAt: "2023-04-12T00:00:00.000Z",
      updatedAt: "2023-04-12T00:00:00.000Z",
    },
    {
      id: 4,
      username: "tt",
      password: "abc",
      role: "guarantee",
      createdAt: "2023-04-12T00:00:00.000Z",
      updatedAt: "2023-04-12T00:00:00.000Z",
    },
    {
      id: 5,
      username: "cs2",
      password: "abc",
      role: "factory",
      createdAt: "2023-04-12T00:00:00.000Z",
      updatedAt: "2023-04-12T00:00:00.000Z",
    },
    {
      id: 6,
      username: "dl2",
      password: "abc",
      role: "store",
      createdAt: "2023-04-12T00:00:00.000Z",
      updatedAt: "2023-04-12T00:00:00.000Z",
    },
    {
      id: 7,
      username: "tt2",
      password: "abc",
      role: "guarantee",
      createdAt: "2023-04-12T00:00:00.000Z",
      updatedAt: "2023-04-12T00:00:00.000Z",
    },
    {
      id: 10,
      username: "test",
      password: "abc",
      role: "factory",
      createdAt: "2023-04-17T00:47:10.000Z",
      updatedAt: "2023-04-17T00:47:10.000Z",
    },
    {
      id: 11,
      username: "quyet",
      password: "abc",
      role: "factory",
      createdAt: "2023-04-17T00:57:25.000Z",
      updatedAt: "2023-04-17T00:57:25.000Z",
    },
    {
      id: 12,
      username: "quyetStore",
      password: "abc",
      role: "store",
      createdAt: "2023-04-17T01:01:30.000Z",
      updatedAt: "2023-04-17T01:01:30.000Z",
    },
    {
      id: 13,
      username: "quyetGuarantee",
      password: "abc",
      role: "guarantee",
      createdAt: "2023-04-17T01:01:50.000Z",
      updatedAt: "2023-04-17T01:01:50.000Z",
    },
    {
      id: 14,
      username: "quyetGuarantee2",
      password: "abc",
      role: "guarantee  ",
      createdAt: "2023-04-17T01:05:18.000Z",
      updatedAt: "2023-04-17T01:05:18.000Z",
    },
    {
      id: 15,
      username: "quyetGuarantee3",
      password: "abc",
      role: "guarantee  ",
      createdAt: "2023-04-17T01:07:05.000Z",
      updatedAt: "2023-04-17T01:07:05.000Z",
    },
    {
      id: 16,
      username: "quyetGuarantee4",
      password: "abc",
      role: "guarantee  ",
      createdAt: "2023-04-17T01:08:15.000Z",
      updatedAt: "2023-04-17T01:08:15.000Z",
    },
    {
      id: 17,
      username: "quyetGuarantee5",
      password: "abc",
      role: "guarantee",
      createdAt: "2023-04-17T01:08:36.000Z",
      updatedAt: "2023-04-17T01:08:36.000Z",
    },
    {
      id: 18,
      username: "quyetGuarantee6",
      password: "abc",
      role: "guarantee",
      createdAt: "2023-04-17T01:09:15.000Z",
      updatedAt: "2023-04-17T01:09:15.000Z",
    },
    {
      id: 19,
      username: "quyetGuarantee7",
      password: "abc",
      role: "guarantee",
      createdAt: "2023-04-17T01:09:38.000Z",
      updatedAt: "2023-04-17T01:09:38.000Z",
    },
    {
      id: 20,
      username: "quyetGuarantee8",
      password: "abc",
      role: "guarantee",
      createdAt: "2023-04-17T01:10:36.000Z",
      updatedAt: "2023-04-17T01:10:36.000Z",
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
