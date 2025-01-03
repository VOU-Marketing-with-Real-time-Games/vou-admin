import React, { useEffect, useState } from "react";
import {
  DataGrid,
  GridActionsCellItem,
  GridColDef,
  GridRowsProp,
  GridSlotProps,
  GridToolbarContainer,
  GridToolbarFilterButton,
  GridToolbarQuickFilter,
} from "@mui/x-data-grid";
import { Visibility } from "@mui/icons-material";
import { Backdrop, Modal } from "@mui/material";
import CampaignDetails from "../modals/CampaignDetails.tsx";
import campaignApi from "../../api/campaign.api.ts";
import { ICampaignRespondDto } from "../../types/campaign.type.ts";
import { columns as initialColumns } from "./campaignsColumnsConfig.tsx";

declare module "@mui/x-data-grid" {
  interface ToolbarPropsOverrides {
    setFilterButtonEl: React.Dispatch<React.SetStateAction<HTMLButtonElement | null>>;
  }
}

function CustomToolbar({ setFilterButtonEl }: GridSlotProps["toolbar"]) {
  return (
    <GridToolbarContainer sx={{ display: "flex", justifyContent: "space-between" }}>
      <GridToolbarFilterButton ref={setFilterButtonEl} />
      <GridToolbarQuickFilter />
    </GridToolbarContainer>
  );
}

export default function CampaignsDataGrid() {
  const [rows, setRows] = useState<GridRowsProp>([]);
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    const fetchCampaigns = async () => {
      try {
        const data = await campaignApi.getAllCampaigns();
        const campaigns: ICampaignRespondDto[] = data.content;
        const transformedRows: GridRowsProp = campaigns.map((campaign) => ({
          id: campaign.id,
          name: campaign.name,
          image: campaign.image,
          startDate: campaign.startDate,
          endDate: campaign.endDate,
          status: campaign.status,
          brandId: campaign.brandId,
        }));
        setRows(transformedRows);
      } catch (error) {
        console.error("Failed to fetch campaigns", error);
      }
    };

    fetchCampaigns().then();
  }, []);

  const actionCol: GridColDef = {
    field: "actions",
    headerName: "Actions",
    flex: 1,
    minWidth: 100,
    align: "center",
    headerAlign: "center",
    filterable: false,
    getApplyQuickFilterFn: undefined,
    renderCell: () => <GridActionsCellItem key="watch" icon={<Visibility />} label="Watch" onClick={handleOpen} />,
  };

  const columns = [...initialColumns, actionCol];

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
        rowHeight={120}
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