import { Box } from '@mui/material';

import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios';

import React from 'react';
import { useState } from 'react';

const Table = ({
  columns,
  rows,
  setRows,
  height,
  rowModesModel,
  setRowModesModel,
  handleOnCellClick,
  processRowUpdate,
  apiRef,
}) => {
  const [pageSize, setPageSize] = useState(10);

  const handleRowEditStart = (params, event) => {
    event.defaultMuiPrevented = true;
  };

  const handleRowEditStop = (params, event) => {
    event.defaultMuiPrevented = true;
  };

  const handleRowModesModelChange = (newRowModesModel) => {
    setRowModesModel(newRowModesModel);
  };

  return (
    <div className="mainProduct">
      <Box
        className="box"
        sx={{
          height: height,
          width: '100%',
        }}
        style={{
          cursor: 'pointer',
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
          onRowModesModelChange={handleRowModesModelChange}
          onRowEditStart={handleRowEditStart}
          onRowEditStop={handleRowEditStop}
          processRowUpdate={processRowUpdate}
          experimentalFeatures={{ newEditingApi: true }}
          onCellClick={handleOnCellClick}
          getRowHeight={() => 'auto'}
          apiRef={apiRef}
          onCellEditCommit={(params) => setRows(params)}
        />
      </Box>
    </div>
  );
};

export default Table;
