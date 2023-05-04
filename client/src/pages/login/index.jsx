import { Box, Typography, useTheme, useMediaQuery, Grid } from "@mui/material";
import Form from "./Form.jsx";
import loginImage from "../../assets/image/login.jpg";

const LoginPage = () => {
  const theme = useTheme();
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
  return (
    <Box>
      <Box
        width="100%"
        backgroundColor={theme.palette.background.alt}
        textAlign="center"
      >
        <Typography fontWeight="bold" fontSize="32px" color="primary">
          TrashTaggers Login
        </Typography>
      </Box>

      <Grid container>
        <Grid
          item
          xs={0}
          md={8}
          display={isNonMobileScreens ? "block" : "none"}
        >
          <Box
            marginTop="1%"
            marginLeft="2%"
            component="img"
            width={isNonMobileScreens ? "100%" : "0%"}
            backgroundColor={theme.palette.background.alt}
            borderRadius="1.5rem"
            src={loginImage}
          ></Box>
        </Grid>
        <Grid item xs={12} md={4}>
          <Box
            width={isNonMobileScreens ? "80%" : "93%"}
            p="2rem"
            marginTop="20%"
            marginBottom="auto"
            marginLeft="auto"
            marginRight="auto"
            borderRadius="1.5rem"
            backgroundColor={theme.palette.background.alt}
          >
            <Typography
              fontWeight="500"
              variant="h2"
              sx={{ mb: "1.5rem" }}
              textAlign="center"
            >
              Welcome to TrashTaggers,
            </Typography>
            <Form />
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default LoginPage;
