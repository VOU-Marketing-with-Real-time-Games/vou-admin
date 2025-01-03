import {
  DataGrid,
  GridActionsCellItem,
  GridColDef,
  GridSlotProps,
  GridToolbarContainer,
  GridToolbarFilterButton,
  GridToolbarQuickFilter,
} from "@mui/x-data-grid";
import { columns as initialColumns, rows } from "./brandsData.tsx";
import React from "react";
import { Block, Visibility } from "@mui/icons-material";

declare module "@mui/x-data-grid" {
  interface ToolbarPropsOverrides {
    setFilterButtonEl: React.Dispatch<React.SetStateAction<HTMLButtonElement | null>>;
  }
}

function CustomToolbar({ setFilterButtonEl }: GridSlotProps["toolbar"]) {
  return (
    <GridToolbarContainer sx={{ display: "flex", justifyContent: "space-between" }}>
      <GridToolbarFilterButton ref={setFilterButtonEl} />
      <GridToolbarQuickFilter />
    </GridToolbarContainer>
  );
}

export default function BrandsDataGrid() {
  const actionCol: GridColDef = {
    field: "action",
    headerName: "Action",
    sortable: false,
    width: 100,
    cellClassName: "actions",
    align: "center",
    headerAlign: "center",
    filterable: false,
    getApplyQuickFilterFn: undefined,
    renderCell: () => {
      return (
        <>
          <GridActionsCellItem
            key="edit"
            icon={<Visibility color={"primary"} />}
            label="Edit"
            className="textPrimary"
            color="inherit"
          />
          <GridActionsCellItem key="block" icon={<Block color={"error"} />} label="Block" color="warning" />
        </>
      );
    },
  };

  const columns = [...initialColumns, actionCol];
  return (
    <DataGrid
      autoHeight
      checkboxSelection
      rows={rows}
      columns={columns}
      getRowClassName={(params) => (params.indexRelativeToCurrentPage % 2 === 0 ? "even" : "odd")}
      initialState={{
        pagination: { paginationModel: { pageSize: 20 } },
      }}
      pageSizeOptions={[10, 20, 50]}
      disableColumnResize
      disableColumnMenu
      density="compact"
      slots={{ toolbar: CustomToolbar }}
      slotProps={{
        toolbar: {
          showQuickFilter: true,
        },
        filterPanel: {
          filterFormProps: {
            logicOperatorInputProps: {
              variant: "outlined",
              size: "small",
            },
            columnInputProps: {
              variant: "outlined",
              size: "small",
              sx: { mt: "auto" },
            },
            operatorInputProps: {
              variant: "outlined",
              size: "small",
              sx: { mt: "auto" },
            },
            valueInputProps: {
              InputComponentProps: {
                variant: "outlined",
                size: "small",
                sx: { mt: "auto" },
              },
            },
          },
        },
      }}
    />
  );
}
