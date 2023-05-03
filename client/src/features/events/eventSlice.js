import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import eventService from "./eventService";

const initialState = {
    events: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: "",
  };

  export const getAllEvents = createAsyncThunk(
    "post/getAllPosts",
    async (_, thunkAPI) => {
      try {
        const token = thunkAPI.getState().auth.user.token;
        return await eventService.getAllEvents(token);   
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


  const eventSlice = createSlice({
    name: "event",
    initialState,
    reducers: {
      reset: (state) => {
        state = initialState;
      },
    },
    extraReducers: (builder) => {
      builder
        .addCase(getAllEvents.pending, (state) => {
          state.isLoading = true;
        })
        .addCase(getAllEvents.fulfilled, (state, action) => {
          state.isLoading = false;
          state.isSuccess = true;
          state.posts = action.payload;
        })
        .addCase(getAllEvents.rejected, (state, action) => {
          state.isLoading = false;
          state.isError = true;
          state.message = action.payload;
        });
        // .addCase(addNewEvent.pending, (state) => {
        //   state.isLoading = true;
        // })
        // .addCase(addNewEvent.fulfilled, (state, action) => {
        //   state.isLoading = false;
        //   state.isSuccess = true;
        //   state.posts.push(action.payload);
        // })
        // .addCase(addNewEvent.rejected, (state, action) => {
        //   state.isLoading = false;
        //   state.isError = true;
        //   state.message = action.payload;
        // });
    },
  });

  export const { reset } = eventSlice.actions;
export default eventSlice.reducer;