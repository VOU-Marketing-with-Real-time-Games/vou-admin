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

export const rows: GridRowsProp = [
  {
    id: 1,
    name: "Brand A",
    image: "https://example.com/brand-a.jpg",
    status: "ENABLE",
    phoneNum: "123-456-7890",
    address: "123 Main St, City, Country",
  },
  {
    id: 2,
    name: "Brand B",
    image: "https://example.com/brand-b.jpg",
    status: "DISABLE",
    phoneNum: "987-654-3210",
    address: "456 Elm St, City, Country",
  },
  {
    id: 3,
    name: "Brand C",
    image: "https://example.com/brand-c.jpg",
    status: "ENABLE",
    phoneNum: "555-555-5555",
    address: "789 Oak St, City, Country",
  },
  {
    id: 4,
    name: "Brand D",
    image: "https://example.com/brand-d.jpg",
    status: "DISABLE",
    phoneNum: "111-222-3333",
    address: "101 Pine St, City, Country",
  },
  {
    id: 5,
    name: "Brand E",
    image: "https://example.com/brand-e.jpg",
    status: "ENABLE",
    phoneNum: "444-555-6666",
    address: "202 Maple St, City, Country",
  },
];
