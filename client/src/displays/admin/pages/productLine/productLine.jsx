import "./productLine.css";
import Sidebar from "../sidebar/sidebar";
import Navbar from "../../../../components/navbar/navbar";

import Table from "../../../../components/table/table";
import { useState, useEffect, useContext, useCallback } from "react";
import { AuthContext } from "../../../../context/AuthContext";
import axios from "axios";
import { GridActionsCellItem, GridRowModes } from "@mui/x-data-grid";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Close";
import moment from "moment";
import { useForm } from "react-hook-form";

export default function ProductLine() {
  const { user } = useContext(AuthContext);
  const height = 631;
  const [rows, setRows] = useState([]);
  const [rowModesModel, setRowModesModel] = useState({});

  const [showCreate, setShowCreate] = useState(false);
  const [errorUsername, setErrorUsername] = useState(false);

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

  const getAllProductLine = useCallback(async () => {
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
  });
  useEffect(() => {
    getAllProductLine();
  }, []);

  const onSubmitCreate = async (data) => {
    console.log(data);
    for (var i = 0; i < rows.length; i++) {
      if (rows[i].name === data.name) {
        setErrorUsername(true);
        console.log(rows[i].name);
        return;
      } else {
        setErrorUsername(false);
      }
    }
    // console.log(errorUsername);
    // console.log(data);
    // setShowCreate(!showCreate);
    try {
      if (errorUsername === false) {
        const res = await axios.post(
          "http://localhost:8080/api/productLine/create",
          data,
          {
            headers: {
              Authorization: "Bearer " + user.token,
            },
          }
        );
        console.log(res);
        getAllProductLine();
        setShowCreate(false);
        alert("Create ProductLine success");
      }
    } catch (error) {
      console.log(error);
    }
  };

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
      alert("Thay đổi thông tin thành công!");
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

  return (
    <div className="productLine">
      <Sidebar />
      <div className="wrapper">
        <Navbar />
        <div className="mainAccount">
          <div className="navAccount">
            <button className="createAccount" onClick={toggleShowCreate}>
              Create ProductLine
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
              processRowUpdate,
            }}
          />
        </div>
      </div>

      {showCreate && (
        <div className="model">
          <div onClick={toggleShowCreate} className="overlay"></div>
          <form className="content" onSubmit={handleSubmit(onSubmitCreate)}>
            <label className="row">
              Name of ProductLine
              <input
                {...register("name", { required: true })}
                placeholder="Enter productLine name"
              />
              <small>{errors.name && "This field is required"}</small>
              {errorUsername && <small>{"ProductLine must be unique"}</small>}
            </label>
            <label className="row">
              Price
              <input
                {...register("price", { required: true })}
                placeholder="Enter price"
              />
              <small>
                {errors.price?.type === "required" && "This field is required"}
              </small>
            </label>
            <label className="row">
              WarrantyPeriod
              <input
                {...register("warrantyPeriod", { required: true })}
                placeholder="enter warrantyPeriod"
              />
              <small>{errors.warrantyPeriod && "This field is required"}</small>
            </label>
            <label className="row">
              Description
              <input
                {...register("description", { required: true })}
                placeholder="enter description"
              />
              <small>{errors.description && "This field is required"}</small>
            </label>

            <input type="submit" className="submitAccount" />
          </form>
        </div>
      )}
    </div>
  );
}
