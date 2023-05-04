import React, { useEffect } from "react";
import NewPost from "./NewPost";
import { Backdrop, Box, CircularProgress, Typography } from "@mui/material";
import WidgetWrapper from "../../components/customMUI/WidgetWrapper";
import { getAllPosts, reset } from "../../features/posts/postSlice";
import { useSelector, useDispatch } from "react-redux";
import Post from "../../components/Posts/Post";

const Feed = () => {
  const dispatch = useDispatch();
  const { posts, isError, message, isSuccess, isLoading } = useSelector(
    (state) => state.post
  );
  useEffect(() => {
    dispatch(getAllPosts());
    return () => {
      reset();
    };
  }, []);

  return (
    <Box display="flex" flexDirection="column" gap="1rem">
      <WidgetWrapper>
        <NewPost />
      </WidgetWrapper>
      {posts.length > 0 &&
        posts.map((post) => <Post post={post} key={post._id} />)}
    </Box>
  );
};

export default Feed;
