import Chip from "@mui/material/Chip";
import { getGridSingleSelectOperators, GridColDef, GridRowsProp } from "@mui/x-data-grid";

function renderStatus(status: "ENABLE" | "DISABLE") {
  const colors: { [index: string]: "success" | "default" } = {
    ENABLE: "success",
    DISABLE: "default",
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
    field: "image",
    headerName: "Image",
    flex: 1,
    minWidth: 150,
    renderCell: (params) => <img src={params.value} alt="Campaign" style={{ width: 50, height: 50 }} />,
    align: "center",
    headerAlign: "center",
    filterable: false,
    getApplyQuickFilterFn: undefined,
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
    field: "phoneNum",
    headerName: "Phone Number",
    flex: 1,
    minWidth: 150,
    filterable: false,
    getApplyQuickFilterFn: undefined,
  },
  {
    field: "address",
    headerName: "Address",
    flex: 1,
    minWidth: 300,
    filterable: false,
    align: "left",
    headerAlign: "center",
  },
];

