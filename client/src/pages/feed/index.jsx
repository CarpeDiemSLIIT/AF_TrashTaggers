import React, { useEffect } from "react";
import NewPost from "./NewPost";
import {
  Backdrop,
  Box,
  CircularProgress,
  Typography,
  useTheme,
} from "@mui/material";
import WidgetWrapper from "../../components/customMUI/WidgetWrapper";
import { getAllPosts, reset } from "../../features/posts/postSlice";
import { useSelector, useDispatch } from "react-redux";
import Post from "../../components/Posts/Post";

const Feed = () => {
  const dispatch = useDispatch();
  const { posts, isError, message, isSuccess, isLoading } = useSelector(
    (state) => state.post
  );
  const theme = useTheme();
  useEffect(() => {
    dispatch(getAllPosts());
    return () => {
      reset();
    };
  }, []);

  return (
    <Box display="flex" flexDirection="column" gap="1rem">
      <Box
        padding="0"
        margin="0"
        sx={{
          padding: "1.5rem 1.5rem 1.5rem 1.5rem",
          backgroundColor: theme.palette.background.alt,
          borderRadius: "0.75rem",
        }}
      >
        <NewPost />
      </Box>
      {posts.length > 0 &&
        posts.map((post) => <Post post={post} key={post._id} />)}
      {isLoading && (
        <Backdrop
          open={true}
          sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
        >
          <CircularProgress color="primary" />
        </Backdrop>
      )}
    </Box>
  );
};

export default Feed;
