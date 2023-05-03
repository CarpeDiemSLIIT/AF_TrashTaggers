import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import postReducer from "../features/posts/postSlice";
import userReducer from "../features/users/userSlice";
import eventReducer from "../features/events/eventSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    post: postReducer,
    users: userReducer,
    event : eventReducer,
    
  },
});
