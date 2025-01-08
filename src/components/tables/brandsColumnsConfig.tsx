import Chip from "@mui/material/Chip";
import { getGridSingleSelectOperators, GridColDef } from "@mui/x-data-grid";

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
    field: "name",
    headerName: "Name",
    flex: 1.5,
    minWidth: 200,
    filterable: false,
  },
  {
    field: "status",
    headerName: "Status",
    flex: 1,
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
    field: "field",
    headerName: "Field",
    flex: 1,
    minWidth: 150,
    filterable: false,
    getApplyQuickFilterFn: undefined,
  },
  {
    field: "creator",
    headerName: "Owner",
    flex: 1,
    minWidth: 300,
    filterable: false,
    align: "left",
    headerAlign: "center",
  },
];
