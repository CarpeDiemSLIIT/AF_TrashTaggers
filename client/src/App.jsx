import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { themeSettings } from "./theme";

//local imports
import Layout from "./pages/Layout.jsx";
import MakeMeAdmin from "./pages/MakeMeAdmin.jsx";
import Login from "./pages/login";
import Profile from "./pages/profile";
import Feed from "./pages/feed";
import Events from "./pages/events";
import Register from "./pages/register";
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en.json";
import ru from "javascript-time-ago/locale/ru.json";

//admin dashboard
import AdminDashboard from "./pages/adminDashboard";
import UserManagement from "./pages/adminDashboard/userManagement";
import SuspendedUsers from "./pages/adminDashboard/userManagement/suspendUser";
import PostManagement from "./pages/adminDashboard/postManagement";
import EventManagement from "./pages/adminDashboard/eventManagement";

function App() {
  const { user, mode } = useSelector((state) => state.auth);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  TimeAgo.setDefaultLocale(en.locale);
  TimeAgo.addLocale(en);
  // const isAuth = Boolean(useSelector((state) => state.token));

  return (
    <div className="app">
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route
              path="/make-me-admin"
              element={user ? <MakeMeAdmin /> : <Navigate to="/login" />}
            />
            <Route path="/" element={<Layout />}>
              <Route
                path="profile"
                element={user ? <Profile /> : <Navigate to="/login" />}
              />
              <Route
                path="admin-dashboard"
                element={
                  user ? (
                    user.userData.role === "admin" ? (
                      <AdminDashboard />
                    ) : (
                      <Navigate to="/" />
                    )
                  ) : (
                    <Navigate to="/" />
                  )
                }
              >
                <Route path="user-management" element={<UserManagement />} />
                <Route
                  path="user-management-suspend"
                  element={<SuspendedUsers />}
                />
                <Route path="post-management" element={<PostManagement />} />
                <Route path="event-management" element={<EventManagement />} />
              </Route>
              <Route path="events" element={<Events />} />
              <Route path="" element={<Feed />} />
            </Route>
            {/* <Route path="*" element={<Navigate to="/" />} /> */}
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
