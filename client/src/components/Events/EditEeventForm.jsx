

import { useEffect, useState } from "react";
import {
  Box,
  Button,
  TextField,
  useMediaQuery,
  Typography,
  useTheme,
} from "@mui/material";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { Field, Formik } from "formik";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import Dropzone from "react-dropzone";
import FlexBetween from "../customMUI/FlexBetween";



import { updateEvent } from "../../features/events/eventSlice";

const formSchema = yup.object().shape({
  Title: yup.string().required("Title is required"),
  description: yup.string().required("Description is required"),
});

const EditEeventForm = ({ handleClose, event }) => {
  const [error, setError] = useState("");
  const { palette } = useTheme();
  const dispatch = useDispatch();
  const [image, setImage] = useState(null);
  const [titleChanged, setTitleChanged] = useState(false);
  const [descriptionChanged, setDescriptionChanged] = useState(false);
  const initialValues = {
    Title: event.Title,
    description: event.description,
    date : event.Date
  };
  const postUpdate = async (values, onSubmitProps) => {
    dispatch(
      updateEvent({ id: event._id, Title: values.Title, description: values.description  , date : values.date})
    );

    onSubmitProps.resetForm();
    handleClose();
  };

  const handleFormSubmit = async (values, onSubmitProps) => {
    postUpdate(values, onSubmitProps);
  };

  return (
    <>
      <Formik
        onSubmit={handleFormSubmit}
        initialValues={initialValues}
        validationSchema={formSchema}
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
                label="Title"
                onBlur={handleBlur}
                onChange={(e) => {
                  handleChange(e);
                  setTitleChanged(true);
                }}
                value={values.Title}
                name="Title"
                error={Boolean(touched.Title) && Boolean(errors.Title)}
                helperText={touched.Title && errors.Title}
              />

              <TextField
                label="Description"
                onBlur={handleBlur}
                onChange={(e) => {
                  handleChange(e);
                  setDescriptionChanged(true);
                }}
                value={values.description}
                name="description"
                error={
                  Boolean(touched.description) && Boolean(errors.description)
                }
                helperText={touched.description && errors.description}
                multiline
              />
                {titleChanged || descriptionChanged ? (
                <Button
                    fullWidth
                    type="submit"
                    sx={{
                    backgroundColor: palette.primary.main,
                    color: palette.background.alt,
                    "&:hover": { color: palette.primary.main },
                    }}
                >
                    Save the changes
                </Button>
                ) : null}
              </Box>           
              </form>
        )}
      </Formik>
          </>
  );
 };

 export default EditEeventForm;
     
