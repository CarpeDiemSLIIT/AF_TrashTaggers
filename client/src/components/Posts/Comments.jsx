import React from "react";
import AddNewComment from "./AddNewComment";
import { Avatar, Box, Typography, useTheme } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Comments = ({ post }) => {
  const comments = post.comments;
  const commentsCount = comments.length;
  const theme = useTheme();
  return (
    <Box
      display="flex"
      flexDirection="column"
      gap="0.5rem"
      sx={{
        backgroundColor: theme.palette.primary.light,
        borderRadius: "0.75rem",
        padding: "0.75rem",
      }}
    >
      <AddNewComment postId={post._id} />
      {comments.map((comment) => (
        <CommentItem key={comment._id} comment={comment} />
      ))}
    </Box>
  );
};

export default Comments;

const CommentItem = ({ comment }) => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "start",
        gap: "0.5rem",
        padding: "0.5rem",
        border: "1px solid #ccc",
      }}
    >
      <Avatar
        src={comment.user.ImageURL ? comment.user.ImageURL : ""}
        sx={{
          width: 32,
          height: 32,
          "&:hover": {
            cursor: "pointer",
          },
        }}
        onClick={() => navigate(`/user/${comment.user._id}`)}
        alt={comment.user.firstName}
      />
      <Box>
        <Typography variant="body1" fontWeight="500">
          {comment.user.firstName} {comment.user.lastName}
        </Typography>
        <Typography variant="body1">{comment.comment}</Typography>
      </Box>
    </Box>
  );
};
