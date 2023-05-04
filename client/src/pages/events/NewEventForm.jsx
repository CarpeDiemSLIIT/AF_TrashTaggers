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
import { addNewCategory, reset } from "../../features/category/categorySlice";
import { addNewEvent , reset } from "../../features/events/eventSlice";
import FlexBetween from "../customMUI/FlexBetween";
const formSchema = yup.object().shape({
  name: yup.string().required("required"),
  imageURL: yup.string().required("required"),
});

const initialValues = {
  description: "",
  Title: "",
};

const NewEventForm = ({ handleClose }) => {
  const [error, setError] = useState("");
  const { palette } = useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isError, message, isSuccess, isLoading } = useSelector(
    (state) => state.category
  );

  useEffect(() => {
    dispatch(reset());
    return () => {
      dispatch(reset());
    };
  }, []);
  const newCategory = async (values, onSubmitProps) => {
    const formData = new FormData();
    for (let value in values) {
      formData.append(value, values[value]);
    }
    dispatch(reset());
    dispatch(addNewCategory(formData));

    onSubmitProps.resetForm();
    handleClose();
  };

  const handleFormSubmit = async (values, onSubmitProps) => {
    newCategory(values, onSubmitProps);
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
              error={Boolean(touched.description) && Boolean(errors.description)}
              helperText={touched.description && errors.description}
            />

           
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
              Add new Category
            </Button>
          </Box>
        </form>
      )}
    </Formik>
  );
};

export default NewEventForm;
























// import { useEffect, useState } from "react";
// import {
//   Box,
//   Button,
//   TextField,
//   useMediaQuery,
//   Typography,
//   useTheme,
// } from "@mui/material";
// import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
// import { Field, Formik } from "formik";
// import * as yup from "yup";
// import { useNavigate } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import Dropzone from "react-dropzone";
// import FlexBetween from "../../components/customMUI/FlexBetween";
// import { addNewEvent , reset } from "../../features/events/eventSlice";

// const formSchema = yup.object().shape({
//     Title: yup.string().required("required"),
//   description: yup.string().required("required"),

// });

// const initialValues = {
//     Title: "",
//   description: "",

// };

// const NewEventForm = ({ handleClose }) => {
//   const [error, setError] = useState("");
//   const { palette } = useTheme();
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const { isError, message, isSuccess, isLoading } = useSelector(
//     (state) => state.event
//   );

//   useEffect(() => {
//     dispatch(reset());
//     return () => {
//       dispatch(reset());
//     };
//   }, []);
//   const newCategory = async (values, onSubmitProps) => {
//     const formData = new FormData();
    
//     for (let value in values) {
//       formData.append(value, values[value]);
//     }
//     // formData.append("imageURL", values.imageURL.name);
//     dispatch(reset());
//     dispatch(addNewEvent(formData));

//     onSubmitProps.resetForm();
//     handleClose();
//   };

//   const handleFormSubmit = async (values, onSubmitProps) => {
//     console.log(values)
//     newCategory(values, onSubmitProps);
//   };

//   return (
//     <Formik
//       onSubmit={handleFormSubmit}
//       initialValues={initialValues}
//       validationSchema={formSchema}
//     >
//       {({
//         values,
//         errors,
//         touched,
//         handleBlur,
//         handleChange,
//         handleSubmit,
//         setFieldValue,
//         resetForm,
//       }) => (
//         <form onSubmit={handleSubmit}>
//           <Box
//             padding="1rem"
//             display="flex"
//             flexDirection="column"
//             width="450px"
//             gap="1rem"
//           >
//             <TextField
//               label="Title"
//               onBlur={handleBlur}
//               onChange={handleChange}
//               value={values.Title}
//               name="Title"
//               error={
//                 Boolean(touched.Title) && Boolean(errors.Title)
//               }
//               helperText={touched.Title && errors.Title}
//             />

//             <TextField
//               label="Description"
//               onBlur={handleBlur}
//               onChange={handleChange}
//               value={values.description}
//               name="description"
//               error={
//                 Boolean(touched.description) && Boolean(errors.description)
//               }
//               helperText={touched.description && errors.description}
//             />
//             {isError && (
//               <Box>
//                 <Typography variant="body1" color="red">
//                   {message}
//                 </Typography>
//               </Box>
//             )}

//             <Button
//               fullWidth
//               type="submit"
//               sx={{
//                 p: "1rem",
//                 backgroundColor: palette.primary.main,
//                 color: palette.background.alt,
//                 "&:hover": { color: palette.primary.main },
//               }}
//             >
//               Add new Event
//             </Button>
//           </Box>
//         </form>
//       )}
//     </Formik>
//   );
// };

// export default NewEventForm;


