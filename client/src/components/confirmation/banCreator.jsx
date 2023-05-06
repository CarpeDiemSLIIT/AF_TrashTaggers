import * as React from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Button } from "@mui/material";

import { suspendUsers } from "../../features/users/userSlice";

import { useDispatch } from "react-redux";
import { resolveReportBanCreator } from "../../features/report/reportSlice";

export default function BanCreator({ open, handleClose, reportID, authorID }) {
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
          {"Are you sure want to Suspend Creator?"}
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
              dispatch(
                resolveReportBanCreator({
                  reportId: reportID,
                  authorId: authorID,
                })
              );
              handleClose();
            }}
            autoFocus
          >
            Suspend
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
