import React from "react";
import "../../pages/ticketDetails/ticketDetails.css";
import StageLayout from "./stagelayout";

const DetailBody = ({ event }) => {
  return (
    <div className="body-container p-3 p-md-5">
      <h3 className="mb-4">Ticket Details</h3>
      {event?.tickets?.map((ticket, index) => (
        <h6 key={index}>
          {ticket.type}:<span className="ms-2 fw-light">{ticket.desc}</span>
        </h6>
      ))}
      <h3 className="my-4">Event Details</h3>
      <p className="mb-5">{event?.desc}</p>
      <StageLayout />
    </div>
  );
};

export default DetailBody;
