
import {
  Avatar,
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import FlexBetween from "../../components/customMUI/FlexBetween";
import { useDispatch, useSelector } from "react-redux";
import { AddCircle, Add } from "@mui/icons-material";
import CloseIcon from "@mui/icons-material/Close";
import { useNavigate } from "react-router";
import NewCeventForm from "./NewCeventForm";
import { reset } from "../../features/cevents/ceventSlice";
const NewCevent = () => {
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    dispatch(reset());
  }, []);

  const handleClose = (event, reason) => {
    // if (reason && reason == "backdropClick") return;
    setOpen(false);
  };

  return (
    <>
      <FlexBetween
        sx={{
          width: "100%",
          gap: "1rem",
          "&:hover": {
            cursor: "pointer",
          },
        }}
        onClick={() => {
          if (!user) navigate("/login");
          setOpen(true);
        }}
      >
        {user ? <Avatar src={user.userData.imageURL} /> : <Avatar />}

        {/* <TextField
          label="Tell us about, what you did?"
          multiline
          sx={{ width: "100%" }}
          disabled
        />
        <IconButton>
          <AddCircle color="primary" fontSize="large" />
        </IconButton> */}
        <TextField
          disabled
          fullWidth
          multiline
          minRows={1}
          required
          value="Add new Event"
          InputProps={{
            endAdornment: (
              <Button
                type="submit"
                variant="outlined"
                color="primary"
                endIcon={<Add fontSize="large" color="primary" />}
              >
                <Typography variant="6"></Typography>
              </Button>
            ),
            style: {
              padding: "0.5rem",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              alignContent: "center",
              borderRadius: "0.75rem",
              //change text color
            },
          }}
        />
      </FlexBetween>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>
          <IconButton
            aria-label="close"
            onClick={handleClose}
            sx={{
              position: "absolute",
              left: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <NewCeventForm handleClose={handleClose} />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default NewCevent;


























// import {
//   Avatar,
//   Box,
//   Button,
//   Dialog,
//   DialogContent,
//   DialogTitle,
//   IconButton,
//   TextField,
//   Typography,
// } from "@mui/material";
// import React, { useEffect, useState } from "react";
//   import FlexBetween from "../../components/customMUI/FlexBetween";
//   import { useDispatch, useSelector } from "react-redux";
//   import AddCircleIcon from "@mui/icons-material/AddCircle";
//   import CloseIcon from "@mui/icons-material/Close";
//   import NewCeventForm from "./NewCeventForm";
//   import { AddCircle, Add } from "@mui/icons-material";
  
//   const NewCevent = () => {
//     const user = useSelector((state) => state.auth.user);
//     const dispatch = useDispatch();
  
//     const [open, setOpen] = useState(false);
  
//     const handleClose = (event, reason) => {
//       // if (reason && reason == "backdropClick") return;
//       setOpen(false);
//     };
  
//     return (
//       <>
//         <FlexBetween
//           sx={{ width: "100%", gap: "29px" }}
//           onClick={() => {
//             setOpen(true);
//           }}
//         >
//           <Avatar src={user?.imageURL} />
//           <TextField
//             label="Create your Own Event"
//             multiline
//             sx={{ width: "100%" }}
//             disabled
//           />
//           <IconButton>
//             <AddCircleIcon color="primary" fontSize="large" />
//           </IconButton>
//         </FlexBetween>
//         <Dialog open={open} onClose={handleClose}>
//           <DialogTitle>
//             <IconButton
//               aria-label="close"
//               onClick={handleClose}
//               sx={{
//                 position: "absolute",
//                 left: 8,
//                 top: 8,
//                 color: (theme) => theme.palette.grey[500],
//               }}
//             >
//               <CloseIcon />
//             </IconButton>
//           </DialogTitle>
//           <DialogContent>
//             <NewCeventForm handleClose={handleClose} />
//           </DialogContent>
//         </Dialog>
//       </>
//     );
//   };
  
//   export default NewCevent;