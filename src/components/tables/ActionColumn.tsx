import { GridActionsCellItem, GridColDef, GridRowId, GridRowModes } from "@mui/x-data-grid";
import { Edit, Save, Cancel, Block, Visibility } from "@mui/icons-material";
import Stack from "@mui/material/Stack";

interface ActionColumnProps {
  rowModesModel: { [key: string]: { mode: GridRowModes } };
  handleSaveClick: (id: GridRowId) => () => void;
  handleEditClick: (id: GridRowId) => () => void;
  handleOpen?: () => void;
}

export const getActionColumn = ({
  rowModesModel,
  handleSaveClick,
  handleEditClick,
  handleOpen,
}: ActionColumnProps): GridColDef => ({
  field: "action",
  headerName: "Action",
  sortable: false,
  width: 100,
  cellClassName: "actions",
  align: "center",
  headerAlign: "center",
  filterable: false,
  getApplyQuickFilterFn: undefined,
  renderCell: (params) => {
    const id = params.id as GridRowId;
    const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;
    if (isInEditMode) {
      return (
        <Stack>
          <GridActionsCellItem
            key="save"
            icon={<Save color={"secondary"} />}
            label="Save"
            onClick={handleSaveClick(id)}
          />
          <GridActionsCellItem
            key="cancel"
            icon={<Cancel color={"action"} />}
            label="Cancel"
            className="textPrimary"
            color="inherit"
          />
        </Stack>
      );
    }

    return (
      <>
        <GridActionsCellItem
          key="edit"
          icon={<Edit color={"primary"} />}
          label="Edit"
          className="textPrimary"
          color="inherit"
          onClick={handleEditClick(id)}
        />
        <GridActionsCellItem key="block" icon={<Block color={"error"} />} label="Block" color="warning" />
        {handleOpen && <GridActionsCellItem key="watch" icon={<Visibility />} label="Watch" onClick={handleOpen} />}
      </>
    );
  },
});
