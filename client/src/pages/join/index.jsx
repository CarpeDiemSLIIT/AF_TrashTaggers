
import React, { useEffect } from "react";
import {
  Backdrop,
  Box,
  CircularProgress,
  Typography,
  useTheme,
} from "@mui/material";
import NewEvent from "./newEvent";
import WidgetWrapper from "../../components/customMUI/WidgetWrapper";
import { getAllEvents , reset } from "../../features/events/eventSlice";
import { useSelector, useDispatch } from "react-redux";
// import NewCevent from "./newCevent";
// import Cevent from "../../components/Events/Cevent";
import Event from "../../components/Events/Event";




const Join = () => {

//TODO : Get event Data and map down

const dispatch = useDispatch();
const { events, isError, message, isSuccess, isLoading } = useSelector(
    (state) => state.event
);
  useEffect(() => {
    dispatch(getAllEvents());
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
          borderRadius: "0.75rem",
        }}
      >
        <NewEvent />
      </Box>
    {events.map((event) => <Event event={event} key={event._id} />)}
    <Box display="flex" flexDirection="column" gap="1rem">

    </Box>
  </Box>
  ); 
};

export default Join;
