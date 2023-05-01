import * as React from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Button } from "@mui/material";

import { reActiveUsers } from "../../features/users/userSlice";

import { useDispatch } from "react-redux";

export default function ReActiveUser({ open, handleClose, deleteId }) {
  const dispatch = useDispatch();

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Are you sure want to Re-Active?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            This action can be undone if you wish.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="error">
            Cancel
          </Button>
          <Button
            onClick={() => {
              dispatch(reActiveUsers(deleteId));
              handleClose();
            }}
            autoFocus
          >
            Re-Active
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
