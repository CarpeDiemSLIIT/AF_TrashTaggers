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
    async (event, thunkAPI) => {
      try {
        const token = thunkAPI.getState().auth.user.token;
        return await eventService.addNewEvent(event, token);         
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
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().dashAuth.user.token
      return await eventService.deleteEvent(id, token);      
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)



export const updateEvent = createAsyncThunk(
  "event/updateEvent",
  async (event, thunkAPI) => {
    try {
      const token = thunkAPI.getState().dashAuth.user.token
     
      return await eventService.updateEvent(event, token)
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)




  const eventSlice = createSlice({
    name: "events",
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
        
        .addCase(updateEvent.pending, (state) => {
          state.isLoading = true
        })
        .addCase(updateEvent.fulfilled, (state, action) => {
          state.isLoading = false
          state.isSuccess = true
          state.isError = false
          state.events = state.events.map(
            (events) => {
              if(events._id === action.payload._id)
                return action.payload
              return events
            }
          )
        })
        .addCase(updateEvent.rejected, (state, action) => {
          state.isLoading = false
          state.isError = true
          
          state.message = action.payload 
        })
    

        .addCase(deleteEvent.pending, (state) => {
          state.isLoading = true
        })
        .addCase(deleteEvent.fulfilled, (state, action) => {
          state.isLoading = false
          state.isSuccess = true
          state.events = state.events.filter(
            (events) => events._id !== action.payload.id
          )
        })
        .addCase(deleteEvent.rejected, (state, action) => {
          state.isLoading = false
          state.isError = true
          state.message = action.payload
        })
        
        ;
    },
  });

  export const { reset } = eventSlice.actions;
export default eventSlice.reducer;