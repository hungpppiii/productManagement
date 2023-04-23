import './products.css';
import Sidebar from '../sidebar/sidebar';
import Navbar from '../../../../components/navbar/navbar';
import Table from '../../../../components/table/table';
import formatPrice from '../../../../utils/formatPrice';

import FactoryIcon from '@mui/icons-material/Factory';
import DoneIcon from '@mui/icons-material/Done';
import { GridActionsCellItem, GridRowModes } from '@mui/x-data-grid';
import axios from 'axios';
import React, { useEffect, useContext, useCallback } from 'react';
import { AuthContext } from '../../../../context/AuthContext';
import { useState } from 'react';
import moment from 'moment';

export default function Warehouse() {
  const { user } = useContext(AuthContext);
  const height = 631;
  const [rowModesModel, setRowModesModel] = React.useState({});
  const [rows, setRows] = useState([]);

  const getAllProduct = useCallback(async () => {
    try {
      console.log('fetch');
      const res = await axios.get(
        'http://localhost:8080/api/product/getAllProducts/warranty',
        {
          headers: {
            Authorization: 'Bearer ' + user.token,
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
          price: temp[i].Product.ProductLine.price,
          customer_name: temp[i].Customer.name,
          factory: temp[i].Product.Factory.name,
        };
        result.push(Obj);
      }
      console.log(result);
      setRows(result);
    } catch (error) {
      console.log('loi');
      console.log(error);
    }
  }, []);

  useEffect(() => {
    getAllProduct();
  }, []);

  const handleReturnProduct = (id, warrantyStatus) => async () => {
    try {
      const res = await axios.patch(
        `http://localhost:8080/api/product/return/${id}`,
        { warrantyStatus },
        {
          headers: {
            Authorization: 'Bearer ' + user.token,
          },
        }
      );
      console.log(res.data);
      getAllProduct();
    } catch (error) {
      console.log(error);
    }
  };

  const columns = [
    { title: 'Id', field: 'id', width: 40, editable: false },
    { title: 'Name', field: 'name', width: 250, editable: false },
    {
      headerName: 'Price',
      field: 'price',
      width: 120,
      renderCell: (params) => {
        return formatPrice(params.row.price);
      },
    },
    { title: 'Status', field: 'status', width: 175, editable: false },
    {
      title: 'Start time',
      field: 'warranty_start_time',
      width: 175,
      editable: false,
      renderCell: (params) =>
        moment(params.row.warranty_start_time).format('DD-MM-YYYY'),
    },
    { title: 'Customer', field: 'customer_name', width: 175, editable: false },
    { title: 'Factory', field: 'factory', width: 175, editable: false },

    {
      field: 'actions',
      type: 'actions',
      headerName: 'Actions',
      width: 80,
      cellClassName: 'actions',
      getActions: ({ row }) => {
        const id = row.id;
        return [
          <GridActionsCellItem
            icon={<FactoryIcon />}
            label="Edit"
            className="textPrimary"
            onClick={handleReturnProduct(id, 'error')}
            color="inherit"
          />,
          <GridActionsCellItem
            icon={<DoneIcon />}
            label="Delete"
            onClick={handleReturnProduct(id, 'sold')}
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
