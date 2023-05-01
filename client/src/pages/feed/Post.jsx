import { Box, Typography } from "@mui/material";
import React from "react";

const Post = ({ post }) => {
  console.log(post);
  const date = new Date(post.createdAt);
  const formattedDate = `${date.getDate()}/${
    date.getMonth() + 1
  }/${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;

  return (
    <Box sx={{ display: "flex", flexDirection: " column" }}>
      <Box sx={{ flex: 1 }}>
        <Typography variant="h4">
          {post.user.firstName} {post.user.lastName}
        </Typography>
      </Box>
      <Box sx={{ flex: 1 }}>
        <Typography variant="body2">{formattedDate}</Typography>
      </Box>
      <Box sx={{ flex: 1 }}>
        <Typography variant="body1">{post.description}</Typography>
      </Box>
      <Box sx={{ flex: 1 }}>
        <img src={post.imageURL} alt={post.title} style={{ width: "100%" }} />
      </Box>
    </Box>
  );
};

export default Post;
