import Chip from "@mui/material/Chip";
import { getGridSingleSelectOperators, GridColDef } from "@mui/x-data-grid";
import { format } from "date-fns";

function renderStatus(status: "PENDING" | "ACTIVE" | "ENDED" | "REJECTED") {
  const colors: { [index: string]: "primary" | "success" | "default" | "error" } = {
    PENDING: "primary",
    REJECTED: "error",
    ACTIVE: "success",
    ENDED: "default",
  };

  return <Chip label={status} color={colors[status]} size="small" />;
}

function renderDate(date: string) {
  return format(new Date(date), "dd/MM/yyyy");
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
    renderCell: (params) => <img src={params.value} alt="Campaign" style={{ width: "100%", borderRadius: "2px" }} />,
    align: "center",
    headerAlign: "center",
    filterable: false,
    getApplyQuickFilterFn: undefined,
  },
  {
    field: "startDate",
    headerName: "Start Date",
    flex: 1,
    minWidth: 150,
    renderCell: (params) => renderDate(params.value),
    align: "center",
    headerAlign: "center",
    filterable: false,
    getApplyQuickFilterFn: undefined,
  },
  {
    field: "endDate",
    headerName: "End Date",
    flex: 1,
    maxWidth: 150,
    renderCell: (params) => renderDate(params.value),
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
    valueOptions: ["PENDING", "ACTIVE", "ENDED", "REJECTED"],
    filterOperators: getGridSingleSelectOperators().filter((operator) => operator.value === "is"),
    getApplyQuickFilterFn: undefined,
  },
  {
    field: "brandId",
    headerName: "Brand ID",
    flex: 1,
    minWidth: 100,
    align: "center",
    headerAlign: "center",
    filterable: false,
    getApplyQuickFilterFn: undefined,
  },
];
