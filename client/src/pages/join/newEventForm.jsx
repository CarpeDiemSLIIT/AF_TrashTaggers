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
import FlexBetween from "../../components/customMUI/FlexBetween";
import { addNewEvent , reset } from "../../features/events/eventSlice";

const formSchema = yup.object().shape({
  Title: yup.string().required("required"),
  description: yup.string().required("required"),
  date: yup.string().required("required"),
});

const initialValues = {
  Title: "",
  description: "",
  date: "",
};

const NewEventForm = ({ handleClose }) => {
  const [error, setError] = useState("");
  const { palette } = useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isError, message, isSuccess, isLoading } = useSelector(
    (state) => state.cevent
  );

  useEffect(() => {
    dispatch(reset());
    return () => {
      dispatch(reset());
    };
  }, []);

  const consoleLog =  (values) =>{
    console.log(values);
  }

  const handleFormSubmit = async (values, onSubmitProps) => {
    consoleLog(values)
    const formData = new FormData();
    for (let value in values) {
      formData.append(value, values[value]);
    }

    // formData.append("Title", values.Title);
    // formData.append("description", values.description);
    // formData.append("date", values.date);

    console.log(formData);
    
    // dispatch(addNewEvent(formData));
    dispatch(addNewEvent({Title : values.Title , description : values.description , date : values.date}));
    dispatch(reset());
    onSubmitProps.resetForm();
    handleClose();
  };

// const handleFormSubmit = async (values, onSubmitProps) => {
//     const formData = new FormData();
//     for (let value in values) {
//       formData.append(value, values[value]);
//     }
  
//     try {
//         console.log(formData);
//       const token = localStorage.getItem("token");
//       const response = await fetch(`http://localhost:3001/api/events/new`, {
//         method: "POST",
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//         body: formData,
//       });
//       if (!response.ok) {
//         throw new Error("Failed to add new event");
//       }
//       dispatch(reset());
//       onSubmitProps.resetForm();
//       handleClose();
//     } catch (error) {
//         console.log(error.message);
//       setError(error.message);
//     }
//   };

// const handleFormSubmit = async (values, onSubmitProps) => {
//     console.log(values);
//     const formData = new FormData();
//     formData.append("Title", values.Title);
//     formData.append("description", values.description);
//     formData.append("date", values.date);
  
//     try {
//         console.log(formData);
//       const token = localStorage.getItem("token");
//       const response = await fetch(`http://localhost:3001/api/events/new`, {
//         method: "POST",
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//         body: formData,
//       });
//       if (!response.ok) {
//         throw new Error("Failed to add new event");
//       }
//       dispatch(reset());
//       onSubmitProps.resetForm();
//       handleClose();
//     } catch (error) {
//       console.log(error.message);
//       setError(error.message);
//     }
//   };
  
  

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
              onChange={handleChange}
              value={values.Title}
              name="Title"
              error={Boolean(touched.Title) && Boolean(errors.Title)}
              helperText={touched.Title && errors.Title}
            />
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

            {isError && (
              <Box>
                <Typography variant="body1" color="red">
                  {message}
                </Typography>
              </Box>
            )}
            <Field name="date">
                {({ field }) => (
                    <TextField
                    {...field}
                    type="date"
                    label="Add date"
                    InputLabelProps={{ shrink: true }}
                    />
                )}
            </Field>

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
              Add new Event
            </Button>
          </Box>
        </form>
      )}
    </Formik>
  );
};

export default NewEventForm;