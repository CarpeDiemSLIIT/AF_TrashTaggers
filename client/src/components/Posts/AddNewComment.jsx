import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { newComment } from "../../features/posts/postSlice";
import { Box, Button, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
const AddNewComment = ({ postId }) => {
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!user) return navigate("/login");

    const comment = e.target.comment.value;
    dispatch(newComment({ postId, comment }));
    e.target.comment.value = "";
  };

  return (
    <Box>
      <form onSubmit={handleSubmit}>
        <TextField
          id="comment"
          name="comment"
          label="Comment"
          variant="outlined"
          fullWidth
          multiline
          required
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          sx={{ marginTop: "0.5rem" }}
        >
          Comment
        </Button>
      </form>
    </Box>
  );
};

export default AddNewComment;
