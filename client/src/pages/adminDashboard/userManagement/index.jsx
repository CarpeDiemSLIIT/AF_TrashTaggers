import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { reset, getAllUsers } from "../../../features/users/userSlice";

import DoDisturbIcon from "@mui/icons-material/DoDisturb";

import {
  Avatar,
  Backdrop,
  CircularProgress,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import ConfirmSuspend from "../../../components/confirmation";

const UserManagement = () => {
  const { allUsers, isLoading, isSuccess, message, isError } = useSelector(
    (state) => state.users
  );
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllUsers());
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

  const suspendUser = (id) => {
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
      <h1>Active Users</h1>

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
            {allUsers.length === 0 && (
              <TableRow>
                <TableCell colSpan={6} align="center">
                  No Users Found
                </TableCell>
              </TableRow>
            )}
            {allUsers.map((allUsers) => (
              <TableRow
                key={allUsers._id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row" align="center">
                  <Avatar
                    alt="User Image"
                    src={allUsers.imageURL}
                    sx={{ width: 56, height: 56, margin: "auto" }}
                  />
                </TableCell>
                <TableCell align="center">
                  {allUsers.firstName} {allUsers.lastName}
                </TableCell>
                <TableCell align="center">{allUsers.email}</TableCell>
                <TableCell align="center">
                  <IconButton
                    aria-label="delete"
                    color="error"
                    title="Suspend"
                    onClick={() => {
                      setOpen(true);
                      suspendUser(allUsers._id);
                    }}
                  >
                    <DoDisturbIcon />
                  </IconButton>
                  <ConfirmSuspend
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

export default UserManagement;
