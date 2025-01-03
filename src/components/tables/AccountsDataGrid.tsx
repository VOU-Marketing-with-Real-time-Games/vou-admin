import {
  DataGrid,
  GridActionsCellItem,
  GridColDef,
  GridRowId,
  GridRowModes,
  GridSlotProps,
  GridToolbarContainer,
  GridToolbarFilterButton,
  GridToolbarQuickFilter,
} from "@mui/x-data-grid";
import { columns as initialColumns, rows } from "./accountsData.tsx";
import React from "react";
import Button from "@mui/material/Button";
import { Add, Block, Cancel, Edit, Save } from "@mui/icons-material";
import { Backdrop, Box, Modal } from "@mui/material";
import Stack from "@mui/material/Stack";
import AddAccountForm from "../modals/AddAccountForm.tsx";

declare module "@mui/x-data-grid" {
  interface ToolbarPropsOverrides {
    setFilterButtonEl: React.Dispatch<React.SetStateAction<HTMLButtonElement | null>>;
  }
}

// const style = {
//   position: "absolute",
//   top: "50%",
//   left: "50%",
//   transform: "translate(-50%, -50%)",
//   width: 400,
//   bgcolor: "background.paper",
//   border: "2px solid #000",
//   borderRadius: 3,
//   boxShadow: 24,
//   p: 4,
// };

interface RowModesModel {
  [key: string]: { mode: GridRowModes };
}

export default function AccountsDataGrid() {
  const [rowModesModel, setRowModesModel] = React.useState<RowModesModel>({});
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleSaveClick = (id: GridRowId) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
  };
  const handleEditClick = (id: GridRowId) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
  };

  function CustomToolbar({ setFilterButtonEl }: GridSlotProps["toolbar"]) {
    return (
      <GridToolbarContainer sx={{ display: "flex", justifyContent: "space-between" }}>
        <GridToolbarFilterButton ref={setFilterButtonEl} />
        <Box>
          <GridToolbarQuickFilter />
          <Button color="primary" startIcon={<Add />} sx={{ marginLeft: "20px" }} onClick={handleOpen}>
            Add Account
          </Button>
        </Box>
      </GridToolbarContainer>
    );
  }

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
    renderCell: (params) => {
      const id = params.id as GridRowId;
      const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;
      if (isInEditMode) {
        return (
          <>
            <Stack>
              <GridActionsCellItem
                key="save"
                icon={<Save color={"secondary"} />}
                label="Save"
                onClick={handleSaveClick(id)}
              />
              <GridActionsCellItem
                key="cancel"
                icon={<Cancel color={"action"} />}
                label="Cancel"
                className="textPrimary"
                color="inherit"
              />
            </Stack>
          </>
        );
      }

      return (
        <>
          <GridActionsCellItem
            key="edit"
            icon={<Edit color={"primary"} />}
            label="Edit"
            className="textPrimary"
            color="inherit"
            onClick={handleEditClick(id)}
          />
          <GridActionsCellItem key="block" icon={<Block color={"error"} />} label="Block" color="warning" />
        </>
      );
    },
  };

  const columns = [...initialColumns, actionCol];

  return (
    <>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <AddAccountForm />
      </Modal>
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
    </>
  );
}
