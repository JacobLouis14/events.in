import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userDataApiHandler } from "../services/allapis";
import useAxios from "../hooks/useAxios";

const AuthCheck = ({ children }) => {
  const dispatch = useDispatch();
  const { token, user } = useSelector((state) => state.auth);
  useAxios(); // axios instance

  useEffect(() => {
    dispatch(userDataApiHandler());
  }, [token]);
  // console.log(`from authCheck${token}`);

  return <>{children}</>;
};

export default AuthCheck;
