import React, { useEffect } from "react";
import Dashboard from "../pages/dash/Dashboard";
import Profile from "../pages/Profile";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const AuthRedirector = () => {
  const navigate = useNavigate();
  const { token, user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (token == null) {
      navigate("/");
    }
  }, [token]);

  const isAdmin = user?.usertype === "admin" ? true : false;
  return isAdmin ? <Dashboard /> : <Profile user={user} />;
};

export default AuthRedirector;
