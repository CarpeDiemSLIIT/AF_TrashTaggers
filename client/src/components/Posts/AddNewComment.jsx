import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { newComment } from "../../features/posts/postSlice";
import { Box, Button, TextField, Typography, useTheme } from "@mui/material";
import { useNavigate } from "react-router-dom";
const AddNewComment = ({ postId }) => {
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const theme = useTheme();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!user) return navigate("/login");

    const comment = e.target.comment.value;
    dispatch(newComment({ postId, comment }));
    e.target.comment.value = "";
  };

  return (
    <Box
      sx={{
        backgroundColor: theme.palette.background.paper,
        borderRadius: "0.75rem",
      }}
    >
      <form onSubmit={handleSubmit}>
        <Box display="flex">
          <TextField
            id="comment"
            name="comment"
            fullWidth
            multiline
            minRows={1}
            required
            placeholder="Enter your comment"
            InputProps={{
              endAdornment: (
                <Button type="submit" variant="contained" color="primary">
                  <Typography variant="6" color="white">
                    Comment
                  </Typography>
                </Button>
              ),
              style: {
                padding: "0.5rem",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                alignContent: "center",
                borderRadius: "0.75rem",
              },
            }}
          />
        </Box>
      </form>
    </Box>
  );
};

export default AddNewComment;
