
import React, { useEffect } from "react";
import { Box, Button, Typography } from "@mui/material";
import NewEvent from "./NewEvent";
import WidgetWrapper from "../../components/customMUI/WidgetWrapper";
import { getAllCevents } from "../../features/cevents/ceventSlice";
import { useSelector, useDispatch } from "react-redux";
import NewCevent from "./newCevent";



const Event = () => {

//TODO : Get event Data and map down

const dispatch = useDispatch();
  const { cevents, isError, message, isSuccess, isLoading } = useSelector(
    (state) => state.cevent
  );
  useEffect(() => {
    dispatch(getAllCevents());
  }, []);



  return(
    
    <Box display="flex" flexDirection="column" gap="1rem">
    <WidgetWrapper>
      <NewCevent />
    </WidgetWrapper>
    {cevents.map((cevent) => (
      <WidgetWrapper>
        <Typography>{cevent.description}</Typography>
      </WidgetWrapper>
    ))}
  </Box>
  ); 
};

export default Event;
