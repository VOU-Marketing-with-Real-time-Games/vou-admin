import Chip from "@mui/material/Chip";
import { getGridSingleSelectOperators, GridColDef } from "@mui/x-data-grid";

function renderRole(role: string) {
  const roleColors: { [index: string]: "primary" | "secondary" | "default" } = {
    ADMIN: "primary",
    BRAND: "secondary",
    USER: "default",
  };

  return <Chip label={role} color={roleColors[role] || "default"} size="small" />;
}

function renderStatus(status: "ACTIVE" | "INACTIVE" | "BANNED") {
  const colors: { [index: string]: "success" | "default" | "error" } = {
    ACTIVE: "success",
    INACTIVE: "default",
    BANNED: "error",
  };

  return <Chip label={status} color={colors[status]} size="small" />;
}

export const columns: GridColDef[] = [
  {
    field: "fullname",
    headerName: "Full Name",
    flex: 1.5,
    minWidth: 200,
    filterable: false,
  },

  {
    field: "username",
    headerName: "Username",
    flex: 1,
    minWidth: 150,
    align: "center",
    headerAlign: "center",
    filterable: false,
  },
  {
    field: "email",
    headerName: "Email",
    flex: 1.5,
    minWidth: 200,
    filterable: false,
    getApplyQuickFilterFn: undefined,
  },
  {
    field: "role",
    headerName: "Role",
    flex: 1,
    minWidth: 100,
    renderCell: (params) => renderRole(params.value as any),
    align: "center",
    headerAlign: "center",
    type: "singleSelect",
    valueOptions: ["ADMIN", "BRAND", "USER"],
    getApplyQuickFilterFn: undefined,
  },
  {
    field: "status",
    headerName: "Status",
    flex: 0.5,
    minWidth: 150,
    renderCell: (params) => renderStatus(params.value as any),
    align: "center",
    headerAlign: "center",
    type: "singleSelect",
    valueOptions: ["ACTIVE", "INACTIVE", "BANNED"],
    filterOperators: getGridSingleSelectOperators().filter((operator) => operator.value === "is"),
    getApplyQuickFilterFn: undefined,
  },
  {
    field: "phoneNumber",
    headerName: "Phone Number",
    flex: 1,
    minWidth: 150,
    filterable: false,
    getApplyQuickFilterFn: undefined,
  },
];
