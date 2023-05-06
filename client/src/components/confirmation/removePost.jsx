import * as React from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Button } from "@mui/material";
import { rejectNewPost } from "../../features/posts/postSlice";

import { useDispatch } from "react-redux";
import { resolveReportRemovePost } from "../../features/report/reportSlice";

export default function RemovePost({ open, handleClose, postID, reportID }) {
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
          {"Are you sure want to Remove Post?"}
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
              dispatch(
                resolveReportRemovePost({ reportId: reportID, postId: postID })
              );
              handleClose();
            }}
            autoFocus
          >
            Remove
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
