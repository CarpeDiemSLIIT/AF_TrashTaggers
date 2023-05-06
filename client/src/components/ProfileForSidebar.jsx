import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  Button,
  Avatar,
  IconButton,
  Stack,
  useTheme,
  Badge,
} from "@mui/material";
import { ArrowBack } from "@mui/icons-material";
import WidgetWrapper from "./customMUI/WidgetWrapper";
import { useEffect } from "react";
import FlexBetween from "./customMUI/FlexBetween";
import Post from "./Posts/Post";
import { refreshUser, reset } from "../features/auth/authSlice.js";
import RecyclingIcon from "@mui/icons-material/Recycling";
import MilitaryTechIcon from "@mui/icons-material/MilitaryTech";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";

const ProfileForSidebar = () => {
  const { user } = useSelector((state) => state.auth);
  const { posts, isError, message, isSuccess, isLoading } = useSelector(
    (state) => state.post
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const theme = useTheme();
  const date = new Date(user.userData.dateJoined);
  const options = { year: "numeric", month: "long", day: "numeric" };
  const formattedDate = date.toLocaleDateString("en-GB", options);

  useEffect(() => {
    dispatch(refreshUser());
    return () => {
      reset();
    };
  }, [posts]);

  if (!user) return <div>loading...</div>;
  const {
    badges,
    dateJoined,
    bio,
    email,
    firstName,
    imageURL,
    lastName,
    level,
    points,
    role,
    status,
  } = user.userData;
  return (
    <Box
      padding="1rem"
      sx={{
        border: "1px solid",
        borderColor: theme.palette.divider,
        backgroundColor: theme.palette.background.alt,
        borderRadius: "0.75rem",
        boxShadow: "0px 0px 10px 0px rgba(0,0,0,0.1)",
        "&:hover": {
          transform: "scale(1.05)",
        },
      }}
    >
      <Box
        display="flex"
        alignItems="start"
        gap="1rem"
        width="100%"
        flexDirection="column"
      >
        <Box
          display="flex"
          gap="0.5rem"
          justifyContent="center"
          alignItems="center"
        >
          <Avatar src={imageURL} sx={{ width: "5rem", height: "5rem" }} />
          <Typography variant="h2" fontWeight="500">
            {firstName} {lastName}
          </Typography>
        </Box>
        <Box width="100%" display="flex" justifyContent="space-around">
          <FlexBetween>
            <RecyclingIcon /> Green Points : {points}
          </FlexBetween>
          <FlexBetween>
            <MilitaryTechIcon />
            Level {level}
          </FlexBetween>
        </Box>
        <Typography variant="body1" textAlign="center" width="100%">
          {bio ? bio : ""}
        </Typography>
      </Box>
    </Box>
  );
};

export default ProfileForSidebar;
