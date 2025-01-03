import Chip from "@mui/material/Chip";
import { getGridSingleSelectOperators, GridColDef, GridRowsProp } from "@mui/x-data-grid";

function renderRole(role: string) {
  const roleColors: { [index: string]: "primary" | "secondary" | "default" } = {
    ADMIN: "primary",
    BRAND: "secondary",
    USER: "default",
  };

  return <Chip label={role} color={roleColors[role] || "default"} size="small" />;
}

function renderStatus(status: "ENABLE" | "DISABLE") {
  const colors: { [index: string]: "success" | "default" } = {
    ENABLE: "success",
    DISABLE: "default",
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
    field: "status",
    headerName: "Status",
    flex: 0.5,
    minWidth: 150,
    renderCell: (params) => renderStatus(params.value as any),
    align: "center",
    headerAlign: "center",
    type: "singleSelect",
    valueOptions: ["ENABLE", "DISABLE"],
    filterOperators: getGridSingleSelectOperators().filter((operator) => operator.value === "is"),
    getApplyQuickFilterFn: undefined,
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
    field: "phoneNum",
    headerName: "Phone Number",
    flex: 1,
    minWidth: 150,
    filterable: false,
    getApplyQuickFilterFn: undefined,
  },
];

export const rows: GridRowsProp = [
  {
    id: 1,
    fullname: "Le Minh Hoang",
    status: "ENABLE",
    username: "johndoe",
    email: "johndoe@example.com",
    role: "ADMIN",
    phoneNum: "123456789",
  },
  {
    id: 2,
    fullname: "Nguyen Van A",
    status: "DISABLE",
    username: "nguyenvana",
    email: "nguyenvana@example.com",
    role: "USER",
    phoneNum: "987654321",
  },
  {
    id: 3,
    fullname: "Nguyen Van B",
    status: "DISABLE",
    username: "nguyenvanb",
    email: "nguyenvana@example.com",
    role: "BRAND",
    phoneNum: "987654321",
  },
];

// export const operator: GridFilterOperator<any, number> = {
//   label: "From",
//   value: "from",
//   getApplyFilterFn: (filterItem, column) => {
//     if (!filterItem.field || !filterItem.value || !filterItem.operator) {
//       return null;
//     }
//
//     return (value, row, column, apiRef) => {
//       return Number(value) >= Number(filterItem.value);
//     };
//   },
//   InputComponent: RatingInputValue,
//   InputComponentProps: { type: "number" },
// };
