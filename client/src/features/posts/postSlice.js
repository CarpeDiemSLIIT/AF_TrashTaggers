import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import postService from "./postService";

const initialState = {
  posts: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

export const getAllPosts = createAsyncThunk(
  "post/getAllPosts",
  async (_, thunkAPI) => {
    try {
      return await postService.getAllPosts();
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
export const addNewPost = createAsyncThunk(
  "post/addNewPost",
  async (postId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await postService.addNewPost(token, postId);
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

export const approveNewPost = createAsyncThunk(
  "post/approveNewPost",
  async (postId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await postService.approveNewPost(postId, token);
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

export const rejectNewPost = createAsyncThunk(
  "post/rejectNewPost",
  async (postId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await postService.rejectNewPost(postId, token);
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

const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    reset: (state) => {
      state = initialState;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllPosts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllPosts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.posts = action.payload;
      })
      .addCase(getAllPosts.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(addNewPost.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addNewPost.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.posts.push(action.payload);
      })
      .addCase(addNewPost.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(approveNewPost.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(approveNewPost.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.posts = action.payload;
      })
      .addCase(approveNewPost.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(rejectNewPost.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(rejectNewPost.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.posts = action.payload;
      })
      .addCase(rejectNewPost.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = postSlice.actions;
export default postSlice.reducer;
