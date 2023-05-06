import EditIcon from "@mui/icons-material/Edit";

import {
  Avatar,
  Box,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  TextField,
  Button,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import FlexBetween from "../../components/customMUI/FlexBetween";
import { useDispatch, useSelector } from "react-redux";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import CloseIcon from "@mui/icons-material/Close";
import { useNavigate } from "react-router";
import EditProfileForm from "./EditProfileForm.jsx";

const EditProfile = () => {
  const user = useSelector((state) => state.auth.user.userData);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  // useEffect(() => {}, []);

  const handleClose = (event, reason) => {
    setOpen(false);
  };

  return (
    <>
      <div>
        <Button
          variant="outlined"
          onClick={() => setOpen(true)}
          startIcon={<EditIcon />}
        >
          Edit&nbsp;Profile
        </Button>
      </div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>
          <IconButton
            aria-label="close"
            onClick={handleClose}
            sx={{
              position: "absolute",
              left: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <EditProfileForm />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default EditProfile;
