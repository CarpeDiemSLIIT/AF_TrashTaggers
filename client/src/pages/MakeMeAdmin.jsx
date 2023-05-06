import { useEffect } from "react";
import authService from "../features/auth/authService.js";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import { useSelector } from "react-redux";
const DefaultAdmin = () => {
  const user = useSelector((state) => state.auth.user);
  const navigate = useNavigate();
  useEffect(() => {}, []);
  return (
    <div>
      <Button
        onClick={() => {
          authService.makeMeAdmin(user.token);
          navigate("/");
        }}
      >
        Make me admin
      </Button>
    </div>
  );
};

export default DefaultAdmin;
