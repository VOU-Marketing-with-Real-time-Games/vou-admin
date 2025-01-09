import React, { useCallback, useState } from "react";
import {
  DataGrid,
  GridRowsProp,
  GridToolbarContainer,
  GridToolbarFilterButton,
  GridToolbarQuickFilter,
} from "@mui/x-data-grid";
import { columns as initialColumns } from "./accountsColumnsConfig";
import Button from "@mui/material/Button";
import { Add } from "@mui/icons-material";
import { Backdrop, Box, Modal } from "@mui/material";
import AddAccountForm from "../modals-content/AddAccountForm";
import userApi from "../../api/user.api";
import { IFullUser } from "../../types/user.type";
import { useQuery } from "@tanstack/react-query";
import { getActionColumn } from "./ActionColumn";
import AccountInfor from "../modals-content/AccountInfor.tsx";

declare module "@mui/x-data-grid" {
  interface ToolbarPropsOverrides {
    setFilterButtonEl: React.Dispatch<React.SetStateAction<HTMLButtonElement | null>>;
  }
}

export default function AccountsDataGrid() {
  const [rows, setRows] = useState<GridRowsProp>([]);
  const [openForm, setOpenForm] = useState(false);
  const [open, setOpen] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState<string | number | null>(null);

  const handleOpen = (id: string | number) => {
    setSelectedUserId(id);
    setOpen(true);
  };
  const handleClose = () => setOpen(false);

  const handleOpenForm = () => setOpenForm(true);
  const handleCloseForm = () => setOpenForm(false);

  const transformedRows = useCallback((users: IFullUser[]): GridRowsProp => {
    return users.map((user) => ({
      id: user.id,
      fullname: user.fullName,
      status: user.status,
      username: user.username,
      email: user.email,
      role: user.role,
      phoneNumber: user.phoneNumber,
    }));
  }, []);

  const { refetch } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const response: IFullUser[] = await userApi.getAllUsers();
      setRows(transformedRows(response));
      return response;
    },
  });

  const CustomToolbar = React.memo(() => {
    return (
      <GridToolbarContainer sx={{ display: "flex", justifyContent: "space-between" }}>
        <GridToolbarFilterButton />
        <Box>
          <GridToolbarQuickFilter />
          <Button color="primary" startIcon={<Add />} sx={{ marginLeft: "20px" }} onClick={handleOpenForm}>
            New Account
          </Button>
        </Box>
      </GridToolbarContainer>
    );
  });

  CustomToolbar.displayName = "CustomToolbar";

  const handleFormSuccess = () => {
    setOpenForm(false);
    refetch();
  };

  const columns = [...initialColumns, getActionColumn({ handleOpen })];

  return (
    <>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={openForm}
        onClose={handleCloseForm}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <AddAccountForm onSuccess={handleFormSuccess} />
      </Modal>
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
        {selectedUserId === null ? <div></div> : <AccountInfor userId={selectedUserId} />}
      </Modal>
      <DataGrid
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
        slots={{
          toolbar: CustomToolbar,
        }}
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
