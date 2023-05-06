
import React, { useEffect } from "react";
import {
  Backdrop,
  Box,
  CircularProgress,
  Typography,
  useTheme,
} from "@mui/material";
import NewEvent from "./NewEvent";
import WidgetWrapper from "../../components/customMUI/WidgetWrapper";
import { getAllCevents , reset } from "../../features/cevents/ceventSlice";
import { useSelector, useDispatch } from "react-redux";
import NewCevent from "./newCevent";
import Cevent from "../../components/Events/Cevent";



const Event = () => {

//TODO : Get event Data and map down

const dispatch = useDispatch();
  const { cevents, isError, message, isSuccess, isLoading } = useSelector(
    (state) => state.cevent
  );
  useEffect(() => {
    dispatch(getAllCevents());
    return () => {
      reset();
    };
  }, []);

  const theme = useTheme();

  return(
    
    <Box display="flex" flexDirection="column" gap="1rem">
    <Box
        padding="0"
        margin="0"
        sx={{
          padding: "1.5rem 1.5rem 1.5rem 1.5rem",
          backgroundColor: theme.palette.background.alt,
          borderRadius: "0.75rem",
        }}
      >
        <NewCevent />
      </Box>
    {cevents.map((cevent) => <Cevent event={cevent} key={cevent._id} />)}
  </Box>
  ); 
};

export default Event;
