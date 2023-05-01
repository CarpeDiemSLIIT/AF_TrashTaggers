import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { reset, getAllUsers } from "../../../features/users/userSlice";
import { Box, Typography } from "@mui/material";
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

  console.log(allUsers);
  return (
    <Box>
      UserManagement
      <Typography>{JSON.stringify(allUsers)}</Typography>
    </Box>
  );
};

export default UserManagement;
