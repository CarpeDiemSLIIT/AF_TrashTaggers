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
import WidgetWrapper from "../../components/customMUI/WidgetWrapper";
import { useEffect } from "react";
import FlexBetween from "../../components/customMUI/FlexBetween";
import EditProfile from "./EditProfile";
import Post from "../../components/Posts/Post";
import { getAllPosts } from "../../features/posts/postSlice";
import { refreshUser, reset } from "../../features/auth/authSlice.js";
import RecyclingIcon from "@mui/icons-material/Recycling";
import MilitaryTechIcon from "@mui/icons-material/MilitaryTech";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import EditProfileImage from "./EditProfileImage";
import ChangePassword from "./ChangePassword";

const Profile = () => {
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
    dispatch(getAllPosts());
    return () => {
      reset();
    };
  }, []);
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
    <Box display="flex" gap="1rem" flexDirection="column">
      <Box display="flex" alignItems="center">
        <IconButton
          color="inherit"
          onClick={() => {
            navigate("/");
          }}
        >
          <ArrowBack fontSize="large" />
        </IconButton>

        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          {firstName} {lastName}
        </Typography>
      </Box>
      <WidgetWrapper>
        <FlexBetween>
          <Box
            display="flex"
            alignItems="center"
            gap="1rem"
            width="100%"
            padding="0 2rem 0 0 "
          >
            <EditProfileImage />
            <Box
              display="flex"
              alignItems="start"
              gap="1rem"
              width="100%"
              flexDirection="column"
            >
              <Typography variant="h2" fontWeight="500">
                {firstName} {lastName}
              </Typography>
              <FlexBetween width={{ xs: "100%", lg: "80%" }}>
                <FlexBetween>
                  <RecyclingIcon /> Green Points : {points}
                </FlexBetween>
                <FlexBetween>
                  <MilitaryTechIcon />
                  Level {level}
                </FlexBetween>

                <FlexBetween>
                  <CalendarMonthIcon />
                  Joined on {formattedDate}
                </FlexBetween>
              </FlexBetween>
              <Typography variant="body1">
                {bio
                  ? bio
                  : "No bio yet? Lets change that. Click on the edit button and add a bio."}
              </Typography>
            </Box>
          </Box>
          <Box
            display="flex"
            flexDirection="column"
            alignItems="end"
            gap="0.25rem"
          >
            <EditProfile />
            <ChangePassword />
          </Box>
        </FlexBetween>
      </WidgetWrapper>
      {posts.length > 0 &&
        posts
          .filter((post) => post.author._id === user.userData._id)
          .map((post) => <Post post={post} key={post._id} />)}
    </Box>
  );
};

export default Profile;
