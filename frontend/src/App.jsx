import React from "react";
import Home from "./pages/home/Home";
import { Route, Routes } from "react-router-dom";
import PageNotFound from "./pages/PageNotFound";
import Tickets from "./pages/Tickets";
import TicketDetails from "./pages/ticketDetails/TicketDetails";
import Auth from "./pages/Auth";
import { Bounce, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AuthRedirector from "./utils/authRedirector";
import AuthCheck from "./utils/authCheck";

const App = () => {
  return (
    <>
      <AuthCheck>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/tickets" element={<Tickets />} />
          <Route path="/ticketdetails/:id" element={<TicketDetails />} />
          <Route path="/login" element={<Auth />} />
          <Route path="/register" element={<Auth fromRegister={true} />} />
          <Route path="/profile" element={<AuthRedirector />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </AuthCheck>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
        transition={Bounce}
      />
    </>
  );
};

export default App;
