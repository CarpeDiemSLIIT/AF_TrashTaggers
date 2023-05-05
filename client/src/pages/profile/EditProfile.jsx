import React from "react";
import { Button } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
const EditProfile = () => {
  //TODO edit with dialog
  return (
    <div>
      <Button
        variant="outlined"
        onClick={() => console.log("TODO")}
        startIcon={<EditIcon />}
      >
        Edit&nbsp;Profile
      </Button>
    </div>
  );
};

export default EditProfile;
