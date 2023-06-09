import { useState } from "react";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import { useNavigate } from "react-router-dom";
import * as React from "react";
import PropTypes from "prop-types";
import { styled } from "@mui/material/styles";
import CloseIcon from "@mui/icons-material/Close";
import {
  Delete,
  Edit,
  Flag,
  MoreVert,
  Report,
  Close,
} from "@mui/icons-material";
import Logout from "@mui/icons-material/Logout";
import { useDispatch, useSelector } from "react-redux";

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
  useTheme,
} from "@mui/material";

import { deletePost } from "../../features/posts/postSlice";
import EditPostFrom from "./EditPostFrom";
import ReportForm from "./ReportForm";

export default function PostMenu({ authorId, post }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const theme = useTheme();
  const user = useSelector((state) => state.auth.user);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  //For Report Part
  const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    "& .MuiDialogContent-root": {
      padding: theme.spacing(2),
    },
    "& .MuiDialogActions-root": {
      padding: theme.spacing(1),
    },
  }));

  function BootstrapDialogTitle(props) {
    const { children, onClose, ...other } = props;

    return (
      <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
        {children}
        {onClose ? (
          <IconButton
            aria-label="close"
            onClick={onClose}
            sx={{
              position: "absolute",
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
        ) : null}
      </DialogTitle>
    );
  }

  BootstrapDialogTitle.propTypes = {
    children: PropTypes.node,
    onClose: PropTypes.func.isRequired,
  };

  const [isDialogOpenReport, setIsDialogOpenReport] = useState(false);
  const handleReportClick = () => {
    if (!user) {
      navigate("/login");
    }

    setIsDialogOpenReport(true);
  };

  const handleReportConfirm = () => {
    setIsDialogOpenReport(false);
  };

  const handleReportClose = () => {
    setIsDialogOpenReport(false);
  };

  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleDeleteClick = () => {
    setIsDialogOpen(true);
  };

  const handleDeleteConfirm = () => {
    // Dispatch delete action here
    dispatch(deletePost(post._id));
    setIsDialogOpen(false);
  };

  const handleDeleteCancel = () => {
    setIsDialogOpen(false);
  };

  const [isDialogOpenEdit, setIsDialogOpenEdit] = useState(false);
  const handleEditClick = () => {
    setIsDialogOpenEdit(true);
  };
  const handelCancelEdit = () => {
    setIsDialogOpenEdit(false);
  };
  const handleCloseEdit = () => {
    setIsDialogOpenEdit(false);
  };
  return (
    <>
      <Box sx={{ display: "flex", alignItems: "center", textAlign: "center" }}>
        <Tooltip title="Account settings">
          <IconButton
            onClick={handleClick}
            size="small"
            sx={{ ml: 2 }}
            aria-controls={open ? "account-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
          >
            <MoreVert />
          </IconButton>
        </Tooltip>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1.5,
            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            "&:before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <MenuItem
          onClick={() => {
            handleReportClick();
          }}
        >
          <ListItemIcon>
            <Flag fontSize="small" />
          </ListItemIcon>
          Report
        </MenuItem>
        {user && user.userData._id === authorId && (
          <Box>
            <Divider />
            <MenuItem
              onClick={() => {
                handleClose();
                handleEditClick();
              }}
            >
              <ListItemIcon>
                <Edit fontSize="small" />
              </ListItemIcon>
              Edit
            </MenuItem>
            <MenuItem
              onClick={() => {
                handleClose();
                handleDeleteClick();
              }}
            >
              <ListItemIcon>
                <Delete fontSize="small" />
              </ListItemIcon>
              Delete
            </MenuItem>
          </Box>
        )}
      </Menu>
      <Dialog open={isDialogOpen} onClose={handleDeleteCancel}>
        <DialogTitle>Delete Item?</DialogTitle>
        <DialogContent>
          Are you sure you want to delete this post?
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteCancel}>Cancel</Button>
          <Button onClick={handleDeleteConfirm} autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog open={isDialogOpenEdit} onClose={handelCancelEdit}>
        <DialogTitle>
          <IconButton
            aria-label="handleCloseEdit"
            onClick={handleCloseEdit}
            sx={{
              position: "absolute",
              left: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <Close />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <EditPostFrom handleClose={handleCloseEdit} post={post} />
        </DialogContent>
      </Dialog>

      <BootstrapDialog
        onClose={handleReportClose}
        aria-labelledby="customized-dialog-title"
        open={isDialogOpenReport}
        width="100px"
      >
        <BootstrapDialogTitle
          id="customized-dialog-title"
          onClose={handleReportClose}
          sx={{ textAlign: "center" }}
        >
          🚩 Report this Post 🚩
        </BootstrapDialogTitle>
        <DialogContent dividers>
          <ReportForm post={post} handleClose={handleReportConfirm} />
        </DialogContent>
      </BootstrapDialog>
    </>
  );
}
