import './products.css';
import Sidebar from '../sidebar/sidebar';
import Navbar from '../../../../components/navbar/navbar';
import Table from '../../../../components/table/table';
import formatPrice from '../../../../utils/formatPrice';
import {
  getAllProductLineAPI,
  getStoreAPI,
  createProductAPI,
  distributeProductAPI,
  deleteProductAPI,
} from '../../../../API/api';

import {
  Box,
  Modal,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import { GridActionsCellItem } from '@mui/x-data-grid';

import moment from 'moment';

import axios from 'axios';
import React, { useCallback, useEffect } from 'react';
import { useState } from 'react';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: '#fce4ec',
  border: '2px solid #000',
  borderRadius: 5,
  boxShadow: 24,
  p: 4,
};

export default function Products() {
  const height = 631;
  const [rows, setRows] = useState([]);
  const [open, setOpen] = React.useState(false);
  const [productLines, setProductLines] = React.useState([]);
  const [stores, setStores] = React.useState([]);
  const [productLineId, setProductLineId] = React.useState('');
  const [selectProductId, setSelectProductId] = React.useState('');
  const [typeForm, setTypeForm] = React.useState(0);
  const [storeId, setStoreId] = React.useState('');

  const handleChange = (event) => {
    typeForm
      ? setProductLineId(event.target.value)
      : setStoreId(event.target.value);
  };
  const handleOpen = (typeForm) => {
    setTypeForm(typeForm);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const getAllProduct = useCallback(async () => {
    try {
      const res = await axios.get(
        'http://localhost:8080/api/product/getAllProducts/inventory',
        {
          withCredentials: true,
        }
      );
      setRows(res.data.data);
      console.log('get all product', res.data);
    } catch (error) {
      console.log('error fetch', error.response.data.message);
    }
  }, []);

  const getProductLines = useCallback(async () => {
    try {
      const result = await getAllProductLineAPI();
      console.log('get product line', result.data);
      if (result.success) setProductLines(result.data);
    } catch (error) {
      console.log('error fetch product line', error);
      setProductLines();
    }
  }, []);

  const getStores = useCallback(async () => {
    try {
      const result = await getStoreAPI();
      console.log('get store', result.data);
      if (result.success) setStores(result.data);
    } catch (error) {
      console.log('error fetch store', error);
      setStores();
    }
  }, []);

  useEffect(() => {
    getStores();
    getProductLines();
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

  const handleDistributeProduct = async () => {
    const success = await distributeProductAPI(selectProductId, { storeId });
    if (success) {
      await getAllProduct();
      handleClose();
      console.log('success: ', success);
    } else {
      console.log('error: ', success);
    }
  };

  const openFormDistributeProduct = async (id) => {
    console.log('product id', id);
    setSelectProductId(id);
    handleOpen(0);
  };

  const handleCreateProduct = async () => {
    const result = await createProductAPI({ productLineId });
    if (result.success) {
      console.log('create product successfully');
      handleClose();
      await getAllProduct();
    } else {
      console.log('create product failed');
    }
  };

  // console.log('test', rows);

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
            icon={<LocalShippingIcon />}
            label="Distribute"
            className="textPrimary"
            onClick={() => openFormDistributeProduct(id)}
            color="inherit"
          />,
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
        <div className="create-button">
          <Button onClick={() => handleOpen(1)} variant="contained">
            Create Product
          </Button>
        </div>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Box sx={{ mb: 5, fontWeight: '1000', fontSize: '1.5rem' }}>
              {typeForm ? 'Chọn dòng sản phẩm' : 'Chọn cửa hàng'}
            </Box>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">
                {typeForm ? 'Product Line' : 'Store'}
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={typeForm ? productLineId : storeId}
                onChange={handleChange}
              >
                {typeForm
                  ? productLines.map((productLine) => (
                      <MenuItem value={productLine.id}>
                        {productLine.name}
                      </MenuItem>
                    ))
                  : stores.map((store) => (
                      <MenuItem value={store.id}>{store.name}</MenuItem>
                    ))}
              </Select>
              <Box sx={{ mt: 5, ml: 'auto' }}>
                <Button
                  size="medium"
                  onClick={
                    typeForm ? handleCreateProduct : handleDistributeProduct
                  }
                  variant="contained"
                >
                  {typeForm ? 'Create Product' : 'Distribute Product'}
                </Button>
              </Box>
            </FormControl>
          </Box>
        </Modal>
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
