import React, { useState } from "react";
import {
  DataGrid,
  GridRowsProp,
  GridSlotProps,
  GridToolbarContainer,
  GridToolbarFilterButton,
  GridToolbarQuickFilter,
} from "@mui/x-data-grid";
import { columns as initialColumns } from "./brandsColumnsConfig.tsx";
import { IBrand } from "../../types/brand.type.ts";
import brandApi from "../../api/brand.api";
import { getActionColumn } from "./ActionColumn";
import { useQuery } from "@tanstack/react-query";
import { Backdrop, Modal } from "@mui/material";
import CampaignDetails from "../modals-content/CampaignDetails.tsx";

declare module "@mui/x-data-grid" {
  interface ToolbarPropsOverrides {
    setFilterButtonEl: React.Dispatch<React.SetStateAction<HTMLButtonElement | null>>;
  }
}

export default function BrandsDataGrid() {
  const [rows, setRows] = useState<GridRowsProp>([]);
  const [open, setOpen] = useState(false);

  const handleOpen = (id: string | number) => {
    console.log(id);
    setOpen(true);
  };
  const handleClose = () => setOpen(false);

  const transformedRows = (brands: IBrand[]): GridRowsProp => {
    return brands.map((brand) => ({
      id: brand.id,
      name: brand.name,
      field: brand.field,
      status: brand.status,
      enabled: brand.enabled,
      creator: brand.creator,
      createdAt: brand.createdAt,
    }));
  };

  useQuery({
    queryKey: ["brands"],
    queryFn: async () => {
      const brands: IBrand[] = await brandApi.getAllBrands();
      setRows(transformedRows(brands));
      return brands;
    },
  });

  function CustomToolbar({ setFilterButtonEl }: GridSlotProps["toolbar"]) {
    return (
      <GridToolbarContainer sx={{ display: "flex", justifyContent: "space-between" }}>
        <GridToolbarFilterButton ref={setFilterButtonEl} />
        <GridToolbarQuickFilter />
      </GridToolbarContainer>
    );
  }

  const columns = [...initialColumns, getActionColumn({ handleOpen })];

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
        <CampaignDetails />
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
