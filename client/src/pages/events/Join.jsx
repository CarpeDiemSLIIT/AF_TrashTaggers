import React, { useEffect } from "react";
import { Box, Button, Typography } from "@mui/material";
import WidgetWrapper from "../../components/customMUI/WidgetWrapper";
import { getAllEvents } from "../../features/events/eventSlice";
import { useSelector, useDispatch } from "react-redux";


function Join() {

//Get unfinishedevent data and map down


const dispatch = useDispatch();
const { events, isError, message, isSuccess, isLoading } = useSelector(
    (state) => state.event
);

useEffect(() => {
    dispatch(getAllEvents());
}, []);

console.log(events);


  return (
    <Box display="flex" flexDirection="column" gap="1rem">
      {events.map((event) => (
        <WidgetWrapper>
          <Typography>{event.description}</Typography>
        </WidgetWrapper>
      ))}
    </Box>
  )
}

export default Join