import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

// alert with button nav
const AlertMsgWithBtnNav = ({ message }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const navigateLogin = () => {
    sessionStorage.setItem("redirect", location.pathname);
    navigate("/login");
  };

  return (
    <div className="w-100 text-center">
      <p>{message}</p>
      <button onClick={navigateLogin} className="btn btn-light ms-auto w-100">
        Login
      </button>
    </div>
  );
};

// normal toast
const ToastReact = ({ msg }) => {
  return (
    <div className="text-center">
      <p>{msg}</p>
    </div>
  );
};

const toastHandler = ({ data, error, pending, info, alert }) => {
  toast.dismiss();
  if (pending) {
    toast.loading(<ToastReact msg={pending} />);
  }
  if (data) {
    toast.success(<ToastReact msg={data} />);
  }
  if (error) {
    toast.error(<ToastReact msg={error} />);
  }
  if (info) {
    toast.info(<ToastReact msg={info} />);
  }
  if (alert) {
    toast.error(<AlertMsgWithBtnNav message={alert} />, { autoClose: false });
  }
};

export default toastHandler;
