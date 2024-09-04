import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Ticket from "./Ticket";
import { localiseDate } from "../utils/formatDate";

const Card = ({ event, ticket, bookingDetails }) => {
  const navigate = useNavigate();

  // show ticket modal
  const [ticketModal, setTicketModal] = useState(false);
  const openTicketModal = () => setTicketModal(true);
  const closeTicketModal = () => setTicketModal(false);

  // show details
  const eventDetailPageRedirector = () => {
    navigate(`/ticketdetails/${event?._id}`);
  };

  return (
    <>
      <div
        className="text-light d-inline-block"
        onClick={ticket ? openTicketModal : eventDetailPageRedirector}
        role="button"
      >
        <img
          src={event?.poster.url}
          alt="poster image"
          width="100%"
          height="300px"
          className="rounded-5"
          style={{ objectFit: "cover" }}
        />
        <h6 className="mb-0 mt-3" style={{ fontFamily: "Kodchasan" }}>
          {event?.title}
        </h6>
        <p className="fw-light">{localiseDate(event?.startdate)}</p>
      </div>
      <Ticket
        event={event}
        show={ticketModal}
        handleClose={closeTicketModal}
        bookingDetails={bookingDetails}
      />
    </>
  );
};

export default Card;
