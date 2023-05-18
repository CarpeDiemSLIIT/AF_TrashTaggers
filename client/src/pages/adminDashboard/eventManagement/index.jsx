import React, { useEffect, useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
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
import DeleteIcon from '@mui/icons-material/Delete';

import { getAllCevents , deleteCevent } from "../../../features/cevents/ceventSlice";

import DoDisturbIcon from "@mui/icons-material/DoDisturb";
import DoneOutlineIcon from "@mui/icons-material/DoneOutline";
import ApprovePost from "../../../components/confirmation/approvePost";
import RejectPost from "../../../components/confirmation/rejectPost";




function Row({ post, index }) {
  const [open, setOpen] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleDeleteClick = () => {
    setIsDialogOpen(true);
  };

  const handleDeleteConfirm = (id) => {
    dispatch(deleteCevent(id));
    setIsDialogOpen(false);
  };

  const handleDeleteCancel = () => {
    setIsDialogOpen(false);
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
        <TableCell align="center">{post.Title}</TableCell>
        {post.user !== null ? (
          <TableCell align="center">
            {post.user.firstName} {post.user.lastName}
          </TableCell>
        ) : null}
        <TableCell align="center">{post.description}</TableCell>
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
                        {post.user.firstName} {post.user.lastName}
                      </TableCell>
                    ) : null}
                    <TableCell align="center">{post.description}</TableCell>
                    <TableCell align="center">
                      <IconButton onClick={handleDeleteClick}>
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
      <Dialog open={isDialogOpen} onClose={handleDeleteCancel}>
        <DialogTitle>Delete Item?</DialogTitle>
        <DialogContent>
          Are you sure you want to delete this event?
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteCancel}>Cancel</Button>
          <Button onClick={ () => {handleDeleteConfirm(post._id)}} autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
                    }


const EventManagement = () => {
  const { cevents, isLoading, isError } = useSelector((state) => state.cevent);

  const dispatch = useDispatch();
  const [search, setSearch] = useState("");
  useEffect(() => {
    dispatch(getAllCevents());
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
      <h1>All Events</h1>
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
              <TableCell align="center">Title</TableCell>
              <TableCell align="center">User</TableCell>
              <TableCell align="center">Description</TableCell>
              <TableCell align="center">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {cevents.length === 0 && (
              <TableRow key={cevents._id}>
                <TableCell colSpan={6} align="center">
                  No Events Found
                </TableCell>
              </TableRow>
            )}
            {cevents
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

export default EventManagement;
