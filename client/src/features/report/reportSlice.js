import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import reportService from "./reportService";
import { toast } from "react-toastify";

const initialState = {
  reports: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

export const getAllReports = createAsyncThunk(
  "report/getAllReports",
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;

      return await reportService.getAllReports(token);
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
export const addNewReport = createAsyncThunk(
  "report/addNewReport",
  async (reportAndPid, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      const reason = reportAndPid.reason;
      return await reportService.addNewReport(
        reason,
        reportAndPid.postId,
        token
      );
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

export const resolveReport = createAsyncThunk(
  "report/resolveReport",
  async (reportID, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await reportService.resolveReport(reportID, token);
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

export const resolveReportBanCreator = createAsyncThunk(
  "report/resolveReportBanCreator",
  async (reportIDAndCID, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await reportService.resolveReportBanCreator(
        reportIDAndCID.reportId,
        reportIDAndCID.authorId,
        token
      );
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

export const resolveReportRemovePost = createAsyncThunk(
  "report/resolveReportRemovePost",
  async (reportIDAndCID, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await reportService.resolveReportRemovePost(
        reportIDAndCID.reportId,
        reportIDAndCID.postId,
        token
      );
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

const reportSlice = createSlice({
  name: "report",
  initialState,
  reducers: {
    reset: (state) => {
      state = {
        isError: false,
        isSuccess: false,
        isLoading: false,
        message: "",
      };
    },
  },
  extraReducers: (builder) => {
    builder
      //get all reports
      .addCase(getAllReports.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllReports.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.reports = action.payload;
      })
      .addCase(getAllReports.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.reports = action.payload;
      })
      //add new post
      .addCase(addNewReport.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addNewReport.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        toast.success("Reported ✅");
        state.reports.push(action.payload);
      })
      .addCase(addNewReport.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })

      //resolve report
      .addCase(resolveReport.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(resolveReport.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        toast.success("Report is Resolved ✅");
        state.reports = action.payload;
      })
      .addCase(resolveReport.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      //resolve report ban user
      .addCase(resolveReportBanCreator.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(resolveReportBanCreator.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        toast.success("Report is Resolved ✅");
        state.reports = action.payload;
      })
      .addCase(resolveReportBanCreator.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      //resolve report remove post
      .addCase(resolveReportRemovePost.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(resolveReportRemovePost.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        toast.success("Report is Resolved ✅");
        state.reports = action.payload;
      })
      .addCase(resolveReportRemovePost.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = reportSlice.actions;
export default reportSlice.reducer;
