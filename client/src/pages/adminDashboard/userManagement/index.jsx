import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { reset, getAllUsers } from "../../../features/users/userSlice";
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
    <div>
      UserManagement
      <p>{JSON.stringify(allUsers)}</p>
    </div>
  );
};

export default UserManagement;
