import { GridColDef } from "@mui/x-data-grid";

export const columns: GridColDef[] = [
  {
    field: "name",
    headerName: "Name",
    flex: 1.5,
    minWidth: 200,
    filterable: false,
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
