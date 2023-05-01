import { Box, useMediaQuery } from "@mui/material";
import { Outlet, useLocation } from "react-router-dom";
import Header from "../components/header/Header.jsx";
import UserSidebar from "../components/UserSidebar.jsx";
import AdminSidebar from "../components/AdminSidebar.jsx";
import WidgetWrapper from "../components/customMUI/WidgetWrapper.jsx";
const Dashboard = () => {
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
  const location = useLocation();
  return (
    <Box>
      <Header />
      <Box
        width="100%"
        paddingY="2rem"
        paddingX={isNonMobileScreens ? "10%" : "1%"}
        display="flex"
        gap="0.5rem"
        justifyContent="space-between"
      >
        <Box flexBasis={isNonMobileScreens ? "20%" : "20%"}>
          {location.pathname.startsWith("/admin-dashboard") ? (
            <AdminSidebar />
          ) : (
            <UserSidebar />
          )}
        </Box>
        <Box flexBasis="80%" maxWidth="80%">
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;
