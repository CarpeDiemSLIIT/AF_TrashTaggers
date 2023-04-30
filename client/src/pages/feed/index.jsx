import React, { useEffect } from "react";
import NewPost from "./NewPost";
import { Box, Typography } from "@mui/material";
import WidgetWrapper from "../../components/customMUI/WidgetWrapper";
import { getAllPosts } from "../../features/posts/postSlice";
import { useSelector, useDispatch } from "react-redux";

const Feed = () => {
  const dispatch = useDispatch();
  const { posts, isError, message, isSuccess, isLoading } = useSelector(
    (state) => state.post
  );
  useEffect(() => {
    dispatch(getAllPosts());
  }, []);
  return (
    <Box display="flex" flexDirection="column" gap="1rem">
      <WidgetWrapper>
        <NewPost />
      </WidgetWrapper>
      {posts.map((post) => (
        <WidgetWrapper>
          <Typography>{post.description}</Typography>
        </WidgetWrapper>
      ))}
    </Box>
  );
};

export default Feed;
