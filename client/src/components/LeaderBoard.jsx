import { useState, useEffect } from "react";
import WidgetWrapper from "./customMUI/WidgetWrapper";
import Typography from "@mui/material/Typography";
import axios from "axios";
import { Box } from "@mui/material";
import FlexBetween from "./customMUI/FlexBetween";

const LeaderBoard = () => {
  //axios get the top 10 users
  //display them in a list
  //display their badges
  //display their points
  //display their level
  //display their name
  //display their profile picture

  const [topTenUsers, setTopTenUsers] = useState([]);

  const getTopTenUsers = async () => {
    //axios get the top 10 users
    await axios
      .get("/api/users/top-ten-users")
      .then((response) => {
        setTopTenUsers(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getTopTenUsers();
  }, []);

  return (
    <WidgetWrapper display="flex" flexDirection="column" gap="0.5rem">
      <Typography
        variant="h4"
        color="primary"
        fontWeight="bold"
        textAlign="center"
      >
        LEADERBOARD
      </Typography>
      {topTenUsers.map((user, index) => (
        <FlexBetween key={index}>
          <Box>
            {index + 1}. &nbsp;{user.firstName} {user.lastName}
          </Box>

          {user.points}
        </FlexBetween>
      ))}
    </WidgetWrapper>
  );
};

export default LeaderBoard;
