import { useDispatch } from "react-redux";
import { privateApiInstance, setupInterceptor } from "../services/apiInstances";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const useAxios = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    setupInterceptor({ dispatch, navigate });
    console.log("useAxios fired");
  }, []);

  return privateApiInstance;
};

export default useAxios;
