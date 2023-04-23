import './defective.css';
import Sidebar from '../sidebar/sidebar';
import Navbar from '../../../../components/navbar/navbar';
import Table from '../../../../components/table/table';
import formatPrice from '../../../../utils/formatPrice';

import DeleteIcon from '@mui/icons-material/Delete';
import moment from 'moment';

import { deleteProductAPI } from '../../../../API/api';

import { GridActionsCellItem } from '@mui/x-data-grid';

import axios from 'axios';
import React, { useCallback, useEffect } from 'react';
import { useState } from 'react';

export default function Defectives() {
  const height = 631;
  const [rows, setRows] = useState([]);

  const getAllProduct = useCallback(async () => {
    try {
      const res = await axios.get(
        'http://localhost:8080/api/product/getAllProducts/error',
        {
          withCredentials: true,
        }
      );
      setRows(res.data.data);
      if (res.data.success) {
      }
      console.log('get all product error', res.data);
    } catch (error) {
      console.log(error.response.data.message);
    }
  });

  useEffect(() => {
    getAllProduct();
  }, []);

  const handleDeleteProduct = async (id) => {
    console.log('product id', id);
    alert('bạn có chắc chắn muốn xóa không');
    const success = await deleteProductAPI(id);
    if (success) {
      await getAllProduct();
      console.log('success: ', success);
    } else {
      console.log('error: ', success);
    }
  };

  const columns = [
    {
      headerName: 'Name',
      field: 'ProductLine.name',
      width: 220,
      renderCell: (params) => {
        return params.row.ProductLine.name;
      },
    },
    {
      headerName: 'Price',
      field: 'ProductLine.price',
      width: 120,
      renderCell: (params) => {
        return formatPrice(params.row.ProductLine.price);
      },
    },
    {
      headerName: 'Warranty',
      field: 'ProductLine.warrantyPeriod',
      width: 120,
      renderCell: (params) => {
        return params.row.ProductLine.warrantyPeriod + ' month';
      },
    },
    { headerName: 'Status', field: 'status', width: 120, editable: false },
    {
      headerName: 'Production Date',
      field: 'productionDate',
      width: 120,
      type: 'date',
      editable: false,
      renderCell: (params) => {
        if (params.row.productionDate == null) {
          return 'Null';
        } else {
          return moment(params.row?.productionDate).format('DD-MM-YYYY');
        }
      },
    },
    {
      headerName: 'Description',
      field: 'description',
      width: 300,
      renderCell: (params) => {
        return params.row.ProductLine.description;
      },
    },
    {
      headerName: 'Action',
      type: 'actions',
      width: 100,
      cellClassName: 'actions',
      getActions: ({ id }) => {
        return [
          <GridActionsCellItem
            icon={<DeleteIcon />}
            label="Delete"
            className="textPrimary"
            onClick={() => handleDeleteProduct(id)}
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
            height,
          }}
        />
      </div>
    </div>
  );
}
