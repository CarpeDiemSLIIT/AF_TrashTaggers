import React, { useEffect } from "react";
import { Box, Button, Typography } from "@mui/material";
import NewEvent from "./NewEvent";
import WidgetWrapper from "../../components/customMUI/WidgetWrapper";



const Event = () => {

//TODO : Get event Data and map down



  return(
    
  <div>

    <Box><WidgetWrapper>
        <NewEvent />
      </WidgetWrapper></Box>
    <br />
    <hr/>
    <Box display="flex" flexDirection="column" gap="1rem">
      events
    </Box></div>
  ); 
};

export default Event;
