import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import ceventService from "./ceventService";
const initialState = {
  cevents: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

export const getAllCevents = createAsyncThunk(
  "cevent/getAllCevents",
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await ceventService.getAllCevents(token);      
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
export const addNewCevent = createAsyncThunk(
  "cevent/addNewCevent",
  async (post, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await ceventService.addNewCevent(post, token);      
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

// export const approvepost = createAsyncThunk(
//   "post/approvepost",
//   async (id, thunkAPI) => {
//     try {
//       const token = thunkAPI.getState().auth.user.token;
//       return await postService.changepostStatus(id, "approved", token);
//     } catch (error) {
//       const message =
//         (error.response &&
//           error.response.data &&
//           error.response.data.message) ||
//         error.message ||
//         error.toString();
//       return thunkAPI.rejectWithValue(message);
//     }
//   }
// );

const ceventSlice = createSlice({
  name: "cevent",
  initialState,
  reducers: {
    reset: (state) => {
      state = initialState;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllCevents.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllCevents.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.cevents = action.payload;
      })
      .addCase(getAllCevents.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(addNewCevent.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addNewCevent.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.cevents.push(action.payload);
      })
      .addCase(addNewCevent.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = ceventSlice.actions;
export default ceventSlice.reducer;
