import { forwardRef, useState } from "react";
import Typography from "@mui/material/Typography";
import MuiCard from "@mui/material/Card";
import { styled } from "@mui/material/styles";
import { useQuery } from "@tanstack/react-query";
import { IFullUser } from "../../types/user.type";
import userApi from "../../api/user.api";
import toast from "react-hot-toast";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Avatar from "@mui/material/Avatar";

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
  maxHeight: "90%",
  height: "fit-content",
  padding: theme.spacing(4),
  gap: theme.spacing(2),
  margin: "auto",
  boxShadow: "hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px",
  [theme.breakpoints.up("md")]: {
    width: "40%",
  },
  ...(theme.applyStyles &&
    theme.applyStyles("dark", {
      backgroundColor: theme.palette.background.paper,
      boxShadow: "hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.08) 0px 15px 35px -5px",
    })),
}));

interface AccountInforProps {
  userId: string | number;
}

const AccountInfor = forwardRef<HTMLDivElement, AccountInforProps>(({ userId }, ref) => {
  const [user, setUser] = useState<IFullUser>();

  useQuery({
    queryKey: ["get-user"],
    queryFn: async () => {
      try {
        const fetchedUser = await userApi.getUserById(userId);
        setUser(fetchedUser);
      } catch (error) {
        console.log(error);
        toast.error("Failed to fetch user data");
      }
    },
  });

  return (
    <Card ref={ref} variant="outlined">
      <Typography component="h1" variant="h5" sx={{ width: "100%", fontSize: "1.5rem", textAlign: "center" }}>
        ACCOUNT INFORMATION
      </Typography>
      {user ? (
        <>
          <Avatar alt={user.fullName} src={user.avatar} sx={{ width: 100, height: 100, margin: "0 auto" }} />
          <TableContainer component={Paper}>
            <Table>
              <TableBody>
                <TableRow>
                  <TableCell sx={{ fontWeight: "bold", color: "primary.main" }}>User ID</TableCell>
                  <TableCell>{user.id}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell sx={{ fontWeight: "bold", color: "primary.main" }}>Full Name</TableCell>
                  <TableCell>{user.fullName}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell sx={{ fontWeight: "bold", color: "primary.main" }}>Email</TableCell>
                  <TableCell>{user.email}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell sx={{ fontWeight: "bold", color: "primary.main" }}>Username</TableCell>
                  <TableCell>{user.username}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell sx={{ fontWeight: "bold", color: "primary.main" }}>Role</TableCell>
                  <TableCell>{user.role}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell sx={{ fontWeight: "bold", color: "primary.main" }}>Phone Number</TableCell>
                  <TableCell>{user.phoneNumber}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell sx={{ fontWeight: "bold", color: "primary.main" }}>Status</TableCell>
                  <TableCell>{user.status}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </>
      ) : (
        <Typography component="p" variant="body1" sx={{ width: "100%", textAlign: "center" }}>
          Loading...
        </Typography>
      )}
    </Card>
  );
});

AccountInfor.displayName = "AccountInfor";

export default AccountInfor;
