import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CloseIcon from "@mui/icons-material/Close";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  IconButton,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import WidgetWrapper from "./customMUI/WidgetWrapper";
import FlexBetween from "./customMUI/FlexBetween";
import { useNavigate } from "react-router-dom";

export default function AdminSidebar() {
  const dispatch = useDispatch();
  const { palette } = useTheme();
  return (
    <Box
      sx={{
        backgroundColor: palette.background.alt,
        borderRadius: "0.75rem",
      }}
    >
      <Selection
        name="Post Management "
        url="admin-dashboard/post-management"
      />
      <Divider />

      <Selection
        name="Report Management "
        url="admin-dashboard/report-management"
      />
      <Divider />
      <Typography
        fontWeight="bold"
        fontSize="20px"
        textAlign={"left"}
        sx={{ marginLeft: "5%" }}
      >
        User Management
      </Typography>


      <Selection
        name="&nbsp;&nbsp;&nbsp;&nbsp;Active Users "
        url="admin-dashboard/user-management"
      />
      <Selection
        name="&nbsp;&nbsp;&nbsp;&nbsp;Suspended Users"
        url="admin-dashboard/user-management-suspend"
      />
      <Divider />
      <Selection
        name="Event Management"
        url="admin-dashboard/event-management"
      />
    </Box>
  );
}

const Selection = ({ name, url }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { palette } = useTheme();
  const primaryLight = palette.primary.light;
  const primaryDark = palette.primary.dark;
  const main = palette.neutral.main;
  const medium = palette.neutral.medium;

  return (
    <Box
      width="100%"
      onClick={() => {
        navigate(`/${url}`);
      }}
      sx={{
        "&:hover": {
          backgroundColor: palette.primary.light,
          cursor: "pointer",
        },
      }}
      padding="1.0rem"
    >
      <Typography variant="h5" color={palette.neutral.dark}>
        {name}
      </Typography>
    </Box>
  );
};
