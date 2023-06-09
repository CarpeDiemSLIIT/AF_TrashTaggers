import { DarkMode, LightMode } from "@mui/icons-material";
import {
  Box,
  Button,
  IconButton,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { setMode, logout } from "../../features/auth/authSlice";
import logo from "../../assets/logo.svg";
import FlexBetween from "../customMUI/FlexBetween";
import { useNavigate } from "react-router-dom";
import AccountMenu from "./AccountMenu";
import HowToRegIcon from "@mui/icons-material/HowToReg";
import LoginIcon from "@mui/icons-material/Login";
const Header = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const neutralLight = theme.palette.neutral.light;
  const dark = theme.palette.neutral.dark;
  const background = theme.palette.background.default;
  const primaryLight = theme.palette.primary.light;
  const alt = theme.palette.background.alt;
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");

  return (
    <FlexBetween
      backgroundColor={alt}
      paddingX={isNonMobileScreens ? "5%" : "1%"}
      paddingY="0.25rem"
    >
      <Box
        sx={{
          "&:hover": {
            cursor: "pointer",
          },
        }}
        onClick={() => navigate("/")}
      >
        <img src={logo} alt="logo" height="55px" />
      </Box>
      <FlexBetween>
        {user && user.userData.role === "admin" && (
          <Button
            variant="outlined"
            onClick={() => {
              navigate("/admin-dashboard");
            }}
          >
            Admin Dashboard
          </Button>
        )}
        <IconButton
          onClick={() => dispatch(setMode())}
          sx={{ fontSize: "25px" }}
        >
          {theme.palette.mode === "dark" ? (
            <DarkMode sx={{ fontSize: "25px" }} />
          ) : (
            <LightMode sx={{ color: dark, fontSize: "25px" }} />
          )}
        </IconButton>

        {user ? (
          <>
            <AccountMenu />
          </>
        ) : (
          <>
            <Button
              variant="text"
              onClick={() => {
                navigate("/login");
              }}
              startIcon={<LoginIcon sx={{ color: "primary" }} />}
            >
              {isNonMobileScreens && "Log In"}
            </Button>
            <Button
              variant="text"
              onClick={() => {
                navigate("/register");
              }}
              startIcon={<HowToRegIcon sx={{ color: "primary" }} />}
            >
              {isNonMobileScreens && "Sign Up"}
            </Button>
          </>
        )}
      </FlexBetween>
    </FlexBetween>
  );
};

export default Header;
