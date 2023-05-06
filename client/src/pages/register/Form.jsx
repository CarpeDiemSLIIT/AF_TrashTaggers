import { useEffect, useState } from "react";
import { Box, Button, TextField, useMediaQuery, useTheme } from "@mui/material";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { Formik } from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { register, reset } from "../../features/auth/authSlice";

const registerSchema = yup.object().shape({
  firstName: yup.string().required("required"),
  lastName: yup.string().required("required"),
  email: yup.string().required("required"),
  password: yup
    .string()
    .min(8, "Password must be 8 characters long")
    .required("required"),
  // .matches(/[0-9]/, "Password requires a number")
  // .matches(/[a-z]/, "Password requires a lowercase letter")
  // .matches(/[A-Z]/, "Password requires an uppercase letter")
  // .matches(/[^\w]/, "Password requires a symbol"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], 'Must match "password" field value')
    .required("required"),
});

const initialValuesRegister = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
};
export default function Form() {
  const { palette } = useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isNonMobile = useMediaQuery("(min-width:600px)");

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isSuccess || user) {
      navigate("/");
    }

    dispatch(reset());
  }, [user, isError, isSuccess, message, navigate, dispatch]);

  const handleFormSubmit = (values) => {
    dispatch(register(values));
  };

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
            display="grid"
            gap="30px"
            gridTemplateColumns="repeat(2, minmax(0, 1fr))"
            sx={{
              "& > div": { gridColumn: isNonMobile ? undefined : "span 2" },
            }}
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
            />
            <TextField
              label="Password"
              type="password"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.password}
              name="password"
              error={Boolean(touched.password) && Boolean(errors.password)}
              helperText={touched.password && errors.password}
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
              helperText={touched.confirmPassword && errors.confirmPassword}
              sx={{ gridColumn: "span 2" }}
              style={{ width: "100%", margin: "auto" }}
            />
          </Box>
          {/* BUTTONS */}
          <Box>
            <Button
              fullWidth
              type="submit"
              sx={{
                m: "2rem 0",
                p: "1rem",
                backgroundColor: palette.primary.main,
                color: palette.background.alt,
                "&:hover": { color: palette.primary.main },
              }}
            >
              REGISTER
            </Button>
          </Box>
        </form>
      )}
    </Formik>
  );
}
