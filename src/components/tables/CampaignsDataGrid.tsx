import React, { useState } from "react";
import {
  DataGrid,
  GridRowsProp,
  GridSlotProps,
  GridToolbarContainer,
  GridToolbarFilterButton,
  GridToolbarQuickFilter,
} from "@mui/x-data-grid";
import { columns as initialColumns } from "./campaignsColumnsConfig.tsx";
import { ICampaign } from "../../types/campaign.type.ts";
import campaignApi from "../../api/campaign.api";
import { useQuery } from "@tanstack/react-query";
import { getActionColumn } from "./ActionColumn";
import { Backdrop, Modal } from "@mui/material";
import CampaignDetails from "../modals-content/CampaignDetails.tsx";

declare module "@mui/x-data-grid" {
  interface ToolbarPropsOverrides {
    setFilterButtonEl: React.Dispatch<React.SetStateAction<HTMLButtonElement | null>>;
  }
}

export default function CampaignsDataGrid() {
  const [rows, setRows] = useState<GridRowsProp>([]);
  const [open, setOpen] = useState(false);
  const [selectedCampaignId, setSelectedCampaignId] = useState<string | number | null>(null);

  const handleOpen = (id: string | number) => {
    setSelectedCampaignId(id);
    setOpen(true);
  };
  const handleClose = () => setOpen(false);

  const transformedRows = (campaigns: ICampaign[]): GridRowsProp => {
    return campaigns.map((campaign) => ({
      id: campaign.id,
      name: campaign.name,
      image: campaign.image,
      startDate: campaign.startDate,
      endDate: campaign.endDate,
      status: campaign.status,
      brandId: campaign.brandId,
    }));
  };

  const { refetch } = useQuery({
    queryKey: ["campaigns"],
    queryFn: async () => {
      const data = await campaignApi.getAllCampaigns();
      const campaigns: ICampaign[] = data.content;
      setRows(transformedRows(campaigns));
      return campaigns;
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

  const handleModalUpdateSuccess = () => {
    setOpen(false);
    refetch();
  };

  const columns = [...initialColumns, getActionColumn({ handleOpen })];

  return (
    <>
      <Modal
        tabIndex={-1}
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
        {selectedCampaignId === null ? (
          <div></div>
        ) : (
          <CampaignDetails id={selectedCampaignId} onSuccess={handleModalUpdateSuccess} />
        )}
      </Modal>
      <DataGrid
        rowHeight={120}
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
