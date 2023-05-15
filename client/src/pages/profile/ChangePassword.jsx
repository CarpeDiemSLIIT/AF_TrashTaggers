import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Box,
  Button,
  TextField,
  useMediaQuery,
  useTheme,
  Typography,
  Avatar,
  IconButton,
  Stack,
  Badge,
  Dialog,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import PasswordIcon from "@mui/icons-material/Password";
import { useNavigate } from "react-router";
import CloseIcon from "@mui/icons-material/Close";
import axios from "axios";
import { toast } from "react-toastify";

const registerSchema = yup.object().shape({
  oldPassword: yup.string().required("required"),
  newPassword: yup.string().min(8, "Password must be 8 characters long"),
  confirmPassword: yup
    .string()
    .oneOf(
      [yup.ref("newPassword"), null],
      'Must match "New Password" field value'
    ),
});

const ChangePassword = () => {
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const initialValues = {
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  };
  const changePassword = async (values) => {
    await axios
      .put("/api/auth/changePassword", values, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      })
      .then((res) => {
        toast.success("Password changed successfully!");
        setOpen(false);
      })
      .catch((err) => {
        toast.error("Incorrect old password!");
      });
  };
  const handleFormSubmit = (values) => {
    changePassword(values);
  };
  const { palette } = useTheme();

  const isNonMobile = useMediaQuery("(min-width:600px)");

  const handleClose = (event, reason) => {
    setOpen(false);
  };
  return (
    <>
      <div>
        <Button
          variant="outlined"
          onClick={() => setOpen(true)}
          startIcon={<PasswordIcon />}
        >
          Change&nbsp;Password
        </Button>
      </div>
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
          <Formik
            onSubmit={handleFormSubmit}
            initialValues={initialValues}
            validationSchema={registerSchema}
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
                <Box
                  padding="1rem"
                  display="flex"
                  flexDirection="column"
                  width="450px"
                  gap="1rem"
                >
                  <TextField
                    label="Old Password"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.oldPassword}
                    name="oldPassword"
                    type="password"
                    error={
                      Boolean(touched.oldPassword) &&
                      Boolean(errors.oldPassword)
                    }
                    helperText={touched.oldPassword && errors.oldPassword}
                    sx={{ gridColumn: "span 2" }}
                    style={{ width: "100%", margin: "auto" }}
                  />
                  <TextField
                    label="New Password"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.newPassword}
                    name="newPassword"
                    type="password"
                    error={
                      Boolean(touched.newPassword) &&
                      Boolean(errors.newPassword)
                    }
                    helperText={touched.newPassword && errors.newPassword}
                    sx={{ gridColumn: "span 2" }}
                    style={{ width: "100%", margin: "auto" }}
                  />
                  <TextField
                    label="Confirm Password"
                    type="password"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.confirmPassword}
                    name="confirmPassword"
                    error={
                      Boolean(touched.confirmPassword) &&
                      Boolean(errors.confirmPassword)
                    }
                    helperText={
                      touched.confirmPassword && errors.confirmPassword
                    }
                    sx={{ gridColumn: "span 2" }}
                    style={{ width: "100%", margin: "auto" }}
                  />
                </Box>
                <Box>
                  <Button
                    fullWidth
                    type="submit"
                    sx={{
                      p: "1rem",
                      backgroundColor: palette.primary.main,
                      color: palette.background.alt,
                      "&:hover": { color: palette.primary.main },
                    }}
                  >
                    Update Profile
                  </Button>
                </Box>
              </form>
            )}
          </Formik>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ChangePassword;
