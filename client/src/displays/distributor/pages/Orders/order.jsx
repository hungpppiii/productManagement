import React, { useCallback } from 'react';
import { useForm } from 'react-hook-form';

import Sidebar from '../Sidebar/sidebar';
import NavBar from '../../../../components/navbar/navbar';
import Table from '../../../../components/table/table';
import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../../../../context/AuthContext';
import axios from 'axios';
import moment from 'moment';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import { GridActionsCellItem } from '@mui/x-data-grid';
import {
  Box,
  Modal,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';

import { getGuaranteeAPI, warrantyProductAPI } from '../../../../API/api';

import './order.css';

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

const Order = () => {
  const { user } = useContext(AuthContext);
  const height = 600;
  const [rows, setRows] = useState([]);
  const [guaranteeId, setGuaranteeId] = React.useState('');
  const [guarantees, setGuarantees] = React.useState([]);
  const [open, setOpen] = React.useState(false);
  const [selectProductId, setSelectProductId] = React.useState('');

  const handleChange = (event) => {
    setGuaranteeId(event.target.value);
  };
  const handleOpen = (typeForm) => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [finalClickInfo, setFinalClickInfo] = useState(null);

  const handleOnCellClick = (params) => {
    setFinalClickInfo(params);
  };
  console.log(finalClickInfo);

  const getOrder = useCallback(async () => {
    try {
      const res = await axios.get(
        'http://localhost:8080/api/product/getAllProducts/sold',
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
      console.log('loi');
      console.log(error);
    }
  }, []);

  const getGuarantees = useCallback(async () => {
    try {
      const result = await getGuaranteeAPI();
      console.log('get store', result.data);
      if (result.success) setGuarantees(result.data);
    } catch (error) {
      console.log('error fetch store', error);
      setGuarantees();
    }
  }, []);

  useEffect(() => {
    getGuarantees();
    getOrder();
  }, []);
  console.log(rows);

  const handleWarrantyProduct = async () => {
    console.log(selectProductId, {
      guaranteeId,
    });
    const success = await warrantyProductAPI(selectProductId, {
      guaranteeId,
    });
    if (success) {
      await getOrder();
      handleClose();
      console.log('success: ', success);
    } else {
      console.log('error: ', success);
    }
  };

  const openFormWarrantyProduct = async (id) => {
    console.log('product id', id);
    setSelectProductId(id);
    handleOpen(0);
  };

  const columns = [
    { headerName: 'Id', field: 'id', width: 80, editable: true },
    { headerName: 'Name', field: 'name', width: 200, editable: true },
    {
      headerName: 'WarrantyPeriod',
      field: 'warrantyPeriod',
      width: 120,
      editable: true,
    },
    {
      headerName: 'Description',
      field: 'description',
      width: 350,
      editable: true,
    },
    { headerName: 'Price', field: 'price', width: 100, editable: true },
    {
      headerName: 'Order Date',
      field: 'orderDate',
      width: 120,
      editable: true,
      renderCell: (params) => {
        if (params.row.orderDate == null) {
          return 'Null';
        } else {
          return moment(params.row?.orderDate).format('DD-MM-YYYY');
        }
      },
    },
    {
      headerName: 'Customer',
      field: 'customer',
      width: 175,
      editable: true,
    },
    { headerName: 'Address', field: 'address', width: 150, editable: true },
    { headerName: 'Phone', field: 'phone', width: 150, editable: true },
    { headerName: 'Status', field: 'status', width: 150, editable: true },
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
            onClick={() => openFormWarrantyProduct(id)}
            color="inherit"
          />,
        ];
      },
    },
  ];

  return (
    <div className="order">
      <Sidebar />
      <div className="wrapper">
        <NavBar />
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Box sx={{ mb: 5, fontWeight: '1000', fontSize: '1.5rem' }}>
              {'Chọn trung tâm bảo hành'}
            </Box>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">
                {'Guarantee'}
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={guaranteeId}
                onChange={handleChange}
              >
                {guarantees.map((guarantee) => (
                  <MenuItem value={guarantee.id}>{guarantee.name}</MenuItem>
                ))}
              </Select>
              <Box sx={{ mt: 5, ml: 'auto' }}>
                <Button
                  size="medium"
                  onClick={handleWarrantyProduct}
                  variant="contained"
                >
                  {'Warranty Product'}
                </Button>
              </Box>
            </FormControl>
          </Box>
        </Modal>
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
                      Order date :{' '}
                      {moment(finalClickInfo.row.orderDate).format(
                        'DD-MM-YYYY'
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default Order;
