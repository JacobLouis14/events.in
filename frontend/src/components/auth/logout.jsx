import React from "react";
import { useDispatch } from "react-redux";
import { logOuthandler } from "../../redux/slices/authslice";
import { useNavigate } from "react-router-dom";

const LogOutBtn = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // log out handler
  const handleLogout = () => {
    sessionStorage.setItem("isLogOut", true);
    dispatch(logOuthandler());
    navigate("/");
  };

  return (
    <>
      <button className="btn btn-danger" onClick={handleLogout}>
        Log OUt
      </button>
    </>
  );
};

export default LogOutBtn;
