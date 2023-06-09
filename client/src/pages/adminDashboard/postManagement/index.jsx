import React, { useEffect, useState } from "react";
import {
  Alert,
  Backdrop,
  Chip,
  CircularProgress,
  Snackbar,
  TextField,
  makeStyles,
} from "@mui/material";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllPosts,
  getAllPostsAdmin,
} from "../../../features/posts/postSlice";
import DoDisturbIcon from "@mui/icons-material/DoDisturb";
import DoneOutlineIcon from "@mui/icons-material/DoneOutline";
import ApprovePost from "../../../components/confirmation/approvePost";
import RejectPost from "../../../components/confirmation/rejectPost";

function Row({ post, index }) {
  const [open, setOpen] = useState(false);
  const [postID, setPostID] = useState("");
  const [open1, setOpen1] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [open3, setOpen3] = useState(false);
  const [open4, setOpen4] = useState(false);

  const handleClose = () => {
    setOpen1(false);
  };

  const handleClose1 = () => {
    setOpen2(false);
  };

  const handleClose3 = () => {
    setOpen3(false);
  };
  const handleClose4 = () => {
    setOpen4(false);
  };

  return (
    <>
      <TableRow
        key={post._id}
        sx={{ "& > *": { borderBottom: "unset" } }}
        onClick={() => setOpen(!open)}
      >
        <TableCell component="th" scope="row">
          {index + 1}
        </TableCell>
        <TableCell align="center">{post.description}</TableCell>

        {post.author !== null ? (
          <TableCell align="center">
            {post.author.firstName} {post.author.lastName}
          </TableCell>
        ) : null}
        <TableCell align="center">
          {post.status === "pending" ? (
            <Chip label="Pending" color="info" variant="outlined" />
          ) : post.status === "deleted" ? (
            <Chip label="Deleted" color="error" variant="outlined" />
          ) : (
            <Chip label="Approved" color="primary" variant="filled" />
          )}
        </TableCell>
        <TableCell align="center">
          <IconButton aria-label="expand row" size="small">
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell
          style={{
            paddingBottom: 0,
            paddingTop: 0,
            paddingLeft: 0,
            paddingRight: 0,
          }}
          colSpan={6}
        ></TableCell>
      </TableRow>
      <TableRow key={post.description}>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                Post
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell align="center">Image</TableCell>
                    <TableCell align="center">User</TableCell>
                    <TableCell align="center">Description</TableCell>
                    <TableCell align="center">Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell component="th" align="center" scope="row">
                      <img
                        src={`${post.imageURL}`}
                        alt="Post Image"
                        width="200px"
                        height="200px"
                      />
                    </TableCell>
                    {post.author !== null ? (
                      <TableCell align="center">
                        {post.author.firstName} {post.author.lastName}
                      </TableCell>
                    ) : null}
                    <TableCell align="center">{post.description}</TableCell>
                    <TableCell align="center">
                      <IconButton
                        aria-label="Approve"
                        color="primary"
                        title="Approve"
                        onClick={() => {
                          if (post.status === "deleted") {
                            setOpen4(true);
                          } else if (post.status === "pending") {
                            setPostID(post._id);
                            setOpen1(true);
                          } else {
                            setOpen3(true);
                          }
                        }}
                      >
                        <DoneOutlineIcon />
                      </IconButton>
                      <ApprovePost
                        open={open1}
                        handleClose={handleClose}
                        postId={postID}
                      />
                      <IconButton
                        aria-label="Reject"
                        color="error"
                        title="Reject"
                        onClick={() => {
                          if (post.status === "deleted") {
                            setOpen4(true);
                          } else if (post.status === "pending") {
                            setPostID(post._id);
                            setOpen2(true);
                          } else {
                            setOpen3(true);
                          }
                        }}
                      >
                        <DoDisturbIcon />
                      </IconButton>
                      <RejectPost
                        open={open2}
                        handleClose={handleClose1}
                        postId={postID}
                      />
                      <Snackbar
                        open={open3}
                        anchorOrigin={{ vertical: "top", horizontal: "center" }}
                        autoHideDuration={2000}
                        onClose={handleClose3}
                      >
                        <Alert
                          onClose={handleClose3}
                          severity="error"
                          sx={{ width: "100%" }}
                        >
                          This post is already Approved ✅
                        </Alert>
                      </Snackbar>
                      <Snackbar
                        open={open4}
                        anchorOrigin={{ vertical: "top", horizontal: "center" }}
                        autoHideDuration={2000}
                        onClose={handleClose4}
                      >
                        <Alert
                          onClose={handleClose4}
                          severity="error"
                          sx={{ width: "100%" }}
                        >
                          This post is already Deleted ❌
                        </Alert>
                      </Snackbar>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
}

const PostManagement = () => {
  const { posts, isLoading, isError } = useSelector((state) => state.post);

  const dispatch = useDispatch();
  const [search, setSearch] = useState("");
  useEffect(() => {
    dispatch(getAllPostsAdmin());
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
  return (
    <div>
      <h1>All Posts</h1>
      <Box sx={{ gridColumn: "span 4" }}>
        <TextField
          fullWidth
          label="Search...."
          onChange={(e) => setSearch(e.target.value)}
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
      </Box>
      <TableContainer component={Paper}>
        <Table aria-label="collapsible table">
          <TableHead>
            <TableRow>
              <TableCell>No</TableCell>
              <TableCell align="center">Description</TableCell>
              <TableCell align="center">User</TableCell>
              <TableCell align="center">Status</TableCell>
              <TableCell align="center">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {posts.length === 0 && (
              <TableRow key={posts._id}>
                <TableCell colSpan={6} align="center">
                  No Posts Found
                </TableCell>
              </TableRow>
            )}
            {posts
              .filter((post) => {
                return search.toLowerCase() === ""
                  ? post
                  : post.description.toLowerCase().includes(search);
              })
              .map((post, index) => (
                <Row key={post._id} post={post} index={index} />
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default PostManagement;
