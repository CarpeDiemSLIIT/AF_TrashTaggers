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
import {
  updatePost,
  updatePostImage,
  reset,
} from "../../features/posts/postSlice";

const formSchema = yup.object().shape({
  description: yup.string().required("required"),
});

const EditPostFrom = ({ handleClose, post }) => {
  const [error, setError] = useState("");
  const { palette } = useTheme();
  const dispatch = useDispatch();
  const [image, setImage] = useState(null);
  const [descriptionChanged, setDescriptionChanged] = useState(false);
  const initialValues = {
    description: post.description,
  };
  const postUpdate = async (values, onSubmitProps) => {
    dispatch(updatePost({ id: post._id, description: values.description }));

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

              {descriptionChanged && (
                <Button
                  fullWidth
                  type="submit"
                  sx={{
                    backgroundColor: palette.primary.main,
                    color: palette.background.alt,
                    "&:hover": { color: palette.primary.main },
                  }}
                >
                  Save the description
                </Button>
              )}
            </Box>
          </form>
        )}
      </Formik>
      <Box
        gridColumn="span 4"
        border={`1px solid ${palette.neutral.medium}`}
        borderRadius="5px"
        p="1rem"
        sx={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url(${post.imageURL})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          color: "white",
          "&:hover": {
            cursor: "pointer",
          },
        }}
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
            dispatch(updatePostImage({ id: post._id, formData }));
            handleClose();
          }}
        >
          {({ getRootProps, getInputProps }) => (
            <Box
              {...getRootProps()}
              border={`2px dashed ${palette.primary.main}`}
              p="1rem"
              sx={{ "&:hover": { cursor: "pointer" } }}
            >
              <input {...getInputProps()} />
              {!image ? (
                <p>Click here to change the image!</p>
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
    </>
  );
};

export default EditPostFrom;
