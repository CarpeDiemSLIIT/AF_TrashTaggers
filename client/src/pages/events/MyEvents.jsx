import { Box } from '@mui/material'
import React from 'react'
import Cevent from '../../components/Events/Cevent';
import { useSelector, useDispatch } from "react-redux";

function MyEvents() {

  const { user } = useSelector((state) => state.auth);
  const { cevents, isError, message, isSuccess, isLoading } = useSelector(
    (state) => state.cevent
  );
//get user events and map 

  return (
    <div>
        <Box>
        {cevents.length > 0 &&
        cevents
          .filter((post) => post.user._id === user.userData._id)
          .map((post) => <Cevent event={post} key={post._id} />)}
        </Box>
    </div>
  )
}

export default MyEvents
