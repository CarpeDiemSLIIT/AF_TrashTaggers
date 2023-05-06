import * as React from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import { Button, Divider, FormHelperText } from "@mui/material";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addNewReport } from "../../features/report/reportSlice";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function ReportForm({ post, handleClose }) {
  const [reason, setReason] = useState("");
  const dispatch = useDispatch();
  const Navigate = useNavigate();

  const [error, setError] = useState(false);
  const [helperText, setHelperText] = useState("");


  const handleRadioChange = (event) => {
    setReason(event.target.value);
    setHelperText(" ");
    setError(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(reason);

    if (reason === "") {
      setHelperText("Please select an option.");
      setError(true);
    }

    //TODO: Dispatch

    dispatch(addNewReport({ reason, postId: post._id }));
    handleClose();
  };

  return (
    <form onSubmit={handleSubmit}>
      <FormControl error={error}>
        <FormLabel id="demo-radio-buttons-group-label">
          Select a reason:
        </FormLabel>
        <RadioGroup
          aria-labelledby="demo-radio-buttons-group-label"
          id="reasons"
          onChange={handleRadioChange}
          value={reason}
        >
          <FormControlLabel
            value="Inappropriate Content"
            control={<Radio />}
            label="Inappropriate Content"
            name="reason"
          />
          <FormControlLabel
            value="Spam or Scam"
            name="reason"
            control={<Radio />}
            label="Spam or Scam"
          />
          <FormControlLabel
            value="Intellectual Property Infringement"
            name="reason"
            control={<Radio />}
            label="Intellectual Property Infringement"
          />
        </RadioGroup>
        <FormHelperText>{helperText}</FormHelperText>
        <Divider />

        <Button type="submit">Submit</Button>
      </FormControl>
    </form>
  );
}
