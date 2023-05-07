import {
    Avatar,
    Box,
    Checkbox,
    Chip,
    Typography,
    useTheme,
  } from "@mui/material";
  import React, { useState } from "react";
  import { ArrowUpward, ArrowDownward } from "@mui/icons-material";
  import ReactTimeAgo from "react-time-ago";
  import { useDispatch } from "react-redux";
  import { useSelector } from "react-redux";
  import { useNavigate } from "react-router-dom";
  import ThumbDownIcon from "@mui/icons-material/ThumbDown";
  import ThumbUpIcon from "@mui/icons-material/ThumbUp";
  import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
//   import PostMenu from "../Posts/PostMenu";
import CeventMenu from "./EventMenu";
  // import Comments from "./Comments";
  import DoneIcon from "@mui/icons-material/Done";
  import CommentIcon from "@mui/icons-material/Comment";
  import FlexBetween from "../customMUI/FlexBetween";
  
  const Cevent = ({ event }) => {
    const dispatch = useDispatch();
    const theme = useTheme();
    const navigate = useNavigate();
    const { user } = useSelector((state) => state.auth);

  
    
    
    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: " column",
          padding: "0.5rem 0.5rem 0.5rem 0.5rem",
          backgroundColor: theme.palette.background.alt,
          borderRadius: "0.75rem",
          gap: "0.5rem",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "start",
            gap: "0.5rem",
            justifyContent: "space-between",
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "start",
              gap: "0.5rem",
              "&:hover": {
                cursor: "pointer",
              },
            }}
            onClick={() => navigate(`/user/${event.user._id}`)}
          >
            <Avatar
              src={event.user.imageURL ? event.user.imageURL : ""}
              sx={{ width: 32, height: 32 }}
              alt={event.user.firstName}
            />
            <Box>
              <Typography variant="body" fontWeight="300">
                {event.user.firstName} {event.user.lastName}
              </Typography>
              
              {/* <ReactTimeAgo date={new Date(event.createdAt)} locale="en-US" /> */}
            </Box>
          </Box>
          <Box>
            <CeventMenu authorId={event.user._id} post={event} />
          </Box>
        </Box>
        
        <Box>
        <Typography variant="h3 " fontWeight="500">{event.Title}</Typography>
          <Typography variant="body1">{event.description}</Typography>
        </Box>
        <Box>
          <img
            src={event.imageURL}
            alt={event.title}
            style={{
              width: "100%",
              borderRadius: "0.75rem",
            }}
          />
        </Box>
      
  
      </Box>
    );
  };
  
  export default Cevent;
  