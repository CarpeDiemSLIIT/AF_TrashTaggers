import {
  Box,
  Typography,
  useTheme,
  useMediaQuery,
  Grid,
  IconButton,
} from "@mui/material";
import Form from "./Form.jsx";
import registerImage from "../../assets/image/login.jpg";
import { Link } from "react-router-dom";
import { ArrowBack as ArrowBackIcon } from "@mui/icons-material";

const RegisterPage = () => {
  const theme = useTheme();
  const isNonMobileScreens = useMediaQuery("(min-width: 1200px)");
  return (
    <Box>
      <Grid container>
        <Grid
          item
          xs={0}
          lg={7}
          display={isNonMobileScreens ? "block" : "none"}
        >
          <Box
            backgroundColor={theme.palette.background.alt}
            height="100vh"
            sx={{
              width: "100%",
              backgroundImage: `url(${registerImage})`,
              backgroundSize: "contain",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
            }}
          />
        </Grid>
        <Grid
          item
          xs={12}
          lg={5}
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          backgroundColor={theme.palette.primary.light}
          height="100vh"
          position="relative"
        >
          {/* back button */}
          <Box
            component={Link}
            to="/"
            style={{
              position: "absolute",
              top: "1rem",
              left: "1rem",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "0.5rem",
              textTransform: "none",
              textDecoration: "none",
            }}
          >
            <IconButton>
              <ArrowBackIcon />
            </IconButton>
            <Typography
              fontWeight="500"
              variant="h5"
              sx={{
                textTransform: "none",
                textDecoration: "none",
                color: theme.palette.text.primary,
              }}
            >
              Back
            </Typography>
          </Box>
          <Box
            backgroundColor={theme.palette.background.alt}
            borderRadius="1rem"
            padding="2rem"
          >
            <Typography
              fontWeight="500"
              variant="h2"
              sx={{ mb: "1.5rem" }}
              textAlign="center"
            >
              Welcome to TrashTaggers.
            </Typography>
            <Form />
            <Link to="/login">
              <Typography
                fontWeight="500"
                variant="h5"
                sx={{ mt: "1.5rem" }}
                textAlign="center"
              >
                Already have an account? Login here.
              </Typography>
            </Link>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default RegisterPage;
