import {
  Backdrop,
  Box,
  CircularProgress,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import SendIcon from "@mui/icons-material/Send";
import Stack from "@mui/material/Stack";
import { Formik } from "formik";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { addNewComment } from "../../features/posts/postSlice";
import { getAllUsersFull } from "../../features/users/userSlice";

const Post = ({ post }) => {
  const date = new Date(post.createdAt);
  const formattedDate = `${date.getDate()}/${
    date.getMonth() + 1
  }/${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;

  const dispatch = useDispatch();

  const commentSchema = yup.object().shape({
    comment: yup.string().required("required"),
  });

  const initialValuesComment = {
    comment: "",
    postID: post._id,
  };

  const { allUsersFull, isError, isLoading } = useSelector(
    (state) => state.users
  );

  useEffect(() => {
    dispatch(getAllUsersFull());
  }, []);

  if (isLoading)
    return (
      <>
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={true}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      </>
    );

  const handleFormSubmit = (values) => {
    dispatch(addNewComment(values));
  };

  const postComments = post.comments;

  return (
    <Box sx={{ display: "flex", flexDirection: " column" }}>
      <Box sx={{ flex: 1 }}>
        <Typography variant="h4">
          {post.author.firstName} {post.author.lastName}
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

      <Formik
        onSubmit={handleFormSubmit}
        initialValues={initialValuesComment}
        validationSchema={commentSchema}
      >
        {({
          values,
          errors,
          touched,
          handleBlur,
          handleChange,
          handleSubmit,
          setFieldValue,
          resetForm,
        }) => (
          <form onSubmit={handleSubmit}>
            <Grid container>
              <Grid item xs={10}>
                <TextField
                  fullWidth
                  placeholder="Comment..."
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.comment}
                  error={Boolean(touched.comment) && Boolean(errors.comment)}
                  helperText={touched.comment && errors.comment}
                  name="comment"
                  id="fullWidth"
                  InputProps={{
                    style: {
                      textAlign: "center",
                      borderRadius: "10px",
                      marginBottom: "10px",
                      marginTop: "10px",
                    },
                  }}
                />
              </Grid>
              <Grid item xs={2}>
                <Stack
                  direction="row"
                  spacing={4}
                  sx={{ marginTop: "12%", marginLeft: "12%" }}
                >
                  <Button
                    variant="contained"
                    type="submit"
                    endIcon={<SendIcon />}
                  >
                    Add
                  </Button>
                </Stack>
              </Grid>
            </Grid>
          </form>
        )}
      </Formik>
      <Box sx={{ rowGap: "2" }}>
        {postComments.map((comment) => {
          return (
            <>
              <Grid
                key={comment._id}
                container
                rowGap={2}
                width="83%"
                sx={{ marginRight: "20%", padding: "10px" }}
              >
                <Grid item xs={4}>
                  <Typography
                    variant="subtitle2"
                    gutterBottom
                    sx={{ marginTop: "3%", marginLeft: "3%" }}
                  >
                    {comment.comment}
                  </Typography>
                </Grid>
                <Grid item xs={4} sx={{ textAlign: "center" }}>
                  {allUsersFull.map((users) => {
                    if (users._id === comment.user) {
                      {
                        return (
                          <Typography
                            variant="overline"
                            display="block"
                            gutterBottom
                          >
                            {users.firstName} {users.lastName}
                          </Typography>
                        );
                      }
                    }
                  })}
                </Grid>
                <Grid item xs={4} sx={{ textAlign: "right" }}>
                  <Typography variant="overline" display="block" gutterBottom>
                    {new Date(comment.createdAt).toLocaleDateString()}
                  </Typography>
                </Grid>
              </Grid>
            </>
          );
        })}
      </Box>
    </Box>
  );
};

export default Post;
