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
import { downVotePost, upVotePost } from "../../features/posts/postSlice";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import PostMenu from "./PostMenu";
import Comments from "./Comments";
import DoneIcon from "@mui/icons-material/Done";
import CommentIcon from "@mui/icons-material/Comment";
import FlexBetween from "../customMUI/FlexBetween";

const Post = ({ post }) => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const [viewComments, setViewComments] = useState(false);

  const handleDownVote = () => {
    try {
      if (!user) return navigate("/login");
      dispatch(downVotePost(post._id));
    } catch (error) {
      console.log(error);
    }
  };
  const handleUpVote = () => {
    try {
      if (!user) return navigate("/login");

      dispatch(upVotePost(post._id));
    } catch (error) {
      console.log(error);
    }
  };
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
          onClick={() => navigate(`/user/${post.author._id}`)}
        >
          <Avatar
            src={post.author.imageURL ? post.author.imageURL : ""}
            sx={{ width: 32, height: 32 }}
            alt={post.author.firstName}
          />
          <Box>
            <Typography variant="h3" fontWeight="500">
              {post.author.firstName} {post.author.lastName}
            </Typography>
            <ReactTimeAgo date={new Date(post.createdAt)} locale="en-US" />
          </Box>
        </Box>
        <Box>
          <PostMenu authorId={post.author._id} post={post} />
        </Box>
      </Box>
      <Box>
        <Typography variant="body1">{post.description}</Typography>
      </Box>
      <Box>
        <img
          src={post.imageURL}
          alt={post.title}
          style={{
            width: "100%",
            borderRadius: "0.75rem",
          }}
        />
      </Box>
      <FlexBetween>
        <Box display="flex" gap="1rem">
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              width: "100px",
              backgroundColor: theme.palette.primary.light,
              borderRadius: "0.75rem",
            }}
          >
            <Checkbox
              icon={<ThumbUpIcon style={{ color: "#b2b2b2" }} />}
              checkedIcon={
                <ThumbUpIcon style={{ color: theme.palette.primary.main }} />
              }
              onChange={handleUpVote}
              checked={user && post.upVotes.includes(user.userData._id)}
              sx={{
                "&:hover": {
                  transform: "scale(1.5)",
                },
              }}
            />

            <Typography variant="body1">{post.netVotes}</Typography>
            <Checkbox
              icon={<ThumbDownIcon style={{ color: "#b2b2b2" }} />}
              checkedIcon={
                <ThumbDownIcon style={{ color: theme.palette.warning.main }} />
              }
              onChange={handleDownVote}
              checked={user && post.downVotes.includes(user.userData._id)}
              sx={{
                "&:hover": {
                  transform: "scale(1.5)",
                },
              }}
            />
          </Box>
          <Box
            display="flex"
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-around",
              width: "140px",
              backgroundColor: theme.palette.primary.light,
              borderRadius: "0.75rem",
              padding: "0.25rem 0.5rem 0.25rem 0.5rem",
              "&:hover": { cursor: "pointer" },
            }}
            onClick={() => setViewComments((state) => !state)}
          >
            <CommentIcon color="primary" />
            <Typography variant="body1">
              Comments ({post.comments.length})
            </Typography>
          </Box>
        </Box>
        {post.status === "approved" && (
          <Box>
            <Chip
              label="Approved Post"
              icon={<DoneIcon fontSize="small" />}
              variant="outlined"
              color="primary"
              width="100%"
            />
          </Box>
        )}
      </FlexBetween>

      {viewComments && <Comments post={post} />}
    </Box>
  );
};

export default Post;
