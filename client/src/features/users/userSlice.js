import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import userService from "./userService";

const initialState = {
  allUsers: [],
  allSuspendedUsers: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

//Get All Active Users
export const getAllUsers = createAsyncThunk(
  "users/getAllUsers",
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await userService.getAllUsers(token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

//Get all suspended users
export const getAllSuspendUsers = createAsyncThunk(
  "users/getAllSuspendUsers",
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await userService.getAllSuspendedUsers(token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

//Suspended users
export const suspendUsers = createAsyncThunk(
  "users/suspendUsers",
  async (deleteID, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await userService.suspendUsers(token, deleteID);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

//ReActive users
export const reActiveUsers = createAsyncThunk(
  "users/reActiveUsers",
  async (deleteID, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await userService.reActiveUsers(token, deleteID);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    reset: (state) => {
      state = initialState;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllUsers.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllUsers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.allUsers = action.payload;
      })
      .addCase(getAllUsers.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getAllSuspendUsers.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllSuspendUsers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.allSuspendedUsers = action.payload;
      })
      .addCase(getAllSuspendUsers.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(suspendUsers.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(suspendUsers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        console.log(action.payload);
        state.allUsers = state.allUsers.filter(
          (user) => user._id !== action.payload._id
        );
      })
      .addCase(suspendUsers.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(reActiveUsers.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(reActiveUsers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        console.log(action.payload);
        state.allSuspendedUsers = state.allSuspendedUsers.filter(
          (user) => user._id !== action.payload._id
        );
      })
      .addCase(reActiveUsers.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});
export const { reset } = userSlice.actions;
export default userSlice.reducer;
