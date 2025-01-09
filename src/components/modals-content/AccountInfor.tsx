import { forwardRef } from "react";
import Typography from "@mui/material/Typography";
import MuiCard from "@mui/material/Card";
import { styled } from "@mui/material/styles";

const Card = styled(MuiCard)(({ theme }) => ({
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  backgroundColor: theme.palette.background.default,
  display: "flex",
  flexDirection: "column",
  alignSelf: "center",
  width: "30%",
  height: "80%",
  overflow: "scroll",
  scrollableY: false,
  padding: theme.spacing(4),
  gap: theme.spacing(2),
  margin: "auto",
  boxShadow: "hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px",
  [theme.breakpoints.up("md")]: {
    width: "40%",
  },
  ...theme.applyStyles("dark", {
    backgroundColor: theme.palette.background.paper,
    boxShadow: "hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.08) 0px 15px 35px -5px",
  }),
}));

const AccountInfor = forwardRef<HTMLDivElement>((ref) => {
  return (
    <Card ref={ref} variant="outlined">
      <Typography component="h1" variant="h5" sx={{ width: "100%", fontSize: "1.5rem", textAlign: "center" }}>
        CREATE NEW ACCOUNT
      </Typography>
    </Card>
  );
});

AccountInfor.displayName = "AccountInfor";

export default AccountInfor;
