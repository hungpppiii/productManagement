import { Box } from "@mui/material";

import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";

import React from "react";
import { useState } from "react";

const Table = ({
  columns,
  rows,
  setRows,
  height,
  rowModesModel,
  setRowModesModel,
  handleOnCellClick,
  processRowUpdate,
}) => {
  const [pageSize, setPageSize] = useState(10);

  const handleRowEditStart = (params, event) => {
    event.defaultMuiPrevented = true;
  };

  const handleRowEditStop = (params, event) => {
    event.defaultMuiPrevented = true;
  };

  // const processRowUpdate = async (newRow) => {
  //   console.log(newRow);
  //   try {
  //     const res = await axios.put(
  //       "http://localhost:8000/api/toyProduct/",
  //       newRow
  //     );
  //     console.log(res.data);
  //   } catch (error) {
  //     console.log(error);
  //   }

  //   const updatedRow = { ...newRow, isNew: false };
  //   setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)));
  //   return updatedRow;
  // };

  return (
    <div className="mainProduct">
      <Box
        className="box"
        sx={{
          height: height,
          width: "100%",
        }}
        style={{
          cursor: "pointer",
        }}
      >
        <DataGrid
          className="datagid"
          columns={columns}
          rows={rows}
          getRowId={(row) => row.id}
          pagination
          pageSize={pageSize}
          onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
          rowsPerPageOptions={[10, 20, 40]}
          editMode="row"
          rowModesModel={rowModesModel}
          onRowModesModelChange={(newModel) => setRowModesModel(newModel)}
          onRowEditStart={handleRowEditStart}
          onRowEditStop={handleRowEditStop}
          processRowUpdate={processRowUpdate}
          experimentalFeatures={{ newEditingApi: true }}
          onCellClick={handleOnCellClick}
        />
      </Box>
    </div>
  );
};

export default Table;
