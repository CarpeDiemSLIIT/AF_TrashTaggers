import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import postReducer from "../features/posts/postSlice";
import userReducer from "../features/users/userSlice";
import reportReducer from "../features/report/reportSlice";
import eventReducer from "../features/events/eventSlice";
import ceventReducer from "../features/cevents/ceventSlice";
export const store = configureStore({
  reducer: {
    auth: authReducer,
    post: postReducer,
    users: userReducer,
    report: reportReducer,
    event : eventReducer,
    cevent : ceventReducer,
  },
});
