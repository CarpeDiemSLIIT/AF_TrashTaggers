import { DarkMode, LightMode, Notifications } from "@mui/icons-material";
import { Avatar, Box, Button, IconButton, useTheme } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { setMode, logout } from "../../features/auth/authSlice";
import logo from "../../assets/ayusha.svg";
import FlexBetween from "../customMUI/FlexBetween";
import { useNavigate } from "react-router-dom";
import AccountMenu from "./AccountMenu";

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

  return (
    <FlexBetween backgroundColor={alt} paddingX="2rem">
      <Box
        sx={{
          "&:hover": {
            cursor: "pointer",
          },
        }}
        onClick={() => navigate("/")}
      >
        <img src={logo} alt="logo" height="40px" />
      </Box>
      <FlexBetween>
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
            {user.userData.role === "user" && (
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
              onClick={() => {
                navigate("/profile");
              }}
              sx={{ fontSize: "25px" }}
            >
              <Notifications sx={{ color: dark, fontSize: "25px" }} />
            </IconButton>
            <AccountMenu />
          </>
        ) : (
          <>
            <Button
              variant="text"
              onClick={() => {
                navigate("/login");
              }}
            >
              Log In
            </Button>
            <Button
              variant="text"
              onClick={() => {
                navigate("/register");
              }}
            >
              Sign Up
            </Button>
          </>
        )}
      </FlexBetween>
    </FlexBetween>
  );
};

export default Header;

// function Profile() {
//   const dispatch = useDispatch();
//   const user = useSelector((state) => state.auth.user.userData);
//   console.log(user);
//   const [anchorEl, setAnchorEl] = useState(null);
//   const open = Boolean(anchorEl);
//   const handleClick = (event) => {
//     setAnchorEl(event.currentTarget);
//   };
//   const handleClose = () => {
//     setAnchorEl(null);
//   };
//   return (
//     <>
//       <IconButton
//         id="basic-button"
//         aria-controls={open ? "basic-menu" : undefined}
//         aria-haspopup="true"
//         aria-expanded={open ? "true" : undefined}
//         onClick={handleClick}
//       >
//         <Avatar
//           alt={user.firstName}
//           src={user.ImageURL ? user.ImageURL : ""}
//           // src="/static/images/avatar/1.jpg"
//           // sx={{ width: 56, height: 56 }}
//         />
//       </IconButton>
//       {user.firstName}
//       <Menu
//         id="basic-menu"
//         anchorEl={anchorEl}
//         open={open}
//         onClose={handleClose}
//         MenuListProps={{
//           "aria-labelledby": "basic-button",
//         }}
//       >
//         <MenuItem
//           onClick={() => {
//             dispatch(logout());
//           }}
//         >
//           Logout
//         </MenuItem>
//       </Menu>
//     </>
//   );
// }
