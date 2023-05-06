import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box, Button, TextField, useMediaQuery, useTheme } from "@mui/material";
import { updateUserData, reset } from "../../features/auth/authSlice";

import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { Formik } from "formik";
import * as yup from "yup";

const registerSchema = yup.object().shape({
  firstName: yup.string().required("required"),
  lastName: yup.string().required("required"),
  email: yup.string().required("required"),
  bio: yup.string(),
});

const EditProfileForm = ({ handleClose }) => {
  const user = useSelector((state) => state.auth.user.userData);
  const dispatch = useDispatch();

  const initialValuesRegister = {
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    bio: user.bio,
  };
  const handleFormSubmit = (values) => {
    dispatch(updateUserData(values));
    handleClose();
  };
  const { palette } = useTheme();

  const isNonMobile = useMediaQuery("(min-width:600px)");

  return (
    <Formik
      onSubmit={handleFormSubmit}
      initialValues={initialValuesRegister}
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
              label="First Name"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.firstName}
              name="firstName"
              error={Boolean(touched.firstName) && Boolean(errors.firstName)}
              helperText={touched.firstName && errors.firstName}
              sx={{ gridColumn: "span 2" }}
              style={{ width: "100%", margin: "auto" }}
            />
            <TextField
              label="Last Name"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.lastName}
              name="lastName"
              error={Boolean(touched.lastName) && Boolean(errors.lastName)}
              helperText={touched.lastName && errors.lastName}
              sx={{ gridColumn: "span 2" }}
              style={{ width: "100%", margin: "auto" }}
            />
            <TextField
              label="Email"
              type="email"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.email}
              name="email"
              error={Boolean(touched.email) && Boolean(errors.email)}
              helperText={touched.email && errors.email}
              sx={{ gridColumn: "span 2" }}
              style={{ width: "100%", margin: "auto" }}
              disabled
            />
            <TextField
              label="Bio"
              type="text"
              multiline
              minRows={4}
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.bio}
              name="bio"
              error={Boolean(touched.bio) && Boolean(errors.bio)}
              helperText={touched.bio && errors.bio}
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
  );
};

export default EditProfileForm;
