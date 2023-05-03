import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { reset, getAllSuspendUsers } from "../../../features/users/userSlice";
import CheckIcon from "@mui/icons-material/Check";
import {
  Avatar,
  Backdrop,
  Box,
  CircularProgress,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";
import ReActiveUser from "../../../components/confirmation/reActiveUser";
const SuspendedUsers = () => {
  const { allSuspendedUsers, isLoading, isSuccess, message, isError } =
    useSelector((state) => state.users);
  const [search, setSearch] = useState("");
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllSuspendUsers());
    return () => {
      dispatch(reset());
    };
  }, []);

  //for suspend users confirmation
  const [open, setOpen] = useState(false);
  const [deleteID, setDeleteID] = useState("");

  const handleClose = () => {
    setOpen(false);
  };

  const reActiveUser = (id) => {
    setDeleteID(id);
  };

  if (isLoading) {
    return (
      <>
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={true}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      </>
    );
  }

  return (
    <div>
      <h1>Suspended Users</h1>
      <Box sx={{ gridColumn: "span 4" }}>
        <TextField
          fullWidth
          label="Search...."
          onChange={(e) => setSearch(e.target.value)}
          id="fullWidth"
          InputProps={{
            style: {
              textAlign: "center",
              borderRadius: "10px",
              marginBottom: "10px",
              marginTop: "10px",
            },
          }}
        />
      </Box>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="center">User Image</TableCell>
              <TableCell align="center">Name&nbsp;</TableCell>
              <TableCell align="center">Email&nbsp;</TableCell>
              <TableCell align="center">Actions&nbsp;</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {allSuspendedUsers.length === 0 && (
              <TableRow>
                <TableCell colSpan={6} align="center">
                  No Users Found
                </TableCell>
              </TableRow>
            )}
            {allSuspendedUsers
              .filter((user) => {
                name = user.firstName + user.lastName;
                return search.toLowerCase() === ""
                  ? user
                  : name.toLowerCase().includes(search);
              })
              .map((allSuspendedUsers, index) => (
                <TableRow
                  key={allSuspendedUsers._id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row" align="center">
                    <Avatar
                      alt="User Image"
                      src={allSuspendedUsers.imageURL}
                      sx={{ width: 56, height: 56, margin: "auto" }}
                    />
                  </TableCell>
                  <TableCell align="center">
                    {allSuspendedUsers.firstName} {allSuspendedUsers.lastName}
                  </TableCell>
                  <TableCell align="center">
                    {allSuspendedUsers.email}
                  </TableCell>
                  <TableCell align="center">
                    <IconButton
                      aria-label="delete"
                      color="primary"
                      title="Re-Active"
                      onClick={() => {
                        setOpen(true);
                        reActiveUser(allSuspendedUsers._id);
                      }}
                    >
                      <CheckIcon />
                    </IconButton>
                    <ReActiveUser
                      open={open}
                      handleClose={handleClose}
                      deleteId={deleteID}
                    />
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default SuspendedUsers;
