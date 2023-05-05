import { useEffect, useState } from "react";
import {
  Box,
  Typography,
  useTheme,
  Avatar,
  IconButton,
  Stack,
  Badge,
  Dialog,
  DialogContent,
  DialogTitle,
} from "@mui/material";

import {
  Delete,
  Edit,
  Flag,
  MoreVert,
  Report,
  Close,
} from "@mui/icons-material";
import EditIcon from "@mui/icons-material/Edit";

import EditOutlinedIcon from "@mui/icons-material/EditOutlined";

import { useDispatch, useSelector } from "react-redux";
import Dropzone from "react-dropzone";
import FlexBetween from "../../components/customMUI/FlexBetween";
import { updateProfileImage } from "../../features/auth/authSlice";

const EditProfileImage = () => {
  const { palette } = useTheme();
  const dispatch = useDispatch();
  const theme = useTheme();

  const [image, setImage] = useState(null);
  const user = useSelector((state) => state.auth.user);
  const [isDialogOpenEdit, setIsDialogOpenEdit] = useState(false);
  const handleEditClick = () => {
    setIsDialogOpenEdit(true);
  };
  const handelCancelEdit = () => {
    setIsDialogOpenEdit(false);
  };
  const handleCloseEdit = () => {
    setIsDialogOpenEdit(false);
  };
  if (!user) return <div></div>;
  return (
    <>
      <Stack direction="row" spacing={2}>
        <Badge
          overlap="circular"
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          badgeContent={
            <IconButton
              color="inherit"
              sx={{
                backgroundColor: theme.palette.background.paper,
              }}
              onClick={handleEditClick}
            >
              <EditIcon fontSize="small" />
            </IconButton>
          }
        >
          <Avatar
            src={user.userData.imageURL ? user.userData.imageURL : ""}
            alt={user.userData.firstName}
            sx={{ height: "7rem", width: "7rem" }}
          />
        </Badge>
      </Stack>
      <Dialog open={isDialogOpenEdit} onClose={handelCancelEdit}>
        <DialogTitle>
          <IconButton
            aria-label="handleCloseEdit"
            onClick={handleCloseEdit}
            sx={{
              position: "absolute",
              left: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <Close />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <Box
            gridColumn="span 4"
            border={`1px solid ${palette.neutral.medium}`}
            borderRadius="20rem"
            width="20rem"
            height="20rem"
            display="flex"
            justifyContent="center"
            alignItems="center"
            p="1rem"
            sx={
              user.userData.imageURL
                ? {
                    backgroundColor: "white",
                    backgroundImage: `url(${user.userData.imageURL})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                    color: "white",
                    "&:hover": {
                      cursor: "pointer",
                      backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)),url(${user.userData.imageURL})`,
                    },
                  }
                : {}
            }
          >
            <Dropzone
              acceptedFiles=".jpg,.jpeg,.png"
              accept={{
                "image/png": [".png", ".jpg", ".jpeg"],
              }}
              multiple={false}
              onDrop={(acceptedFiles) => {
                setImage(acceptedFiles[0]);
                const formData = new FormData();
                formData.append("imageURL", acceptedFiles[0]);
                formData.append("imageURL", acceptedFiles[0].name);
                dispatch(updateProfileImage(formData));
                setIsDialogOpenEdit(false);
              }}
            >
              {({ getRootProps, getInputProps }) => (
                <Box
                  {...getRootProps()}
                  p="1rem"
                  sx={{ "&:hover": { cursor: "pointer" } }}
                >
                  <input {...getInputProps()} />
                  {!image ? (
                    user.userData.imageURL ? (
                      <p>Click here to change the image!</p>
                    ) : (
                      <p>Click here to add an image!</p>
                    )
                  ) : (
                    <FlexBetween>
                      <Typography>{image.name}</Typography>
                      <EditOutlinedIcon />
                    </FlexBetween>
                  )}
                </Box>
              )}
            </Dropzone>
          </Box>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default EditProfileImage;
