import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  Box,
  Typography,
  Button,
  Avatar,
  IconButton,
  Backdrop,
  CircularProgress,
} from "@mui/material";
import { ArrowBack } from "@mui/icons-material";
import WidgetWrapper from "../../components/customMUI/WidgetWrapper";
import { useEffect } from "react";
import axios from "axios";
import RecyclingIcon from "@mui/icons-material/Recycling";
import MilitaryTechIcon from "@mui/icons-material/MilitaryTech";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import { getAllPosts, reset } from "../../features/posts/postSlice";

import FlexBetween from "../../components/customMUI/FlexBetween";
import Post from "../../components/Posts/Post";
import { toast } from "react-toastify";

const AuthorProfile = () => {
  const { userId } = useParams();
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  const { posts, isError, message, isSuccess, isLoading } = useSelector(
    (state) => state.post
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const getUser = async () => {
    const response = await axios.get(
      "http://localhost:3001/api/users/profile/" + userId
    );
    if (response.status == 200) setUser(response.data);
    else {
      setError(response.data.message);
      toast.error(response.data.message);
    }
  };

  useEffect(() => {
    dispatch(getAllPosts());
    getUser();

    return () => {
      reset();
    };
  }, []);

  if (!user && !error) {
    return (
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={true}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    );
  }
  if (error) {
    return <>{error}</>;
  }

  const {
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
  } = user;
  const date = new Date(dateJoined);
  const options = { year: "numeric", month: "long", day: "numeric" };
  const formattedDate = date.toLocaleDateString("en-GB", options);
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
            <Avatar
              alt={firstName}
              src={imageURL}
              sx={{ height: "5rem", width: "5rem" }}
            />
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
              <Typography variant="body1">{bio ? bio : ""}</Typography>
            </Box>
          </Box>
        </FlexBetween>
      </WidgetWrapper>
      {posts.length > 0 &&
        posts
          .filter((post) => post.author._id === user._id)
          .map((post) => <Post post={post} key={post._id} />)}
    </Box>
  );
};

export default AuthorProfile;
