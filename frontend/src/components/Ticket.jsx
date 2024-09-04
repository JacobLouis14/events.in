import { Divider } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Col, Modal, Row } from "react-bootstrap";
import { localiseDate } from "../utils/formatDate";
import { useDispatch } from "react-redux";
import { cancelBookedTicketApiHandler } from "../services/allapis";

const Ticket = ({ show, handleClose, event, bookingDetails }) => {
  const dispatch = useDispatch();
  const [bDetails, setBDetail] = useState({});
  const [price, setPrice] = useState(0);

  // ticket cancel handler
  const handleTicketCancel = () => {
    dispatch(cancelBookedTicketApiHandler(bookingDetails));
    handleClose();
  };

  useEffect(() => {
    if (event && bookingDetails) {
      const t = event?.tickets.find(
        (val) => val.type === bookingDetails.tickettype
      );
      setPrice(t.price * bookingDetails.quantity);
    }
  }, [bookingDetails, event]);

  return (
    <div>
      <Modal show={show} centered onHide={handleClose}>
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body className="p-5">
          <div className="shadow p-3 rounded-3">
            <Row>
              <Col className="mb-4">
                <img
                  src={event?.poster.url}
                  alt=""
                  width="110px"
                  height="150px"
                />
              </Col>
              <Col>
                <h6>{event?.title}</h6>
                <p className="mb-1">
                  {localiseDate(event?.startdate)} | {event?.starttime}
                </p>
                <p className="mb-1">stadium : kottayam</p>
                <h6>
                  {bookingDetails?.quantity} - tickets |{" "}
                  {bookingDetails?.tickettype}
                </h6>
                <h6>{price} ₹</h6>
              </Col>
              <button className="btn btn-danger" onClick={handleTicketCancel}>
                Cancel Ticket
              </button>
            </Row>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default Ticket;
