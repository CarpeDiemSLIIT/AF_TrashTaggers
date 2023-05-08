import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import eventService from "./eventService";
import { toast } from "react-toastify";

const initialState = {
  events: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

export const getAllEvents = createAsyncThunk(
  "event/getAllEvents",
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
export const addNewEvent = createAsyncThunk(
  "event/addNewEvent",
  async (post, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await eventService.addNewEvent(post, token);      
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

export const deleteEvent = createAsyncThunk(
  "event/deleteEvent",
  async (post, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await eventService.deleteEvent(post, token);
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

export const updateEvent = createAsyncThunk(
  "event/updateEvent",
  async (post, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await eventService.updateEvent(post, token);
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
        state.events = action.payload;
      })
      .addCase(getAllEvents.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(addNewEvent.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addNewEvent.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.events.push(action.payload);
      })
      .addCase(addNewEvent.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
        //delete cevent
        .addCase(deleteEvent.rejected, (state, action) => {
          state.isLoading = false;
          state.isError = true;
          state.message = action.payload;
          toast.error(`Error: ${action.payload}`);
        })
        .addCase(deleteEvent.pending, (state) => {
          state.isLoading = true;
        })
        .addCase(deleteEvent.fulfilled, (state, action) => {
          state.isLoading = false;
          state.isSuccess = true;
          toast.success("Event deleted successfully");
          state.events = state.events.filter(
            (event) => event._id !== action.payload._id
          );
        })
        //update cevent
        .addCase(updateEvent.pending, (state) => {
          state.isLoading = true;
        })
        .addCase(updateEvent.fulfilled, (state, action) => {
          state.isLoading = false;
          state.isSuccess = true;
          toast.success("Event updated successfully");
          state.events = state.events.map((event) =>
            event._id === action.payload._id ? action.payload : event
          );
        })
        .addCase(updateEvent.rejected, (state, action) => {
          state.isLoading = false;
          state.isError = true;
          state.message = action.payload;
        });
  },
});

export const { reset } = eventSlice.actions;
export default eventSlice.reducer;
