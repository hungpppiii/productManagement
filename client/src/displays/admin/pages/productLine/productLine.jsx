import "./productLine.css";
import Sidebar from "../sidebar/sidebar";
import Navbar from "../../../../components/navbar/navbar";

import Table from "../../../../components/table/table";
import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../../../context/AuthContext";
import axios from "axios";
import { GridActionsCellItem, GridRowModes } from "@mui/x-data-grid";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Close";
import moment from "moment";

export default function ProductLine() {
  const { user } = useContext(AuthContext);
  const height = 631;
  const [rows, setRows] = useState([]);
  const [rowModesModel, setRowModesModel] = useState({});

  useEffect(() => {
    const getAllProductLine = async () => {
      try {
        console.log("fetch");
        const res = await axios.get(
          "http://localhost:8080/api/productLine/getAllProductLine",
          {
            headers: {
              Authorization: "Bearer " + user.token,
            },
          }
        );
        console.log(res.data.data);
        setRows(res.data.data);
      } catch (error) {
        console.log("loi");
        console.log(error);
      }
    };
    getAllProductLine();
  }, []);

  const processRowUpdate = async (newRow) => {
    const data = {
      name: newRow.name,
      price: newRow.price,
      warranty_period: newRow.warrantyPeriod,
      description: newRow.description,
    };
    console.log(data);
    try {
      const res = await axios.patch(
        "http://localhost:8080/api/productLine/" + newRow.id,
        data,
        {
          headers: {
            Authorization: "Bearer " + user.token,
          },
        }
      );
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }

    const updatedRow = { ...newRow, isNew: false };
    setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)));
    return updatedRow;
  };

  const handleEditClick = (id) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
  };

  const handleSaveClick = (id) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
  };

  const handleDeleteClick = (id) => () => {
    console.log(id);
    setRows(rows.filter((row) => row.id !== id));
  };

  const handleCancelClick = (id) => () => {
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
    { headerName: "Id", field: "id", width: 20, editable: false },
    { headerName: "Name", field: "name", width: 275, editable: true },
    { headerName: "Price", field: "price", width: 120, editable: true },
    {
      headerName: "warrantyPeriod",
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
    {
      headerName: "createdAt",
      field: "createdAt",
      width: 120,
      editable: false,
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
      width: 120,
      editable: false,
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
      getActions: ({ id }) => {
        const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;
        if (isInEditMode) {
          return [
            <GridActionsCellItem
              icon={<SaveIcon />}
              label="Save"
              onClick={handleSaveClick(id)}
            />,
            <GridActionsCellItem
              icon={<CancelIcon />}
              label="Cancel"
              className="textPrimary"
              onClick={handleCancelClick(id)}
              color="inherit"
            />,
          ];
        }

        return [
          <GridActionsCellItem
            icon={<EditIcon />}
            label="Edit"
            className="textPrimary"
            onClick={handleEditClick(id)}
            color="inherit"
          />,
          <GridActionsCellItem
            icon={<DeleteIcon />}
            label="Delete"
            onClick={handleDeleteClick(id)}
            color="inherit"
          />,
        ];
      },
    },
  ];

  const data = [
    {
      id: 1,
      name: "điện thoại samsung a73",
      price: 10000000,
      warrantyPeriod: 12,
      description: "dòng điện thoại phân khúc tầm trung của samsung",
      createdAt: "2023-04-12T00:00:00.000Z",
      updatedAt: "2023-04-12T00:00:00.000Z",
    },
    {
      id: 2,
      name: "điện thoại samsung s50 ultra",
      price: 25000000,
      warrantyPeriod: 24,
      description: "dòng điện thoại phân khúc cao cấp của samsung",
      createdAt: "2023-04-12T00:00:00.000Z",
      updatedAt: "2023-04-12T00:00:00.000Z",
    },
    {
      id: 3,
      name: "điện thoại xiaomi redmi 10x",
      price: 5700000,
      warrantyPeriod: 12,
      description: "dòng điện thoại giá rẻ hiệu năng mạnh của xiaomi",
      createdAt: "2023-04-12T00:00:00.000Z",
      updatedAt: "2023-04-12T00:00:00.000Z",
    },
    {
      id: 4,
      name: "điện thoại iphone13",
      price: 10000000,
      warrantyPeriod: null,
      description: "dòng điện thoại phân khúc cao của iphone",
      createdAt: "2023-04-16T04:34:00.000Z",
      updatedAt: "2023-04-16T04:44:12.000Z",
    },
  ];
  return (
    <div className="productLine">
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
            processRowUpdate,
          }}
        />
      </div>
    </div>
  );
}
