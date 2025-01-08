import React, { useState } from "react";
import {
  DataGrid,
  GridRowId,
  GridRowModes,
  GridRowsProp,
  GridSlotProps,
  GridToolbarContainer,
  GridToolbarFilterButton,
  GridToolbarQuickFilter,
} from "@mui/x-data-grid";
import { columns as initialColumns } from "./accountsColumnsConfig";
import Button from "@mui/material/Button";
import { Add } from "@mui/icons-material";
import { Backdrop, Box, Modal } from "@mui/material";
import AddAccountForm from "../modals/AddAccountForm";
import userApi from "../../api/user.api";
import { IFullUser } from "../../types/user.type";
import { useQuery } from "@tanstack/react-query";
import { getActionColumn } from "./ActionColumn";
import CircularProgress from "@mui/material/CircularProgress";

declare module "@mui/x-data-grid" {
  interface ToolbarPropsOverrides {
    setFilterButtonEl: React.Dispatch<React.SetStateAction<HTMLButtonElement | null>>;
  }
}

interface RowModesModel {
  [key: string]: { mode: GridRowModes };
}

export default function AccountsDataGrid() {
  const [rows, setRows] = useState<GridRowsProp>([]);
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

  const transformedRows = (users: IFullUser[]): GridRowsProp => {
    return users.map((user) => ({
      id: user.id,
      fullname: user.fullName,
      status: user.status,
      username: user.username,
      email: user.email,
      role: user.role,
      phoneNumber: user.phoneNumber,
    }));
  };

  const { isLoading } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const response: IFullUser[] = await userApi.getAllUsers();
      setRows(transformedRows(response));
      return response;
    },
  });

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

  const columns = [...initialColumns, getActionColumn({ rowModesModel, handleSaveClick, handleEditClick })];

  if (isLoading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "start", height: "100vh" }}>
        <CircularProgress />
      </Box>
    );
  }

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
