import React, { useEffect, useState } from "react";
import {
  Alert,
  Backdrop,
  Button,
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
import { getAllPosts } from "../../../features/posts/postSlice";
import DoDisturbIcon from "@mui/icons-material/DoDisturb";
import PersonOffIcon from "@mui/icons-material/PersonOff";
import ApprovePost from "../../../components/confirmation/approvePost";
import RejectPost from "../../../components/confirmation/rejectPost";
import { getAllReports } from "../../../features/report/reportSlice";
import ResolvedReport from "../../../components/confirmation/resolved";
import ConfirmSuspend from "../../../components/confirmation";
import BanCreator from "../../../components/confirmation/banCreator";
import RemovePost from "../../../components/confirmation/removePost";

function Row({ report, index }) {
  const [open, setOpen] = useState(false);
  const [reportID, setReportID] = useState("");
  const [creatorID, setCreatorID] = useState("");
  const [postID, setPostID] = useState("");
  const [open1, setOpen1] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [open3, setOpen3] = useState(false);
  const [open4, setOpen4] = useState(false);

  const handleClose1 = () => {
    setOpen1(false);
  };

  const handleClose2 = () => {
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
        key={report._id}
        sx={{ "& > *": { borderBottom: "unset" } }}
        onClick={() => setOpen(!open)}
      >
        <TableCell component="th" scope="row">
          {index + 1}
        </TableCell>
        <TableCell align="center">{report.reason}</TableCell>

        {report.post.author !== null ? (
          <TableCell align="center">
            {report.user.firstName} {report.user.lastName}
          </TableCell>
        ) : null}
        <TableCell align="center">
          {report.status === "pending" ? (
            <Chip label="Pending" color="info" variant="outlined" />
          ) : (
            <Chip label="Resolved" color="primary" variant="filled" />
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
      <TableRow key={report.post.description}>
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
                    <TableCell align="center">Created User</TableCell>
                    <TableCell align="center">Description</TableCell>
                    <TableCell align="center">Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell component="th" align="center" scope="row">
                      <img
                        src={`${report.post.imageURL}`}
                        alt="Post Image"
                        width="200px"
                        height="200px"
                      />
                    </TableCell>
                    {report.post.author !== null ? (
                      <TableCell align="center">
                        {report.post.author.firstName}{" "}
                        {report.post.author.lastName}
                      </TableCell>
                    ) : null}
                    <TableCell align="center">
                      {report.post.description}
                    </TableCell>
                    <TableCell align="center">
                      <IconButton
                        aria-label="Approve"
                        color="error"
                        title="Suspend Creator"
                        onClick={() => {
                          if (report.status !== "resolved") {
                            setReportID(report._id);
                            setCreatorID(report.post.author._id);
                            setOpen2(true);
                          } else {
                            setOpen3(true);
                          }
                        }}
                      >
                        <PersonOffIcon />
                      </IconButton>
                      <BanCreator
                        open={open2}
                        handleClose={handleClose2}
                        reportID={reportID}
                        authorID={creatorID}
                      />
                      <IconButton
                        aria-label="Reject"
                        color="error"
                        title="Remove Post"
                        onClick={() => {
                          if (report.status !== "resolved") {
                            setPostID(report.post._id);
                            setReportID(report._id);
                            setOpen4(true);
                          } else {
                            setOpen3(true);
                          }
                        }}
                      >
                        <DoDisturbIcon />
                      </IconButton>
                      <RemovePost
                        open={open4}
                        handleClose={handleClose4}
                        postID={postID}
                        reportID={reportID}
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
                          This report is already Resolved ✅
                        </Alert>
                      </Snackbar>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "flex-end",
                  alignItems: "flex-end",
                  marginTop: "1%",
                }}
              >
                <Button
                  variant="outlined"
                  onClick={() => {
                    if (report.status !== "resolved") {
                      setReportID(report._id);
                      setOpen1(true);
                    } else {
                      setOpen3(true);
                    }
                  }}
                >
                  <h3>Resolved</h3>
                </Button>
                <ResolvedReport
                  open={open1}
                  handleClose={handleClose1}
                  reportId={reportID}
                />
              </Box>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
}

const ReportManagement = () => {
  const { reports, isLoading, isError } = useSelector((state) => state.report);

  console.log(reports);

  const dispatch = useDispatch();
  const [search, setSearch] = useState("");
  useEffect(() => {
    dispatch(getAllReports());
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
      <h1>All Reports</h1>
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
              <TableCell align="center">Reason</TableCell>
              <TableCell align="center">Reported User</TableCell>
              <TableCell align="center">Status</TableCell>
              <TableCell align="center">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {reports.length === 0 && (
              <TableRow key={reports._id}>
                <TableCell colSpan={6} align="center">
                  No Reports Found
                </TableCell>
              </TableRow>
            )}
            {reports
              .filter((report) => {
                return search.toLowerCase() === ""
                  ? report
                  : report.reason.toLowerCase().includes(search);
              })
              .map((report, index) => (
                <Row key={report._id} report={report} index={index} />
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default ReportManagement;
