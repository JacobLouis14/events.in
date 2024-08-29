import React from "react";
import Appbar from "../components/Appbar";
import RegisterView from "../components/auth/register";
import LoginView from "../components/auth/login";

const Auth = ({ fromRegister }) => {
  return (
    <div style={{ backgroundColor: "#20242b" }}>
      <Appbar />
      <div
        className="min-vh-100 d-flex justify-content-center"
        style={{ backgroundColor: "#edf2f4", paddingTop: "120px" }}
      >
        {fromRegister ? <RegisterView /> : <LoginView />}
      </div>
    </div>
  );
};

export default Auth;
