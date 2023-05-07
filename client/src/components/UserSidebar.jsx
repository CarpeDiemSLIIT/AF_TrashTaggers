import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CloseIcon from "@mui/icons-material/Close";
import Profile from "./ProfileForSidebar";
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
import { Link, useNavigate } from "react-router-dom";
import PhotoCameraBackIcon from "@mui/icons-material/PhotoCameraBack";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import EscalatorWarningIcon from '@mui/icons-material/EscalatorWarning';
export default function Sidebar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { palette } = useTheme();
  const user = useSelector((state) => state.auth.user);
  return (
    <Box
      sx={{
        backgroundColor: palette.background.alt,
        borderRadius: "0.75rem",
      }}
    >
      <Link
        to="/profile"
        style={{
          textDecoration: "none",
          "&:hover": {
            textDecoration: "none",
          },
          color: "inherit",
        }}
      >
        {user && <Profile />}
      </Link>

      <Box
        width="100%"
        onClick={() => {
          navigate(`/`);
        }}
        sx={{
          "&:hover": {
            backgroundColor: palette.primary.light,
            transform: "scale(1.05)",
            cursor: "pointer",
          },
          display: "flex",
          gap: "1rem",
        }}
        padding="1.0rem"
      >
        <PhotoCameraBackIcon />
        <Typography variant="h5" color={palette.neutral.dark}>
          Feed
        </Typography>
      </Box>
      <Divider />
      <Box
        width="100%"
        onClick={() => {
          navigate(`/events`);
        }}
        sx={{
          "&:hover": {
            backgroundColor: palette.primary.light,
            transform: "scale(1.05)",
            cursor: "pointer",
          },
          display: "flex",
          gap: "1rem",
        }}
        padding="1.0rem"
      >
        <CalendarMonthIcon />
        <Typography variant="h5" color={palette.neutral.dark}>
          Events
        </Typography>
      </Box>
      <Divider />
      <Box
        width="100%"
        onClick={() => {
          navigate(`/join`);
        }}
        sx={{
          "&:hover": {
            backgroundColor: palette.primary.light,
            transform: "scale(1.05)",
            cursor: "pointer",
          },
          display: "flex",
          gap: "1rem",
        }}
        padding="1.0rem"
      >
        <EscalatorWarningIcon />
        <Typography variant="h5" color={palette.neutral.dark}>
          Join
        </Typography>
      </Box>
    </Box>
  );
}

const Selection = ({ name, url, Icon }) => {
  const dispatch = useDispatch();

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
      <Icon />
      <Typography variant="h5" color={palette.neutral.dark}>
        {name}
      </Typography>
    </Box>
  );
};
