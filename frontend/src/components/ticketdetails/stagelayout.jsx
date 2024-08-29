import React from "react";
import "../../pages/ticketDetails/ticketDetails.css";

const StageLayout = () => {
  return (
    <div>
      <h2 className="mb-3">Stage Layout</h2>
      <p className="mb-5">
        * check the ticket type to know which areas are active for this event
      </p>
      <div className="d-flex justify-content-center stage-layout-container">
        <div className="show-screen d-flex justify-content-center align-items-center">
          Show happen here
        </div>
        <div className="vip-lonunge1 d-flex justify-content-center align-items-center">
          Vip
        </div>
        <div className="vip-lonunge2 d-flex justify-content-center align-items-center">
          Vip
        </div>
        <div className="premium-lounge d-flex justify-content-center align-items-center">
          Premium
        </div>
        <div className="gold-lounge d-flex justify-content-center align-items-center">
          Gold
        </div>
        <div className="silver-lounge d-flex justify-content-center align-items-center">
          Silver
        </div>
      </div>
    </div>
  );
};

export default StageLayout;
