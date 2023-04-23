import React, { useCallback } from "react";
import { useForm } from "react-hook-form";

import Sidebar from "../Sidebar/sidebar";
import NavBar from "../../../../components/navbar/navbar";
import Table from "../../../../components/table/table";
import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../../../context/AuthContext";
import axios from "axios";
import moment from "moment";

import "./order.css";

const Order = () => {
  const { user } = useContext(AuthContext);
  const height = 600;
  const [showCreate, setShowCreate] = useState(false);
  const [rows, setRows] = useState([]);
  const { register, handleSubmit } = useForm();

  const toggleShowCreate = () => {
    setShowCreate(!showCreate);
  };

  const onSubmit = (data) => {
    console.log(data);
  };

  const [finalClickInfo, setFinalClickInfo] = useState(null);

  const handleOnCellClick = (params) => {
    setFinalClickInfo(params);
  };
  console.log(finalClickInfo);

  const getOrder = useCallback(async () => {
    try {
      const res = await axios.get(
        "http://localhost:8080/api/product/getAllProducts/sold",
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
          orderDate: temp[i].orderDate,
          customer: temp[i].Customer.name,
          address: temp[i].Customer.address,
          phone: temp[i].Customer.phone,
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
    getOrder();
  }, []);
  console.log(rows);

  const columns = [
    { headerName: "Id", field: "id", width: 80, editable: true },
    { headerName: "Name", field: "name", width: 200, editable: true },
    {
      headerName: "WarrantyPeriod",
      field: "warrantyPeriod",
      width: 120,
      editable: true,
    },
    {
      headerName: "Description",
      field: "description",
      width: 350,
      editable: true,
    },
    { headerName: "Price", field: "price", width: 100, editable: true },
    {
      headerName: "Order Date",
      field: "orderDate",
      width: 120,
      editable: true,
      renderCell: (params) => {
        if (params.row.orderDate == null) {
          return "Null";
        } else {
          return moment(params.row?.orderDate).format("DD-MM-YYYY");
        }
      },
    },
    {
      headerName: "Customer",
      field: "customer",
      width: 175,
      editable: true,
    },
    { headerName: "Address", field: "address", width: 150, editable: true },
    { headerName: "Phone", field: "phone", width: 150, editable: true },
    { headerName: "Status", field: "status", width: 150, editable: true },
  ];

  return (
    <div className="order">
      <Sidebar />
      <div className="wrapper">
        <NavBar />
        <div className="orderWrapper">
          <div className="listOrder">
            <h4>Danh sánh đơn đặt hàng</h4>
            <Table {...{ columns, rows, setRows, height, handleOnCellClick }} />
          </div>

          <div className="mainOrder">
            <h4>Chi tiết đơn hàng</h4>
            <div className="orderDetail">
              {!finalClickInfo && (
                <>
                  <div className="oderContent">Chọn đơn hàng muốn xem</div>
                </>
              )}
              {finalClickInfo && (
                <>
                  <div className="rowOrder firstRow">
                    <p className="fieldOrder">id : {finalClickInfo.row.id}</p>
                  </div>
                  <div className="rowOrder">
                    <p className="fieldOrder">
                      Name of product : {finalClickInfo.row.name}
                    </p>
                  </div>
                  <div className="rowOrder">
                    <p className="fieldOrder">
                      WarrantyPeriod : {finalClickInfo.row.warrantyPeriod}
                    </p>
                  </div>
                  <div className="rowOrder">
                    <p className="fieldOrder">
                      Description : {finalClickInfo.row.description}
                    </p>
                  </div>
                  <div className="rowOrder">
                    <p className="fieldOrder">
                      Price : {finalClickInfo.row.price}
                    </p>
                  </div>
                  <div className="rowOrder">
                    <p className="fieldOrder">
                      Order date :{" "}
                      {moment(finalClickInfo.row.orderDate).format(
                        "DD-MM-YYYY"
                      )}
                    </p>
                  </div>
                  <div className="rowOrder">
                    <p className="fieldOrder">
                      Customer : {finalClickInfo.row.customer}
                    </p>
                  </div>
                  <div className="rowOrder">
                    <p className="fieldOrder">
                      Address : {finalClickInfo.row.address}
                    </p>
                  </div>
                  <div className="rowOrder">
                    <p className="fieldOrder">
                      Phone : {finalClickInfo.row.phone}
                    </p>
                  </div>
                </>
              )}
            </div>
            {/* <button className="createOrder" onClick={toggleShowCreate}>
              Create order
            </button>
            {showCreate && (
              <div className="model">
                <div onClick={toggleShowCreate} className="overlay"></div>
                <form className="content" onSubmit={handleSubmit(onSubmit)}>
                  <label className="row">
                    Name
                    <input {...register("name")} placeholder="enter name" />
                  </label>
                  <label className="row">
                    Username
                    <input
                      {...register("username")}
                      placeholder="enter username"
                    />
                  </label>
                  <label className="row">
                    Email
                    <input {...register("email")} placeholder="enter email" />
                  </label>
                  <label className="row">
                    Type Account
                    <select {...register("gender")}>
                      <option value="female">female</option>
                      <option value="male">male</option>
                      <option value="other">other</option>
                    </select>
                  </label>
                  <input type="submit" />
                </form>
              </div>
            )} */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Order;
