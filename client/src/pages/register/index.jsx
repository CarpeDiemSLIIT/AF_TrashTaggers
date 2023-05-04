import React from "react";
import Form from "./Form";

const Register = () => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "100%",
      }}
    >
      <h1>Register page</h1>
      <div style={{ width: "70%" }}>
        <Form />
      </div>
    </div>
  );
};

export default Register;
