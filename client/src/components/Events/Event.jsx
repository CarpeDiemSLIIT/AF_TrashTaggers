import {
    Avatar,
    Box,
    Button,
    Checkbox,
    Chip,
    Divider,
    Typography,
    useTheme,
  } from "@mui/material";
  import React, { useState, useEffect } from "react";
  import { ArrowUpward, ArrowDownward } from "@mui/icons-material";
  import ReactTimeAgo from "react-time-ago";
  import { useDispatch } from "react-redux";
  import { useSelector } from "react-redux";
  import { useNavigate } from "react-router-dom";
  import ThumbDownIcon from "@mui/icons-material/ThumbDown";
  import ThumbUpIcon from "@mui/icons-material/ThumbUp";
  import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
  import axios from "axios";
//   import PostMenu from "../Posts/PostMenu";
// import CeventMenu from "./EventMenu";
import EventMenu from "./EeventMenu";
  // import Comments from "./Comments";
  import DoneIcon from "@mui/icons-material/Done";
  import CommentIcon from "@mui/icons-material/Comment";
  import FlexBetween from "../customMUI/FlexBetween";
  
  const Event = ({ event }) => {
    const dispatch = useDispatch();
    const theme = useTheme();
    const navigate = useNavigate();
    const { user } = useSelector((state) => state.auth);
    
    const {
    
      firstName,
  
      lastName,
      
    } = user.userData;


    // Check if the event date is in the past
    const isEventConcluded = new Date(event.date) < new Date();
 
    const  token   = user.token ;

    const api = axios.create({
      baseURL: "http://localhost:3001",
    });


    const handleJoin = () => {
      const participantName = `${firstName} ${lastName}`;
    
      // Check if participant with same name already exists
      const isParticipantAlreadyJoined = event.Participant.some(
        (participant) => participant.name === participantName
      );
    
      if (isParticipantAlreadyJoined) {
        // Participant already joined
        console.log(`Participant ${participantName} already joined`);
        // Update the UI to show the "Joined" button
        setJoined(true);
      } else {
        // Participant not joined yet, send API request to join
        console.log(`Joining participant ${participantName}`);
        api
          .put(
            `/api/events/participant/${event._id}`,
            {
              Participant: {
                name: participantName,
              },
            },
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          )
          .then((response) => {
            console.log(response.data); // Assuming the response is a success message
            // Update the UI or perform any additional actions after successful join
            setJoined(true);
          })
          .catch((error) => {
            console.error(error.response.data);
            // Handle the error or display an error message
          });
      }
    };
    
    // State to keep track of whether the user has joined or not
    const [joined, setJoined] = useState(false);

    useEffect(() => {
      const participantName = `${firstName} ${lastName}`;
  
      // Check if participant with same name already exists
      const isParticipantAlreadyJoined = event.Participant.some(
        (participant) => participant.name === participantName
      );
  
      // Update the state based on whether the user has already joined
      setJoined(isParticipantAlreadyJoined);
    }, [event.Participant, firstName, lastName]);
    
    const uniqueParticipants = [...new Set(event.Participant.map(participant => participant.name))];

  

    
    
    
    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: " column",
          padding: "0.5rem 0.5rem 0.5rem 0.5rem",
          backgroundColor: theme.palette.background.alt,
          borderRadius: "0.75rem",
          gap: "0.5rem",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "start",
            gap: "0.5rem",
            justifyContent: "space-between",
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "start",
              gap: "0.5rem",
              "&:hover": {
                cursor: "pointer",
              },
            }}
            onClick={() => navigate(`/user/${event.user._id}`)}
          >
            <Avatar
              src={event.user.imageURL ? event.user.imageURL : ""}
              sx={{ width: 32, height: 32 }}
              alt={event.user.firstName}
            />
            <Box>
              <Typography variant="body" fontWeight="300">
                {event.user.firstName} {event.user.lastName} Posted
              </Typography>
              
              {/* <ReactTimeAgo date={new Date(event.createdAt)} locale="en-US" /> */}
            </Box>
          </Box>
          <Box>
            <EventMenu authorId={event.user._id} post={event} />
          </Box>
        </Box>
        
        <Box>
            <center><Typography variant="h3 " fontWeight="500">{event.Title}</Typography></center>
        
        <br/>

          <Typography variant="body1">{event.description}</Typography>
          <Typography variant="body2"> On : {event.date}</Typography>
        </Box>

          {/* Display unique participants */}
          {uniqueParticipants.length > 0 && (
          <Box>
            <Typography variant="subtitle1">Participants:</Typography>
            {uniqueParticipants.map((participant, index) => (
              <Typography variant="body2" key={index}>
                {participant}
              </Typography>
            ))}
          </Box>
        )}


        
        {/* <Divider/> */}
        <Box>
    {isEventConcluded ? (
      <center>
        <Typography variant="body1">Event Concluded</Typography>
      </center>
    ) : joined ? (
      <center>
        <Chip
          icon={<DoneIcon />}
          label="Joined"
          color="success"
          variant="outlined"
        />
      </center>
    ) : (
      <center>
        <Button onClick={handleJoin}>Join</Button>
      </center>
    )}
  </Box>
        <Divider/>
      
  
      </Box>
    );
  };
  
  export default Event;
  

