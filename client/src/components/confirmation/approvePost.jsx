import * as React from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Button } from "@mui/material";
import { approveNewPost } from "../../features/posts/postSlice";

import { useDispatch } from "react-redux";

export default function ApprovePost({ open, handleClose, postId }) {
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
          {"Are you sure want to Approve?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            This action can not be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="error">
            Cancel
          </Button>
          <Button
            onClick={() => {
              dispatch(approveNewPost(postId));
              //console.log(postId);
              handleClose();
            }}
            autoFocus
          >
            Approve
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
