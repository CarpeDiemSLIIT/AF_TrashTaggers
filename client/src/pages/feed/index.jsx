import React, { useEffect } from "react";
import NewPost from "./NewPost";
import { Backdrop, Box, CircularProgress, Typography } from "@mui/material";
import WidgetWrapper from "../../components/customMUI/WidgetWrapper";
import { getAllPosts } from "../../features/posts/postSlice";
import { useSelector, useDispatch } from "react-redux";
import Post from "./Post";

const Feed = () => {
  const dispatch = useDispatch();
  const { posts, comments, isError, message, isSuccess, isLoading } =
    useSelector((state) => state.post);

  useEffect(() => {
    dispatch(getAllPosts());
  }, []);
  if (isLoading)
    return (
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={true}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    );
  return (
    <Box display="flex" flexDirection="column" gap="1rem">
      <WidgetWrapper>
        <NewPost />
      </WidgetWrapper>
      {posts.map((post) => (
        <WidgetWrapper key={post._id}>
          <Post post={post} />
        </WidgetWrapper>
      ))}
    </Box>
  );
};

export default Feed;
