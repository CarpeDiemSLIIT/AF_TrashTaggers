import {
    Avatar,
    Box,
    Dialog,
    DialogContent,
    DialogTitle,
    IconButton,
    TextField,
  } from "@mui/material";
  import React, { useState } from "react";
  import FlexBetween from "../../components/customMUI/FlexBetween";
  import { useDispatch, useSelector } from "react-redux";
  import AddCircleIcon from "@mui/icons-material/AddCircle";
  import CloseIcon from "@mui/icons-material/Close";
  import NewCeventForm from "./NewCeventForm";
  
  const NewCevent = () => {
    const user = useSelector((state) => state.auth.user);
    const dispatch = useDispatch();
  
    const [open, setOpen] = useState(false);
  
    const handleClose = (event, reason) => {
      // if (reason && reason == "backdropClick") return;
      setOpen(false);
    };
  
    return (
      <>
        <FlexBetween
          sx={{ width: "100%", gap: "29px" }}
          onClick={() => {
            setOpen(true);
          }}
        >
          <Avatar src={user?.imageURL} />
          <TextField
            label="Create your Own Event"
            multiline
            sx={{ width: "100%" }}
            disabled
          />
          <IconButton>
            <AddCircleIcon color="primary" fontSize="large" />
          </IconButton>
        </FlexBetween>
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
            <NewCeventForm handleClose={handleClose} />
          </DialogContent>
        </Dialog>
      </>
    );
  };
  
  export default NewCevent;