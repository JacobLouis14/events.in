import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import "../../pages/ticketDetails/ticketDetails.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTicket } from "@fortawesome/free-solid-svg-icons";
import { localiseDate, seperateDates } from "../../utils/formatDate";

import TicketCnfModal from "./ticketcnfmodal";
import toastHandler from "../../utils/toast";

const DetailsHead = ({ event }) => {
  const [selectedDateIndex, setSelectedDateIndex] = useState(null);
  const [selectedTickettypeIndex, setSelectedtickettypeIndex] = useState(null);
  const [date, setDate] = useState([]);
  const [selectedTicketDetails, setSelectedTicketDetails] = useState({
    date: "",
    selectedticket: "",
    qty: "",
    bookedTime: "",
  });

  // modal data
  const [modalShow, setModalShow] = useState(false);
  const handleModalShow = () => setModalShow(true);
  const handleModalClose = () => setModalShow(false);

  const modalShowHandler = () => {
    const { date, selectedticket } = selectedTicketDetails;
    if (!date || !selectedticket) {
      toastHandler({ info: "select date and ticket type" });
      return;
    }
    date && selectedticket && handleModalShow();
  };

  // date Handling
  const dateChecking = () => {
    if (!event?.enddate) {
      setDate([event?.startdate]);
    } else {
      setDate(seperateDates(event?.startdate, event?.enddate));
    }
  };

  useEffect(() => {
    dateChecking();
  }, [event]);

  return (
    <div
      style={{
        backgroundImage: `url(${event?.banner?.url})`,
        backgroundRepeat: "no-repeat",
        objectFit: "cover",
        backgroundSize: "100%",
      }}
    >
      <div
        className="min-vh-100 position-realative"
        style={{ backgroundColor: "rgba(32, 36, 43, 0.95)" }}
      >
        <Row className="text-light card-details-container">
          <Col md={2}></Col>
          <Col md={9} className="d-flex justify-content-center">
            <Row>
              <Col md={4} className="d-flex justify-content-center">
                <img
                  src={event?.poster.url}
                  alt=""
                  className="rounded-4 card-image"
                />
              </Col>
              <Col md={7} className="ms-md-5 card-details">
                <h5>{event?.title}</h5>
                <h6>{localiseDate(event?.startdate)}</h6>
                <p>{event.desc}</p>
              </Col>
            </Row>
          </Col>
          <Col md={1}></Col>
        </Row>
        {/* Booking choice  */}
        <Row className="ticket-choice pb-3 px-4">
          <Col md={5} className="ps-4">
            <div className="d-flex flex-column">
              <h6>Date</h6>
              <div className="d-flex p-3 flex-wrap">
                {date.map((date, index) => (
                  <button
                    key={index}
                    className="me-3 mb-3 btn date-container border d-flex justify-content-center align-items-center"
                    style={
                      selectedDateIndex === index
                        ? { backgroundColor: "#20242b", color: "white" }
                        : {}
                    }
                    onClick={() => {
                      if (selectedDateIndex === index) {
                        setSelectedDateIndex(null);
                        setSelectedTicketDetails({
                          ...selectedTicketDetails,
                          date: null,
                        });
                      } else {
                        setSelectedDateIndex(index);
                        setSelectedTicketDetails({
                          ...selectedTicketDetails,
                          date: date,
                        });
                      }
                    }}
                  >
                    <p className="mb-0">{localiseDate(date)}</p>
                  </button>
                ))}
              </div>
            </div>
          </Col>
          <Col md={5} className="ps-4">
            <div className="d-flex flex-column">
              <h6>Ticket type</h6>
              <div className="d-flex p-3 flex-wrap">
                {event?.tickets?.map((ticket, index) => (
                  <button
                    key={index}
                    className="me-3 mb-3 btn border date-container d-flex justify-content-center align-items-center flex-column"
                    style={
                      selectedTickettypeIndex === index
                        ? { backgroundColor: "#20242b", color: "white" }
                        : {}
                    }
                    onClick={() => {
                      if (selectedTickettypeIndex === index) {
                        setSelectedtickettypeIndex(null);
                        setSelectedTicketDetails({
                          ...selectedTicketDetails,
                          selectedticket: null,
                        });
                      } else {
                        setSelectedtickettypeIndex(index);
                        setSelectedTicketDetails({
                          ...selectedTicketDetails,
                          selectedticket: ticket.type,
                        });
                      }
                    }}
                  >
                    <p className="mb-0">{ticket.type}</p>
                  </button>
                ))}
              </div>
            </div>
          </Col>
          <Col
            md={2}
            className="d-flex align-items-center justify-content-center"
          >
            <button
              className="btn btn-danger h-100 book-btn"
              onClick={modalShowHandler}
            >
              <FontAwesomeIcon
                icon={faTicket}
                size="2xl"
                style={{ color: "#ffffff" }}
              />
              <h4 className="mt-3">Book Now</h4>
            </button>
          </Col>
        </Row>
      </div>
      <TicketCnfModal
        show={modalShow}
        handleClose={handleModalClose}
        selectedData={selectedTicketDetails}
        event={event}
        selectedDataHandler={setSelectedTicketDetails}
      />
    </div>
  );
};

export default DetailsHead;
