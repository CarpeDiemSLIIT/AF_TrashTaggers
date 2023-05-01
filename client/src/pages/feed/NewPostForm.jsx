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
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Dropzone from "react-dropzone";
import FlexBetween from "../../components/customMUI/FlexBetween";
import { addNewPost, reset } from "../../features/posts/postSlice";

const formSchema = yup.object().shape({
  description: yup.string().required("required"),
  imageURL: yup.string().required("required"),
});

const initialValues = {
  description: "",
  imageURL: "",
};

const NewPostForm = ({ handleClose }) => {
  const [error, setError] = useState("");
  const { palette } = useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isError, message, isSuccess, isLoading } = useSelector(
    (state) => state.post
  );

  useEffect(() => {
    dispatch(reset());
    return () => {
      dispatch(reset());
    };
  }, []);
  const newPost = async (values, onSubmitProps) => {
    const formData = new FormData();
    for (let value in values) {
      formData.append(value, values[value]);
    }
    formData.append("imageURL", values.imageURL.name);
    dispatch(reset());
    dispatch(addNewPost(formData));

    onSubmitProps.resetForm();
    handleClose();
  };

  const handleFormSubmit = async (values, onSubmitProps) => {
    newPost(values, onSubmitProps);
  };

  return (
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
              label="Description"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.description}
              name="description"
              error={
                Boolean(touched.description) && Boolean(errors.description)
              }
              helperText={touched.description && errors.description}
            />

            <Box
              gridColumn="span 4"
              border={`1px solid ${palette.neutral.medium}`}
              borderRadius="5px"
              p="1rem"
            >
              <Dropzone
                acceptedFiles=".jpg,.jpeg,.png"
                multiple={false}
                onDrop={(acceptedFiles) =>
                  setFieldValue("imageURL", acceptedFiles[0])
                }
              >
                {({ getRootProps, getInputProps }) => (
                  <Box
                    {...getRootProps()}
                    border={`2px dashed ${palette.primary.main}`}
                    p="1rem"
                    sx={{ "&:hover": { cursor: "pointer" } }}
                  >
                    <input {...getInputProps()} />
                    {!values.imageURL ? (
                      <p>Add Picture Here</p>
                    ) : (
                      <FlexBetween>
                        <Typography>{values.imageURL.name}</Typography>
                        <EditOutlinedIcon />
                      </FlexBetween>
                    )}
                  </Box>
                )}
              </Dropzone>
            </Box>
            {isError && (
              <Box>
                <Typography variant="body1" color="red">
                  {message}
                </Typography>
              </Box>
            )}

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
              Add new Post
            </Button>
          </Box>
        </form>
      )}
    </Formik>
  );
};

export default NewPostForm;
